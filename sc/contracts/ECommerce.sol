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
      STAKED,
      SHIPPED,
      OK,
      REFUNDED_PRODUCT_ERROR,
      REFUNDED_SHIP_ERROR
    }

    struct Order {
      string id;
      address payable seller;
      address payable buyer;
      address payable shipper;
      OrderStatus orderStatus;
      uint256 totalMoney;
    }
    OrderStatus public x;
    uint256 constant public STAKE_REQUIRE = 20;
    uint256 constant public SHIP_FEE = 10;

    mapping (string => Order) private OrderAt;

    event Ordered (string _orderId, address _seller, address _buyer, uint256 indexed _totalMoney);
    event Staked (string _orderId, address _shipper, uint256 indexed _stakedAmount);
    event Shipped (string _orderId);
    event ReceiveOrder (string _orderId, OrderStatus _finalStatus);

    // modifier onlyHackathonOwner(string memory _hackathonId) {
    //   require(hackathon[_hackathonId].owner == _msgSender(), "Only owner");
    //   _;
    // }

    modifier existOrder(string memory _orderId) {
      require(bytes(OrderAt[_orderId].id).length != 0, "Not exists");
      _;
    }

    modifier notExistOrder(string memory _orderId) {
      require(bytes(OrderAt[_orderId].id).length == 0, "Already exists");
      _;
    }

    constructor() {
      console.log("Deploying a E-Commerce Admin contract by ", _msgSender());
    }

    // create an order
    function createOrder(string memory _orderId, address _seller, uint256 _totalMoney) nonReentrant notExistOrder(_orderId) payable external {
      require(_totalMoney == msg.value, "Incorrect order value");
      OrderAt[_orderId] = Order(_orderId, payable(_seller), _msgSender(), payable(address(0)), OrderStatus.PAID, msg.value);
      emit Ordered(_orderId, _seller, _msgSender(), msg.value);
    }

    // stake an order
    function stakeOrder(string memory _orderId) nonReentrant existOrder(_orderId) payable external {
      (,,,OrderStatus _status,) = getOrderInfo(_orderId);
      require(_status == OrderStatus.PAID, "Order have not paid yet");
      uint256 _amountForStake = getNumberNeedToStake(_orderId);
      require(_amountForStake == msg.value, "Incorrect stake value");
      OrderAt[_orderId].shipper = _msgSender();
      OrderAt[_orderId].orderStatus = OrderStatus.STAKED;
      emit Staked(_orderId, _msgSender(), _amountForStake);
    }

    // make an order is shipped
    function orderShipped(string memory _orderId) existOrder(_orderId) external {
      (,,address _shipper, OrderStatus _status,) = getOrderInfo(_orderId);
      require(_status == OrderStatus.STAKED, "Order have not staked yet");
      require(_shipper == _msgSender(), "Invalid shipper");

      OrderAt[_orderId].orderStatus = OrderStatus.SHIPPED;
      emit Shipped(_orderId);
    }

    // receiver an order
    function receiveOrder(string memory _orderId, OrderStatus _finalStatus) existOrder(_orderId) external {
      (address _seller, address _buyer,address _shipper, OrderStatus _status, uint256 _totalMoney) = getOrderInfo(_orderId);
      require(_status == OrderStatus.SHIPPED, "Order have not arrived yet");
      require(_buyer == _msgSender(), "Invalid buyer");
      require(
        //3,4,5
        _finalStatus == OrderStatus.OK ||
        _finalStatus == OrderStatus.REFUNDED_PRODUCT_ERROR ||
        _finalStatus == OrderStatus.REFUNDED_SHIP_ERROR,
        "Invalid final status"
      );

      if(_finalStatus == OrderStatus.OK) {

      } else if (_finalStatus == OrderStatus.REFUNDED_PRODUCT_ERROR) {

      } else {

      }

      OrderAt[_orderId].orderStatus = _finalStatus;
      emit ReceiveOrder(_orderId, _finalStatus);
    }

    // get number of money need to stake order
    function getNumberNeedToStake(string memory _orderId) private view returns(uint256) {
      return OrderAt[_orderId].totalMoney * STAKE_REQUIRE / 100;
    }

        // get Order Info
    function getOrderInfo(string memory _orderId) public view returns(address, address, address, OrderStatus, uint256) {
      return (
        OrderAt[_orderId].seller,
        OrderAt[_orderId].buyer,
        OrderAt[_orderId].shipper,
        OrderAt[_orderId].orderStatus,
        OrderAt[_orderId].totalMoney
      );
    }


  }
