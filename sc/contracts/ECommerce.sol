//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;

import "hardhat/console.sol";

abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return payable(msg.sender);
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and make it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        // On the first call to nonReentrant, _notEntered will be true
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;

        _;

        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }
}

contract ECommerce is Ownable, ReentrancyGuard {
    //0 is OK, 1 is REFUNDED_PRODUCT_ERROR and 2 is REFUNDED_SHIP_ERROR
    enum OrderStatus {
        PAID,
        READY_TO_PICKUP,
        CONFIRMED_PICKUP,
        SHIPPED,
        RECEIVED,
        REQUEST_REFUND,
        APPROVAL_REFUND,
        REJECT_REFUND
    }

    enum ErrorProduct {
        NO_REQUEST_REFUND,
        REFUNDED_PRODUCT_ERROR,
        REFUNDED_SHIPPING_ERROR
    }

    struct Order {
        uint256 id;
        address payable seller;
        address payable buyer;
        address payable shipper;
        OrderStatus status;
        ErrorProduct statusErrorType;
        uint256 quantity;
        uint256 price;
        uint256 shippingFee;
        uint256 deposit;
        uint256 totalAmount;
    }

    mapping(uint256 => Order) public orderBook;
    uint256 public _orderId = 1;
    Order[] orders;
    uint256 SHIPPER_STAKE_PERCENT = 20;

    event Ordered(uint256 orderId, address _buyer, uint256 indexed _totalMoney);
    event SellerConfirmOrder(uint256 orderId, OrderStatus _finalStatus);
    event Staked(uint256 orderId, address _shipper, uint256 indexed _stakedAmount);
    event Shipped(uint256 orderId);
    event ReceiveOrder(uint256 orderId, OrderStatus _finalStatus);
    event RequestRefundOrder(uint256 orderId, OrderStatus _finalStatus);
    event AcceptRefundOrder(uint256 orderId, OrderStatus _finalStatus);
    event RejectRefundOrder(uint256 orderId, OrderStatus _finalStatus);
    event ShipperCancelOrder(uint256 orderId, OrderStatus _status);

    modifier existOrder(uint256 idOrder) {
        require(orderBook[idOrder].id != 0, "Not exists");
        _;
    }

    modifier notExistOrder(uint256 idOrder) {
        require(orderBook[idOrder].id == 0, "Already exists");
        _;
    }

    function setDepositValue(uint256 value) public {
        SHIPPER_STAKE_PERCENT = value;
    }

    function getDepositValue() public view returns (uint256) {
        return SHIPPER_STAKE_PERCENT;
    }

    constructor() {
        console.log("Deploying a E-Commerce Admin contract by ", _msgSender());
    }

    // Step 1 => order status: PAID
    // create an order
    function createOrder(address _seller, uint256 _quantity, uint256 _price, uint256 _shippingFee) external payable nonReentrant notExistOrder(_orderId) returns (Order memory) {
        uint256 totalAmount = (_quantity * _price) + _shippingFee;
        require(msg.value == totalAmount, "Value request not match with total amount");
        orderBook[_orderId] = Order(
            _orderId,
            payable(_seller),
            _msgSender(),
            payable(address(0)),
            OrderStatus.PAID,
            ErrorProduct.NO_REQUEST_REFUND,
            _quantity,
            _price,
            _shippingFee,
            0,
            totalAmount
        );
        emit Ordered(_orderId, _msgSender(), msg.value);
        _orderId += 1;
        return orderBook[_orderId];
    }

    // Step 2 => order status: READY_TO_PICKUP
    function sellerConfirmOrder(uint256 orderId) external {
        (address _seller,,, OrderStatus _status,,,,,,) = getOrderInfo(orderId);
        require(_seller == _msgSender(), "Invalid seller");
        require(_status != OrderStatus.READY_TO_PICKUP, "Order has been confirm before");
        orderBook[orderId].status = OrderStatus.READY_TO_PICKUP;
        emit SellerConfirmOrder(orderId, OrderStatus.READY_TO_PICKUP);
    }

    // Step 3: order status: CONFIRMED_PICKUP
    // stake an order
    function shipperStakeOrder(uint256 idOrder) external payable nonReentrant existOrder(idOrder) {
        // check money from FE and in Order
        (,,, OrderStatus _status,, uint256 _quantity, uint256 _price,,,) = getOrderInfo(idOrder);
        require(msg.value == (_quantity * _price * SHIPPER_STAKE_PERCENT) / 100, "Value not match with deposit");
        require(_status == OrderStatus.READY_TO_PICKUP, "Order has not confirm yet");

        orderBook[idOrder].shipper = _msgSender();
        orderBook[idOrder].deposit = msg.value;
        orderBook[idOrder].status = OrderStatus.CONFIRMED_PICKUP;
        orderBook[idOrder].totalAmount += msg.value;
        emit Staked(idOrder, _msgSender(), msg.value);
    }

    // Step 4: order status: SHIPPED
    // make an order is shipped
    function orderShipped(uint256 orderId) external existOrder(orderId) {
        (,, address _shipper, OrderStatus _status,,,,,,) = getOrderInfo(orderId);
        require(_status == OrderStatus.CONFIRMED_PICKUP, "Order has not confirm yet");
        require(_shipper == _msgSender(), "Invalid shipper");
        orderBook[orderId].status = OrderStatus.SHIPPED;
        emit Shipped(orderId);
    }

    // Step 5: User receive order
    // receiver an order
    function receiveOrder(uint256 orderId) external payable existOrder(orderId) {
    (,address _buyer,, OrderStatus _status,,,,,,) = getOrderInfo(orderId);
        require(_status == OrderStatus.CONFIRMED_PICKUP, "Order have not confirm yet");
        require(_status != OrderStatus.RECEIVED, "Order have confirm before");
        require(_buyer == _msgSender(), "Invalid buyer");

        this.transferMoneyForSellerShipper(orderId);
        orderBook[orderId].status = OrderStatus.RECEIVED;
        emit ReceiveOrder(orderId, OrderStatus.RECEIVED);
    }

    function requestRefund(uint256 orderId, ErrorProduct _statusErrorType) public existOrder(orderId) {
        (, address _buyer, , OrderStatus _status, , , , , , ) = getOrderInfo(orderId);
        require(_buyer == _msgSender(), "Invalid buyer");
        require(_status == OrderStatus.CONFIRMED_PICKUP, "Order has not confirmed pickup");
        require(_status != OrderStatus.RECEIVED, "Order has been received before");
        require(_status != OrderStatus.REQUEST_REFUND, "Order has been request before");
        require(_status != OrderStatus.APPROVAL_REFUND, "Order has been approval");
        orderBook[orderId].status = OrderStatus.REQUEST_REFUND;
        orderBook[orderId].statusErrorType = _statusErrorType;
        emit RequestRefundOrder(orderId, OrderStatus.REQUEST_REFUND);
    }

    function rejectRefundOrder(uint256 orderId) public existOrder(orderId) {
        (address _seller,,, OrderStatus _status,,,,,,) = getOrderInfo(orderId);
        require(_seller == _msgSender(), "Invalid seller");
        require(_status == OrderStatus.REQUEST_REFUND, "Order has been request refund");
        orderBook[orderId].status = OrderStatus.REJECT_REFUND;
        this.transferMoneyForSellerShipper(orderId);
        emit RejectRefundOrder(orderId, OrderStatus.REJECT_REFUND);
    }

    // If have a problem with product
    function acceptRefundOrder(uint256 orderId) external payable existOrder(orderId) {
        (
            address _seller,
            address _buyer,
            address _shipper,
            OrderStatus _status,
            ErrorProduct _errStatusType,
            uint256 _quantity,
            uint256 _price,
            uint256 _shippingFee,
            uint256 _deposit,
            uint256 _totalAmount
        ) = getOrderInfo(orderId);
        require(_totalAmount >= msg.value, "Money in contract is not enough");
        require(_seller == _msgSender(), "Invalid seller");
        require(_status == OrderStatus.REQUEST_REFUND, "Order have to request refund");
        uint256 _amountForBuyer = _price * _quantity;
        if (_errStatusType == ErrorProduct.REFUNDED_PRODUCT_ERROR) {
            // Step 1: Return money for buyer
            payable(_buyer).transfer(_amountForBuyer);
            // Step 2: Shipper receive deposit + ship Fee
            payable(_shipper).transfer(_deposit + _shippingFee);
        } else {
            payable(_shipper).transfer(_shippingFee);
            payable(_seller).transfer(_deposit);
            payable(_buyer).transfer(_amountForBuyer);
        }
        orderBook[orderId].status = OrderStatus.APPROVAL_REFUND;
        emit AcceptRefundOrder(orderId, OrderStatus.APPROVAL_REFUND);
    }

    function shipperCancelOrder(uint256 orderId) external payable existOrder(orderId) {
        (,, address _shipper, OrderStatus _status,,,,, uint256 _deposit,) = getOrderInfo(orderId);
        require(_status == OrderStatus.CONFIRMED_PICKUP, "Order has not picked up before");
        require(_shipper == _msgSender(), "Invalid shipper");
        payable(_shipper).transfer(_deposit);
        orderBook[orderId].status = OrderStatus.READY_TO_PICKUP;
        emit ShipperCancelOrder(orderId, OrderStatus.READY_TO_PICKUP);
    }

    // get Order Info
    function getOrderInfo(uint256 orderId) public view returns (address, address, address, OrderStatus, ErrorProduct, uint256, uint256, uint256, uint256, uint256)
    {
        Order memory order = orderBook[orderId];
        return (
            order.seller,
            order.buyer,
            order.shipper,
            order.status,
            order.statusErrorType,
            order.quantity,
            order.price,
            order.shippingFee,
            order.deposit,
            order.totalAmount
        );
    }

    function getBalanceOf() public view returns (uint256) {
        return address(this).balance;
    }

    function getAllOrders() public returns (Order[] memory) {
        for (uint256 i = 1; i <= _orderId; i++) {
            orders.push(orderBook[i]);
        }
        return orders;
    }

    function transferMoneyForSellerShipper(uint256 orderId) external payable existOrder(orderId) {
        (address _seller,, address _shipper,,, uint256 _quantity, uint256 _price, uint256 _shippingFee, uint256 _deposit, uint256 _totalAmount) = getOrderInfo(orderId);
        uint256 _amountForSeller = _price * _quantity;
        uint256 _amountForShipper = _deposit + _shippingFee;
        require(_totalAmount >= _amountForSeller + _amountForShipper, "Money in contract is not enough");
        payable(_seller).transfer(_amountForSeller);
        payable(_shipper).transfer(_amountForShipper);
        orderBook[orderId].totalAmount -= (_amountForSeller + _amountForShipper);
    }
}
