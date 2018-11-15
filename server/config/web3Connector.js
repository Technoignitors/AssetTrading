var Web3 = require("web3");
//var web3Address = new Web3("http://localhost:7545");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
//let web3 = new Web3(new Web3.providers.HttpProviders(web3Address));
// if (typeof Web3 !== "undefined") {
//   web3 = new Web3(web3.currentProvider);
// } else {
//   web3 = new Web3(new Web3.providers.HttpProviders(web3Address));
// }

// console.log(web3.eth.accounts);

// set the default account
web3.eth.defaultAccount = web3.eth.accounts[0];

//console.log("accounts",web3.eth.accounts[0]);
//console.log("defaultAccount",web3.eth.defaultAccount);

//var contract = new web3.eth.Contract(abi, address);

var tradecontractContract = web3.eth.contract([
  {
    constant: false,
    inputs: [
      { name: "_sku", type: "uint16" },
      { name: "_price", type: "uint256" },
      { name: "_owner", type: "address" },
      { name: "_lastModifiedOn", type: "uint32" }
    ],
    name: "RegisterAsset",
    outputs: [],
    payable: false,
    type: "function",
    stateMutability: "nonpayable"
  },
  {
    constant: true,
    inputs: [{ name: "_userAddress", type: "address" }],
    name: "GetUser",
    outputs: [
      { name: "_userAddr", type: "address" },
      { name: "_userBalance", type: "uint256" }
    ],
    payable: false,
    type: "function",
    stateMutability: "view"
  },
  {
    constant: false,
    inputs: [
      { name: "_userAddress", type: "address" },
      { name: "_initialBalance", type: "uint256" }
    ],
    name: "RegisterUser",
    outputs: [],
    payable: false,
    type: "function",
    stateMutability: "nonpayable"
  },
  {
    constant: false,
    inputs: [
      { name: "_orderId", type: "uint16" },
      { name: "_orderAmount", type: "uint256" },
      { name: "_orderStatus", type: "uint8" },
      { name: "_buyer", type: "address" },
      { name: "_seller", type: "address" },
      { name: "_sku", type: "uint16" },
      { name: "_orderDate", type: "uint8" }
    ],
    name: "GenerateOrder",
    outputs: [],
    payable: true,
    type: "function",
    stateMutability: "payable"
  },
  {
    constant: true,
    inputs: [{ name: "_orderId", type: "uint16" }],
    name: "GetOrder",
    outputs: [
      { name: "_orderAmount", type: "uint256" },
      { name: "_orderStatus", type: "uint8" },
      { name: "buyer", type: "address" },
      { name: "seller", type: "address" },
      { name: "_sku", type: "uint16" },
      { name: "_orderDate", type: "uint32" }
    ],
    payable: false,
    type: "function",
    stateMutability: "view"
  },
  {
    constant: true,
    inputs: [{ name: "_sku", type: "uint16" }],
    name: "GetAsset",
    outputs: [
      { name: "_asset", type: "uint16" },
      { name: "_price", type: "uint256" },
      { name: "_owner", type: "address" },
      { name: "_lastModifiedOn", type: "uint32" }
    ],
    payable: false,
    type: "function",
    stateMutability: "view"
  },
  {
    constant: true,
    inputs: [{ name: "_userAddress", type: "address" }],
    name: "GetUserBalance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function",
    stateMutability: "view"
  },
  {
    inputs: [],
    type: "constructor",
    payable: true,
    stateMutability: "payable"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_orderId", type: "uint16" },
      { indexed: false, name: "_orderAmount", type: "uint256" },
      { indexed: false, name: "_orderStatus", type: "uint256" },
      { indexed: false, name: "buyer", type: "address" },
      { indexed: false, name: "seller", type: "address" },
      { indexed: false, name: "_sku", type: "uint16" },
      { indexed: false, name: "_orderDate", type: "uint256" }
    ],
    name: "CreateOrder",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_userAddress", type: "address" },
      { indexed: false, name: "_userBalance", type: "uint256" }
    ],
    name: "CreateUser",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_newOwner", type: "address" },
      { indexed: false, name: "_previousOwner", type: "address" },
      { indexed: false, name: "_sku", type: "uint16" }
    ],
    name: "TransferAssetOwnership",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_sku", type: "uint16" },
      { indexed: false, name: "_price", type: "uint256" },
      { indexed: false, name: "_owner", type: "address" },
      { indexed: false, name: "_lastModifiedOn", type: "uint32" }
    ],
    name: "CreateAsset",
    type: "event"
  }
]);



//Get from deployed contract
var tradeContract = tradecontractContract.at(
  "0xc56742aba094375998bc3d428a7af76758713fca"
);
console.log("---------------");
//console.log(tradeContract);

function CreateAsset(_sku,_price, _owner, _lastModifiedOn){
    tradeContract.RegisterAsset(_sku,_price, _owner, _lastModifiedOn);
}

function CreateUser(_userAddress,balance){
  tradeContract.RegisterUser(_userAddress,balance);
}

function CreateOrder(_orderId,_orderAmount, _orderStatus, _buyer, _seller, _sku, _orderDate ){
  tradeContract.GenerateOrder(_orderId,_orderAmount, _orderStatus, _buyer, _seller, _sku, _orderDate);
}

//CreateAsset(103,2500,'0xC7e4F8C8F2182b86e4df4D89Bb8cDe5C32C970CA',1254)
//CreateUser('0xC2FA5d53f36ac2912944df845852Cd5d1c0EDF20',1500)
//CreateOrder(101,1200,1,'0xC7e4F8C8F2182b86e4df4D89Bb8cDe5C32C970CA','0xC2FA5d53f36ac2912944df845852Cd5d1c0EDF20',102,12541)

function GetAsset(sku) {
    tradeContract.GetAsset(sku,function(error, result) {
      if (!error) {
        console.log("BlockChain GetAsset ------>", result);
      } else {
        console.log(error);
      }
    });
  }

  function GetOrder(orderID) {
    tradeContract.GetOrder(orderID,function(error, result) {
      if (!error) {
        console.log("BlockChain GetOrder ------>", result);
      } else {
        console.log(error);
      }
    });
  }

  function GetUserBalance(_userAddress) {
    tradeContract.GetUserBalance(_userAddress,function(error, result) {
      if (!error) {
        console.log("BlockChain GetUserBalance ------>", result);
      } else {
        console.log(error);
      }
    });
  }

  function GetUser(_userAddress) {
    tradeContract.GetUser(_userAddress,function(error, result) {
      if (!error) {
        console.log("BlockChain GetUser ------>", result);
      } else {
        console.log(error);
      }
    });
  }

 GetAsset(102)
 GetUser('0x40257f4d02f45271fff4cBDccdd4c2e936f3DBd9')
 GetUserBalance('0x40257f4d02f45271fff4cBDccdd4c2e936f3DBd9')
 GetOrder(102)

