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

    function GetAsset(uint8 _sku) constant public returns(uint8 _asset,uint256 _price, address _owner, uint8 _lastModifiedOn){
        Asset storage asset = assets[_sku];
        return (asset.sku,asset.price, asset.owner, asset.lastModifiedOn);
    }    
}

contract UserContract{
    struct User{
        address userAddress;
        uint256 userBalance;
    }
    
    mapping(address => User)  users;
    
    function UserContract(){
        
    }
    
    event CreateUser(address _userAddress, uint _userBalance);
    
    function RegisterUser(address _userAddress, uint _initialBalance) public {
        users[_userAddress]=User({userAddress:_userAddress, userBalance:_initialBalance});
        CreateUser(_userAddress, _initialBalance);
    }

    function GetUser(address _userAddress) constant public returns(address _userAddr, uint _userBalance){
        User storage user= users[_userAddress];
        return (user.userAddress, user.userBalance);
    }
    
    function GetUserBalance(address _userAddress) constant public returns(uint256){
        return users[_userAddress].userBalance;
    }
}

contract TradeContract is AssetContract, UserContract{
    struct Order{
        uint16 orderId;
        uint256 orderAmount;
        uint8 orderStatus;
        address buyer;
        address seller;
        uint8 assetId;
        uint8 orderDate;
    }

    mapping(uint16 => Order) orders;
    enum OrderStatus {Created, Paid, Completed}

    function TradeContract() public{

    }

    modifier IsValidUser(address _userAddress){
        if(msg.sender != _userAddress){
            throw;
        }
        _;
    }

    

    event CreateOrder(uint _orderId,uint _orderAmount, uint _orderStatus, address buyer, address seller, uint _assetId, uint _orderDate);
    
    function GetOrder(uint8 _orderId) constant public returns(uint256 _orderAmount, uint8 _orderStatus, address buyer, address seller, uint8 _assetId, uint8 _orderDate){
        Order storage order= orders[_orderId];
        return (order.orderAmount, order.orderStatus, order.buyer, order.seller, order.assetId, order.orderDate);
    }

    function GenerateOrder(uint16 _orderId,uint256 _orderAmount, uint8 _orderStatus, address _buyer, address _seller, uint8 _assetId, uint8 _orderDate ) IsValidUser(_buyer) payable public{
        orders[_orderId] = Order({orderId:_orderId,orderAmount:_orderAmount, orderStatus:_orderStatus, buyer:_buyer, seller:_seller, assetId:_assetId, orderDate:_orderDate});
        users[_buyer].userBalance-=_orderAmount;
        users[_seller].userBalance+=_orderAmount;
        
        CreateOrder(_orderId,_orderAmount, _orderStatus, _buyer, _seller, _assetId, _orderDate);
        TransferAssetOwnership(_buyer,_seller,_assetId);
    }

    function RegisterAsset(uint8 _sku,uint256 _price, address _owner, uint8 _lastModifiedOn) IsValidUser(_owner) public{
        assets[_sku] = Asset({sku:_sku,price:_price, owner:_owner, lastModifiedOn:_lastModifiedOn});
        CreateAsset(_sku,_price, _owner, _lastModifiedOn);
    }    
}