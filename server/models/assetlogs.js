const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetLogsSchema = new Schema({
  SellerUserID: {
    type: Schema.ObjectId,
    ref: "Users"
  },
  BuyerUserID: {
    type: Schema.ObjectId,
    ref: "Users"
  },
  CurrentOwner: {
    type: Schema.ObjectId,
    ref: "Users"
  },
  AssetID: {
    type: Schema.ObjectId,
    ref: "Asset"
  },
  FinalPurchasePrice: Number,
  AvailDiscount: { type: Number, enum: [1, 2], default: 1 },
  DiscountPercentage: Number,
  DiscounedAmount: Number,
  DeliveryAddressType: {
    type: String,
    enum: ["Permanent", "Corrospondence"],
    default: "Permanent"
  },
  Status: {
    type: String,
    enum: [
      "Accepted",
      "Rejected",
      "Proccesing",
      "Processed",
      "Completed",
      "Pending"
    ],
    default: "Pending"
  },
  CreatedOn: {
    type: Date,
    default: new Date()
  },
  UpdatedOn: {
    type: Date,
    default: new Date()
  },
  CreatedBy: {
    type: Schema.ObjectId,
    ref: "Users"
  },
  UpdatedBy: {
    type: Schema.ObjectId,
    ref: "Users"
  }
});

module.exports = mongoose.model("AssetLogs", AssetLogsSchema);
