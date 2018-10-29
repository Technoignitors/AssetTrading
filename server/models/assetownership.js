const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetOwnershipSchema = new Schema({
  CurrentOwner: {
    type: Schema.ObjectId,
    ref: "Users"
  },
  PreviousOwner: {
    type: Schema.ObjectId,
    ref: "Users"
  },
  AssetID: {
    type: Schema.ObjectId,
    ref: "Asset"
  },
  AvailDiscount: { type: Number, enum: [1, 2], default: 1 },
  DiscountPercentage: Number,
  DiscounedAmount: Number,
  DeliveryAddressType: {
    type: String,
    enum: ["Permanent", "Corrospondence"],
    default: "Permanent"
  },
  GST: Number,
  AssetPrice: Number,
  FinalPurchasePrice: Number,
  OwnershipStatus: { type: Number, enum: [1, 2], default: 1 },
  AssetOffers: [
    {
      Name: String,
      Description: String,
      Type: {
        type: String,
        enum: ["CreditCard", "DebitCard", "BankAccount", "Cash"],
        default: "CreditCard"
      }
    }
  ],
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

module.exports = mongoose.model("AssetOwnership", AssetOwnershipSchema);
