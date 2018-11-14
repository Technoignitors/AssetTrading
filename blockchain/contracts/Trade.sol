pragma solidity ^0.4.0;

contract AssetContract{

    struct Asset{
        string sku;
        uint256 price;
        address owner;
        uint8 lastModifiedOn;
    }

    mapping(uint => Asset) assets;

    function AssetContract() public{

    }

    event TransferAssetOwnership(address _newOwner, address _previousOwner, uint8 _assetId);
    event CreateAsset(uint8 _assetId, string _sku,uint256 _price, address _owner, uint8 _lastModifiedOn);

    function GetAsset(uint8 _assetId) constant public returns(string _sku, address owner, uint8 _lastModifiedOn){
        Asset storage asset = assets[_assetId];
        return (asset.sku, asset.owner, asset.lastModifiedOn);
    }    
}

contract TradeContract is AssetContract{
    struct Order{
        uint256 orderAmount;
        uint8 orderStatus;
        address buyer;
        address seller;
        uint8 assetId;
        uint8 orderDate;
    }

    struct User{
        address userAddress;
        uint256 userBalance;
    }    

    mapping(uint => User)  users;
    mapping(uint => Order) orders;
    enum OrderStatus {Created, Paid, Completed}

    function TradeContract() public{

    }

    modifier IsValidUser(address _userAddress){
        require(msg.sender == _userAddress);
        _;
    }

    

    event CreateUser(uint _userId,address _userAddress, uint _userBalance);
    event CreateOrder(uint _orderId,uint _orderAmount, uint _orderStatus, address buyer, address seller, uint _assetId, uint _orderDate);
    

    function RegisterUser(uint _userId, address _userAddress, uint _initialBalance) public {
        users[_userId]=User({userAddress:_userAddress, userBalance:_initialBalance});
        emit CreateUser(_userId, _userAddress, _initialBalance);
    }

    function GetUser(uint _userId) constant public returns(address _userAddress, uint _userBalance){
        User storage user= users[_userId];
        return (user.userAddress, user.userBalance);
    }

    function GetOrder(uint8 _orderId) constant public returns(uint256 _orderAmount, uint8 _orderStatus, address buyer, address seller, uint8 _assetId, uint8 _orderDate){
        Order storage order= orders[_orderId];
        return (order.orderAmount, order.orderStatus, order.buyer, order.seller, order.assetId, order.orderDate);
    }

    function GenerateOrder(uint8 _orderId,uint256 _orderAmount, uint8 _orderStatus, uint8 _buyerId, uint8 _sellerId, uint8 _assetId, uint8 _orderDate ) IsValidUser(_seller.userAddress) payable public{
        User storage _buyer=users[_buyerId];
        User storage _seller=users[_sellerId];
        orders[_orderId] = Order({orderAmount:_orderAmount, orderStatus:_orderStatus, buyer:_buyer.userAddress, seller:_seller.userAddress, assetId:_assetId, orderDate:_orderDate});
        _buyer.userBalance-=_orderAmount;
        _seller.userBalance+=_orderAmount;
        
        emit CreateOrder(_orderId,_orderAmount, _orderStatus, _buyer.userAddress, _seller.userAddress, _assetId, _orderDate);
        emit TransferAssetOwnership(_buyer.userAddress,_seller.userAddress,_assetId);
    }

    function RegisterAsset(uint8 _assetId, string _sku,uint256 _price, address _owner, uint8 _lastModifiedOn) IsValidUser(_owner) public{
        assets[_assetId]= Asset({sku:_sku,price:_price, owner:_owner, lastModifiedOn:_lastModifiedOn});
        emit CreateAsset(_assetId, _sku,_price, _owner, _lastModifiedOn);
    }    
}