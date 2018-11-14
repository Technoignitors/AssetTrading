pragma solidity ^0.4.18;

contract TradeAsset {

  /// The seller's address
  address public owner;

  /// The buyer's address part on this contract
  address public buyerAddr;

  /// The Buyer struct  
  struct Buyer {
    address addr;
    string name;

    bool init;
  }

  /// The Shipment struct
  struct Shipment {
    address courier;
    uint price;
    uint payment;
    address payer;
    uint date;
    uint real_date;

    bool init;
  }

  /// The Order struct
  struct Order {
    string productSku;
    uint quantity;
    uint number;
    uint price;
    uint payment;
    Shipment shipment;

    bool init;
  }

  /// The Invoice struct
  struct Invoice {
    uint orderno;
    uint number;

    bool init;
  }

  /// The mapping to store orders
  mapping (uint => Order) orders;

  /// The mapping to store invoices
  mapping (uint => Invoice) invoices;

  /// The sequence number of orders
  uint orderseq;

  /// The sequence number of invoices
  uint invoiceseq;

  /// Event triggered for every registered buyer
  event BuyerRegistered(address buyer, string name);

  /// Event triggered for every new order
  event OrderSent(address buyer, string productSku, uint quantity, uint orderno);

  /// Event triggerd when the order gets valued and wants to know the value of the payment
  event PriceSent(address buyer, uint orderno, uint price, int8 ttype);

  /// Event trigger when the buyer performs the payment 
  event PaymentSent(address buyer, uint orderno, uint value, uint now);

  /// Event triggered when the seller sends the invoice
  event InvoiceSent(address buyer, uint invoiceno, uint orderno, uint delivery_date, address courier);

  /// Event triggered when the courie delives the order
  event OrderDelivered(address buyer, uint invoiceno, uint orderno, uint real_delivey_date, address courier);

  /// The smart contract's constructor
  function TradeAsset(address _buyerAddr) public payable {
    
    /// The seller is the contract's owner
    owner = msg.sender;

    buyerAddr = _buyerAddr;
  }

  /// The function to send purchase orders
  ///   requires fee
  ///   Payable functions returns just the transaction object, with no custom field.
  ///   To get field values listen to OrderSent event.
  function sendOrder(string productSku, uint quantity) payable public {
    
    /// Accept orders just from buyer
    require(msg.sender == buyerAddr);

    /// Increment the order sequence
    orderseq++;

    /// Create the order register
    orders[orderseq] = Order(productSku, quantity, orderseq, 0, 0, Shipment(0, 0, 0, 0, 0, 0, false), true);

    /// Trigger the event
    OrderSent(msg.sender, productSku, quantity, orderseq);

  }

  /// The function to query orders by number
  ///   Constant functions returns custom fields
  function queryOrder(uint number) constant public returns (address buyer, string productSku, uint quantity, uint price, uint payment, uint delivery_price, uint delivey_payment) {
    
    /// Validate the order number
    require(orders[number].init);

    /// Return the order data
    return(buyerAddr, orders[number].productSku, orders[number].quantity, orders[number].price, orders[number].payment, orders[number].shipment.price, orders[number].shipment.payment);
  }

  /// The function to send the price to pay for order
  ///  Just the owner can call this function
  ///  requires free
  function sendPrice(uint orderno, uint price, int8 ttype) payable public {
  
    /// Only the owner can use this function
    require(msg.sender == owner);

    /// Validate the order number
    require(orders[orderno].init);

    /// Validate the type
    ///  1=order
    ///  2=shipment
    require(ttype == 1 || ttype == 2);

    if(ttype == 1){/// Price for Order

      /// Update the order price
      orders[orderno].price = price;

    } else {/// Price for Shipment

      /// Update the shipment price
      orders[orderno].shipment.price = price;
      orders[orderno].shipment.init  = true;
    }

    /// Trigger the event
    PriceSent(buyerAddr, orderno, price, ttype);

  }

  /// The function to send the value of order's price
  ///  This value will be blocked until the delivery of order
  ///  requires fee
  function sendPayment(uint orderno) payable public {

    /// Validate the order number
    require(orders[orderno].init);

    /// Just the buyer can make payment
    require(buyerAddr == msg.sender);

    /// The order's value plus the shipment value must equal to msg.value
    require((orders[orderno].price + orders[orderno].shipment.price) == msg.value);

    orders[orderno].payment = msg.value;

    PaymentSent(msg.sender, orderno, msg.value, now);
  }

  /// The function to send the invoice data
  ///  requires fee
  function sendInvoice(uint orderno, uint delivery_date, address courier) payable public {

    /// Validate the order number
    require(orders[orderno].init);

    /// Just the seller can send the invoice
    require(owner == msg.sender);

    invoiceseq++;

    /// Create then Invoice instance and store it
    invoices[invoiceseq] = Invoice(orderno, invoiceseq, true);

    /// Update the shipment data
    orders[orderno].shipment.date    = delivery_date;
    orders[orderno].shipment.courier = courier;

    /// Trigger the event
    InvoiceSent(buyerAddr, invoiceseq, orderno, delivery_date, courier);
  }

  /// The function to get the sent invoice
  ///  requires no fee
  function getInvoice(uint invoiceno) constant public returns (address buyer, uint orderno, uint delivery_date, address courier){
  
    /// Validate the invoice number
    require(invoices[invoiceno].init);

    Invoice storage _invoice = invoices[invoiceno];
    Order storage _order     = orders[_invoice.orderno];

    return (buyerAddr, _order.number, _order.shipment.date, _order.shipment.courier);
  }

  /// The function to mark an order as delivered
  function delivery(uint invoiceno, uint timestamp) payable public {

    /// Validate the invoice number
    require(invoices[invoiceno].init);

    Invoice storage _invoice = invoices[invoiceno];
    Order storage _order     = orders[_invoice.orderno];

    /// Just the courier can call this function
    require(_order.shipment.courier == msg.sender);

    OrderDelivered(buyerAddr, invoiceno, _order.number, timestamp, _order.shipment.courier);

    /// Payout the Order to the seller
    owner.transfer(_order.payment);

    /// Payout the Shipment to the courier
    _order.shipment.courier.transfer(_order.shipment.payment);

  }

  function health() pure public returns (string) {
    return "running";
  }
}