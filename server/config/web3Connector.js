var Web3 = require("web3");
var web3Address = "http://localhost:7545";
var contractAddress = "0x1e6be09283cc020872ea639f5bfce28d741e3e95";
var web3 = new Web3(new Web3.providers.HttpProvider(web3Address));
var defaultAccount = web3.eth.accounts[0];

// set the default account
web3.eth.defaultAccount = web3.eth.accounts[0];


// init the trade contract
var tradecontractContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_sku","type":"uint16"},{"name":"_price","type":"uint256"},{"name":"_owner","type":"address"},{"name":"_lastModifiedOn","type":"uint32"}],"name":"RegisterAsset","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_orderId","type":"uint16"},{"name":"_orderAmount","type":"uint256"},{"name":"_orderStatus","type":"uint8"},{"name":"_buyer","type":"address"},{"name":"_seller","type":"address"},{"name":"_sku","type":"uint16"},{"name":"_orderDate","type":"uint32"}],"name":"GenerateOrder","outputs":[],"payable":true,"type":"function","stateMutability":"payable"},{"constant":true,"inputs":[{"name":"_userAddress","type":"address"}],"name":"GetUser","outputs":[{"name":"_userAddr","type":"address"},{"name":"_userBalance","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_userAddress","type":"address"},{"name":"_initialBalance","type":"uint256"}],"name":"RegisterUser","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"},{"name":"_previousOwner","type":"address"},{"name":"_sku","type":"uint16"}],"name":"TransferAssetOwner","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"_orderId","type":"uint16"}],"name":"GetOrder","outputs":[{"name":"_orderAmount","type":"uint256"},{"name":"_orderStatus","type":"uint8"},{"name":"buyer","type":"address"},{"name":"seller","type":"address"},{"name":"_sku","type":"uint16"},{"name":"_orderDate","type":"uint32"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"_sku","type":"uint16"}],"name":"GetAsset","outputs":[{"name":"_asset","type":"uint16"},{"name":"_price","type":"uint256"},{"name":"_owner","type":"address"},{"name":"_lastModifiedOn","type":"uint32"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"_userAddress","type":"address"}],"name":"GetUserBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"inputs":[],"type":"constructor","payable":true,"stateMutability":"payable"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_orderId","type":"uint16"},{"indexed":false,"name":"_orderAmount","type":"uint256"},{"indexed":false,"name":"_orderStatus","type":"uint256"},{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"_sku","type":"uint16"},{"indexed":false,"name":"_orderDate","type":"uint32"}],"name":"CreateOrder","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_userAddress","type":"address"},{"indexed":false,"name":"_userBalance","type":"uint256"}],"name":"CreateUser","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newOwner","type":"address"},{"indexed":false,"name":"_previousOwner","type":"address"},{"indexed":false,"name":"_sku","type":"uint16"}],"name":"TransferAssetOwnership","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_sku","type":"uint16"},{"indexed":false,"name":"_price","type":"uint256"},{"indexed":false,"name":"_owner","type":"address"},{"indexed":false,"name":"_lastModifiedOn","type":"uint32"}],"name":"CreateAsset","type":"event"}]);
var tradeContract = tradecontractContract.at(contractAddress);

/*---------------Functions---------------------*/
// To create asset
function CreateAsset(_sku,_price, _owner, _lastModifiedOn){
    tradeContract.RegisterAsset(_sku,_price, _owner, _lastModifiedOn);
}

// To create user
function CreateUser(_userAddress,balance){
  tradeContract.RegisterUser(_userAddress,balance);
}

// To create order
function CreateOrder(_orderId,_orderAmount, _orderStatus, _buyer, _seller, _sku, _orderDate ){
  tradeContract.GenerateOrder(_orderId,_orderAmount, _orderStatus, _buyer, _seller, _sku, _orderDate);
}

// To get asset
function GetAsset(sku) {
    tradeContract.GetAsset(sku,function(error, result) {
      if (!error) {
        console.log("BlockChain GetAsset ------>", result);
      } else {
        console.log(error);
      }
    });
  }

  // To get order
  function GetOrder(orderID) {
    tradeContract.GetOrder(orderID,function(error, result) {
      if (!error) {
        console.log("BlockChain GetOrder ------>", result);
      } else {
        console.log(error);
      }
    });
  }

  // To get user balance
  function GetUserBalance(_userAddress) {
    tradeContract.GetUserBalance(_userAddress,function(error, result) {
      if (!error) {
        console.log("BlockChain GetUserBalance ------>", result);
      } else {
        console.log(error);
      }
    });
  }

  // To get user
  function GetUser(_userAddress) {
    tradeContract.GetUser(_userAddress,function(error, result) {
      if (!error) {
        console.log("BlockChain GetUser ------>", result);
      } else {
        console.log(error);
      }
    });
  }

// CreateAsset(103,2500,defaultAccount,1254)
// CreateUser('0xb171a93a97fDecD6ed9BeF4d1AAb28f153FE0d7f',1500)
// CreateOrder(3001,3000,1,'0xb171a93a97fDecD6ed9BeF4d1AAb28f153FE0d7f','0x33eb399f91dB0D8226e9bF9cF725082fA1E7AAAD',102,12541)


  GetAsset(101)
  GetUser(defaultAccount)
  GetUserBalance(defaultAccount)
  GetOrder(1001)

