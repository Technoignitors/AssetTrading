pragma solidity ^0.4.0;

contract AssetContract{

    struct Asset{
        uint8 sku;
        uint256 price;
        address owner;
        uint8 lastModifiedOn;
    }

    mapping(uint8=> Asset) assets;

    function AssetContract() public{
    }

    event TransferAssetOwnership(address _newOwner, address _previousOwner, uint8 _assetId);
    event CreateAsset(uint8 _sku,uint256 _price, address _owner, uint8 _lastModifiedOn);

    function GetAsset(uint8 _sku) constant public returns(uint8 _asset, address _owner, uint8 _lastModifiedOn){
        Asset storage asset = assets[_sku];
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
    
    uint8 assetId=0;
    uint8 userId=0;
    uint8 orderId=0;

    mapping(uint => User)  users;
    mapping(uint => Order) orders;
    enum OrderStatus {Created, Paid, Completed}

    function TradeContract() public{

    }

    modifier IsValidUser(address _userAddress){
        if(msg.sender != _userAddress){
            throw;
        }
        _;
    }

    

    event CreateUser(address _userAddress, uint _userBalance);
    event CreateOrder(uint _orderId,uint _orderAmount, uint _orderStatus, address buyer, address seller, uint _assetId, uint _orderDate);
    

    function RegisterUser(address _userAddress, uint _initialBalance) public {
        users[userId++]=User({userAddress:_userAddress, userBalance:_initialBalance});
        CreateUser(_userAddress, _initialBalance);
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
        
        CreateOrder(_orderId,_orderAmount, _orderStatus, _buyer.userAddress, _seller.userAddress, _assetId, _orderDate);
        TransferAssetOwnership(_buyer.userAddress,_seller.userAddress,_assetId);
    }

    function RegisterAsset(uint8 _sku,uint256 _price, address _owner, uint8 _lastModifiedOn) IsValidUser(_owner) public{
        assets[_sku] = Asset({sku:_sku,price:_price, owner:_owner, lastModifiedOn:_lastModifiedOn});
        CreateAsset(_sku,_price, _owner, _lastModifiedOn);
    }    
}