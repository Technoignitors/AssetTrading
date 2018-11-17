var exports = (module.exports = {});
var Web3 = require("web3");
var web3Address = "http://localhost:7545";
var contractAddress = "0x1e6be09283cc020872ea639f5bfce28d741e3e95";
var web3 = new Web3(new Web3.providers.HttpProvider(web3Address));
var defaultAccount = web3.eth.accounts[0];

// set the default account
web3.eth.defaultAccount = web3.eth.accounts[0];

// init the trade contract
var tradecontractContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_sku","type":"uint16"},{"name":"_price","type":"uint256"},{"name":"_owner","type":"address"},{"name":"_lastModifiedOn","type":"uint32"}],"name":"RegisterAsset","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_orderId","type":"uint16"},{"name":"_orderAmount","type":"uint16"},{"name":"_buyer","type":"address"},{"name":"_seller","type":"address"},{"name":"_sku","type":"uint16"}],"name":"GenerateOrder","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"_userAddress","type":"address"}],"name":"GetUser","outputs":[{"name":"_userAddr","type":"address"},{"name":"_userBalance","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_userAddress","type":"address"},{"name":"_initialBalance","type":"uint256"}],"name":"RegisterUser","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"},{"name":"_previousOwner","type":"address"},{"name":"_sku","type":"uint16"}],"name":"TransferAssetOwner","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"_orderId","type":"uint16"}],"name":"GetOrder","outputs":[{"name":"_orderAmount","type":"uint16"},{"name":"buyer","type":"address"},{"name":"seller","type":"address"},{"name":"_sku","type":"uint16"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"_sku","type":"uint16"}],"name":"GetAsset","outputs":[{"name":"_asset","type":"uint16"},{"name":"_price","type":"uint256"},{"name":"_owner","type":"address"},{"name":"_lastModifiedOn","type":"uint32"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"_userAddress","type":"address"}],"name":"GetUserBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"inputs":[],"type":"constructor","payable":true,"stateMutability":"payable"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_orderId","type":"uint16"},{"indexed":false,"name":"_orderAmount","type":"uint256"},{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"_sku","type":"uint16"}],"name":"CreateOrder","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_userAddress","type":"address"},{"indexed":false,"name":"_userBalance","type":"uint256"}],"name":"CreateUser","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newOwner","type":"address"},{"indexed":false,"name":"_previousOwner","type":"address"},{"indexed":false,"name":"_sku","type":"uint16"}],"name":"TransferAssetOwnership","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_sku","type":"uint16"},{"indexed":false,"name":"_price","type":"uint256"},{"indexed":false,"name":"_owner","type":"address"},{"indexed":false,"name":"_lastModifiedOn","type":"uint32"}],"name":"CreateAsset","type":"event"}]);




var tradeContract = tradecontractContract.at(contractAddress);

/*---------------Functions---------------------*/
// To create asset
exports.CreateAsset = function(_sku, _price, _owner, _lastModifiedOn) {
  console.log(_sku, _price, _owner, _lastModifiedOn);
  tradeContract.RegisterAsset(_sku, _price, _owner, _lastModifiedOn);
};

// To create user
exports.CreateUser = function(_userAddress, balance) {
  tradeContract.RegisterUser(_userAddress, balance);
};

// To create order
exports.CreateOrder = function(
  _orderId,
  _orderAmount,
  //_orderStatus,
  _buyer,
  _seller,
  _sku
  //, _orderDate
) {
  tradeContract.GenerateOrder(
    _orderId,
    _orderAmount,
    //_orderStatus,
    _buyer,
    _seller,
    _sku
    //,_orderDate
  );
};

// To get asset
exports.GetAsset = function(sku) {
  tradeContract.GetAsset(sku, function(error, result) {
    if (!error) {
      console.log("BlockChain GetAsset ------>", result);
    } else {
      console.log(error);
    }
  });
};

// To get order
exports.GetOrder = function(orderID) {
  tradeContract.GetOrder(orderID, function(error, result) {
    if (!error) {
      console.log("BlockChain GetOrder ------>", result);
    } else {
      console.log(error);
    }
  });
};

// To get user balance
exports.GetUserBalance = async function(_userAddress) {
  let result  = await tradeContract.GetUserBalance(_userAddress);

  return await result;

  // await tradeContract.GetUserBalance(_userAddress, async function(error, result) {
  //   if (!error) {
  //     return await result;
  //     console.log("BlockChain GetUserBalance ------>", result);
  //   } else {
  //     console.log(error);
  //   }
  // });
};

// To get user
exports.GetUser = function(_userAddress) {
  tradeContract.GetUser(_userAddress, function(error, result) {
    if (!error) {
      console.log("BlockChain GetUser ------>", result);
    } else {
      console.log(error);
    }
  });
};

//exports.CreateAsset(101,2500,defaultAccount,1254)
//exports.CreateUser('0x9575f047b78b2b20594CcD1289d37ccA78c8A240',1525)
//exports.CreateOrder(14,50,'0x33eb399f91dB0D8226e9bF9cF725082fA1E7AAAD','0x8a4dEDdE72f1871c93Cd9a1948dDc43A00f8C689',101)

// GetAsset(101)
// GetUser(defaultAccount)
//exports.GetUserBalance("0xa484bdCCAF3Caf86E4b36c6c7dE473c2E5B426c1")
//GetOrder(1001)
