pragma solidity ^0.4.0;

contract AssetContract{

    struct Asset{
        uint16 sku;
        uint256 price;
        address owner;
        uint32 lastModifiedOn;
    }

    mapping(uint16=> Asset) assets;

    function AssetContract() public{
    }

    event TransferAssetOwnership(address _newOwner, address _previousOwner, uint16 _sku);
    event CreateAsset(uint16 _sku,uint256 _price, address _owner, uint32 _lastModifiedOn);

    function GetAsset(uint16 _sku) constant public returns(uint16 _asset,uint256 _price, address _owner, uint32 _lastModifiedOn){
        Asset storage asset = assets[_sku];
        return (asset.sku,asset.price, asset.owner, asset.lastModifiedOn);
    }

    function RegisterAsset(uint16 _sku,uint256 _price, address _owner, uint32 _lastModifiedOn) public{
        assets[_sku] = Asset({sku:_sku,price:_price, owner:_owner, lastModifiedOn:_lastModifiedOn});
        CreateAsset(_sku,_price, _owner, _lastModifiedOn);
    }

    function TransferAssetOwner(address _newOwner, address _previousOwner, uint16 _sku) public{
        assets[_sku].owner = _newOwner;
        TransferAssetOwnership(_newOwner,_previousOwner,_sku);
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
        uint16 orderAmount;
        //uint8 orderStatus;
        address buyer;
        address seller;
        uint16 sku;
        //uint32 orderDate;
    }

    mapping(uint16 => Order) orders;

    function TradeContract() public{

    }

    /*event CreateOrder(uint16 _orderId,uint _orderAmount, uint _orderStatus, address buyer, address seller, uint16 _sku, uint32 _orderDate);
    function GetOrder(uint16 _orderId) constant public returns(uint256 _orderAmount, uint8 _orderStatus, address buyer, address seller, uint16 _sku, uint32 _orderDate){
        Order storage order= orders[_orderId];
        return (order.orderAmount, order.orderStatus, order.buyer, order.seller, order.sku, order.orderDate);
    }

    function GenerateOrder(uint16 _orderId,uint256 _orderAmount, uint8 _orderStatus, address _buyer, address _seller, uint16 _sku, uint32 _orderDate ) payable public{
        orders[_orderId] = Order({orderId:_orderId,orderAmount:_orderAmount, orderStatus:_orderStatus, buyer:_buyer, seller:_seller, sku:_sku, orderDate:_orderDate});
        users[_buyer].userBalance-=_orderAmount;
        users[_seller].userBalance+=_orderAmount;
        
        TransferAssetOwner(_buyer,_seller,_sku);
        CreateOrder(_orderId,_orderAmount, _orderStatus, _buyer, _seller, _sku, _orderDate);
        
    }*/
    
    event CreateOrder(uint16 _orderId,uint _orderAmount, address buyer, address seller, uint16 _sku);
    
    function GetOrder(uint16 _orderId) constant public returns(uint16 _orderAmount, address buyer, address seller, uint16 _sku){
        Order storage order= orders[_orderId];
        return (order.orderAmount, order.buyer, order.seller, order.sku);
    }

    function GenerateOrder(uint16 _orderId,uint16 _orderAmount, address _buyer, address _seller, uint16 _sku ) payable public{
        orders[_orderId] = Order({orderId:_orderId,orderAmount:_orderAmount, buyer:_buyer, seller:_seller, sku:_sku});
        users[_buyer].userBalance-=_orderAmount;
        users[_seller].userBalance+=_orderAmount;
        
        //TransferAssetOwner(_buyer,_seller,_sku);
        //CreateOrder(_orderId,_orderAmount, _buyer, _seller, _sku);
        
    }        
}