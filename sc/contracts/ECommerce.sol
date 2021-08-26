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

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
    * @dev Initializes the contract setting the deployer as the initial owner.
    */
    constructor () {
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
        require(newOwner != address(0), "Ownable: new owner is the zero address");
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
        REFUNDED_PRODUCT_ERROR,
        REFUNDED_SHIPPING_ERROR
    }

    struct Order {
        string id;
        address payable seller;
        address payable buyer;
        address payable shipper;
        OrderStatus status;
        uint256 quantity;
        uint256 price;
        uint256 shippingFee;
        uint256 deposit;
    }

    OrderStatus public x;
    uint256 constant public STAKE_REQUIRE = 20;
    uint256 constant public SHIP_FEE = 10;

    mapping (string => Order) private orderBook;

    event Ordered (string _orderId, address _seller, address _buyer, uint256 indexed _totalMoney);
    event Staked (string _orderId, address _shipper, uint256 indexed _stakedAmount);
    event Shipped (string _orderId);
    event ReceiveOrder (string _orderId, OrderStatus _finalStatus);
    event SellerConfirmOrder (string _orderId, OrderStatus _finalStatus);
    event ShipperCancelOrder(string orderId,  OrderStatus _status);

    modifier existOrder(string memory _orderId) {
        require(bytes(orderBook[_orderId].id).length != 0, "Not exists");
        _;
    }

    modifier notExistOrder(string memory _orderId) {
        require(bytes(orderBook[_orderId].id).length == 0, "Already exists");
        _;
    }

    constructor() {
        console.log("Deploying a E-Commerce Admin contract by ", _msgSender());
    }

    // Step 1 => order status: PAID
    // create an order
    function createOrder(string memory _orderId, address _seller, uint256 _quantity, uint256 _price, uint256 _shippingFee) nonReentrant notExistOrder(_orderId) payable external {
        require(msg.value == ( (_quantity * _price) + _shippingFee), 'Value request not match with total amount');
        orderBook[_orderId] = Order(_orderId, payable(_seller), _msgSender(), payable(address(0)), OrderStatus.PAID, _quantity, _price, _shippingFee, 0);
        emit Ordered(_orderId, _seller, _msgSender(), msg.value);
    }

    // Step 2 => order status: READY_TO_PICKUP
    function sellerConfirmOrder(string memory _orderId) external {
        (address _seller,,,OrderStatus _status,,,,) = getOrderInfo(_orderId);
        require(_status == OrderStatus.PAID, 'Order has not paid yet');
        require(_seller == _msgSender(), "Invalid seller");
        orderBook[_orderId].status = OrderStatus.READY_TO_PICKUP;
        emit SellerConfirmOrder(_orderId, OrderStatus.READY_TO_PICKUP);
    }

    // Step 3: order status: CONFIRMED_PICKUP
    // stake an order
    function shipperStakeOrder(string memory _orderId) nonReentrant existOrder(_orderId) payable external {
        // check money from FE and in Order
        (,,, OrderStatus _status, uint256 _quantity, uint256 _price,,) = getOrderInfo(_orderId);
        require(msg.value == (_quantity * _price * 20) / 100, 'Value not match with deposit');
        require(_status == OrderStatus.READY_TO_PICKUP, "Order has not confirm yet");
        
        orderBook[_orderId].shipper = _msgSender();
        orderBook[_orderId].deposit = msg.value;
        orderBook[_orderId].status = OrderStatus.CONFIRMED_PICKUP;
        emit Staked(_orderId, _msgSender(), msg.value);
    }

    // Step 4: order status: SHIPPED
    // make an order is shipped
    function orderShipped(string memory _orderId) existOrder(_orderId) external {
        (,,address _shipper, OrderStatus _status,,,,) = getOrderInfo(_orderId);
        require(_status == OrderStatus.CONFIRMED_PICKUP, "Order has not confirm yet");
        require(_shipper == _msgSender(), "Invalid shipper");

        orderBook[_orderId].status = OrderStatus.SHIPPED;
        emit Shipped(_orderId);
    }

    // Step 5: User receive order
    // receiver an order
    function receiveOrder(string memory _orderId) existOrder(_orderId) external payable {
        (address _seller, address _buyer, address _shipper, OrderStatus _status , uint256 price, uint256 quantity, uint256 _shippingFee, uint256 _deposit) = getOrderInfo(_orderId);
        // require(_deposit == _shippingFee, "Fee value not match");
        require(_status == OrderStatus.CONFIRMED_PICKUP, "Order have not confirm yet");
        require(_status != OrderStatus.RECEIVED, "Order have confirm before");
        require(_buyer == _msgSender(), "Invalid buyer");

        // Separate money for shipper and seller
        uint256 _amountForSeller = price * quantity;
        payable(_seller).transfer(_amountForSeller);
        payable(_shipper).transfer(_deposit + _shippingFee);
        orderBook[_orderId].status = OrderStatus.RECEIVED;
        emit ReceiveOrder(_orderId, OrderStatus.RECEIVED);
    }

    // If have a problem with product
    function refundOrder(string memory _orderId, OrderStatus _finalStatus) external payable {
        require(_finalStatus != OrderStatus.RECEIVED, "Order have been received");
        (, address _buyer, address _shipper, OrderStatus _status, uint256 _quantity, uint256 _price, uint256 _shippingFee, uint256 _deposit) = getOrderInfo(_orderId);
        uint256 _amountForBuyer = _price * _quantity;
        require(_buyer == _msgSender(), "Invalid buyer");
        if (_finalStatus == OrderStatus.REFUNDED_PRODUCT_ERROR) {
        require(_finalStatus != _status, "Order have been refund because of product error");
        orderBook[_orderId].status = OrderStatus.REFUNDED_PRODUCT_ERROR;
        // handle refund product error
        // Step 1: Return money for buyer
        payable(_buyer).transfer(_amountForBuyer);
        // Step 2: Shipper receive deposit + ship Fee
        payable(_shipper).transfer(_deposit + _shippingFee);
        } else {
        require(_finalStatus != _status, "Order have been refund because of shipping error");
        orderBook[_orderId].status = OrderStatus.REFUNDED_SHIPPING_ERROR;
        // handle refund shipping error
        // Return money for buyer
        payable(_buyer).transfer(_amountForBuyer);
        }
    }

    function shipperCancelOrder(string memory _orderId) existOrder(_orderId) external payable {
        (,, address _shipper, OrderStatus _status,,,, uint256 _deposit) = getOrderInfo(_orderId);
        require(_shipper == _msgSender(), "Invalid shipper");
        require(_status != OrderStatus.READY_TO_PICKUP, "Order now is ready to pickup");
        require(_status != OrderStatus.RECEIVED, "Order alreay received");

        payable(_shipper).transfer(_deposit);
        orderBook[_orderId].status = OrderStatus.READY_TO_PICKUP;
        emit ShipperCancelOrder(_orderId, OrderStatus.READY_TO_PICKUP);
    }

    // get Order Info
    function getOrderInfo(string memory _orderId) public view returns(address, address, address, OrderStatus, uint256, uint256, uint256, uint256) {
        Order memory order = orderBook[_orderId];
        return (
        order.seller,
        order.buyer,
        order.shipper,
        order.status,
        order.quantity,
        order.price,
        order.shippingFee,
        order.deposit
        );
    }

    function getBalanceOfSC() public view returns(uint256) {
        return address(this).balance;
    }
}
