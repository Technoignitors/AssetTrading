const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetSchema = new Schema({  
  SKU: {
    type: String,
    unique:true
  },
  UploadedBy: {
    type: Schema.ObjectId,
    ref: "Users"
  },
  CurrentOwner: {
    type: Schema.ObjectId,
    ref: "Users"
  },
  Category: {
    type: Schema.ObjectId,
    ref: "Category"
  },
  Name: String,
  Description: String,
  Specification: String,
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
  },
  Reviews: [
    {
      ReviewGivenBy: {
        type: Schema.ObjectId,
        ref: "Users"
      },
      ReviewDescription: String,
      ReviewDate: {
        type: Date,
        default: new Date()
      }
    }
  ],
  Rating: [
    {
      RatingGivenBy: {
        type: Schema.ObjectId,
        ref: "Users"
      },
      Review: { type: Number, default: 1 },
      RatingDate: {
        type: Date,
        default: new Date()
      }
    }
  ],
  Queries: [
    {
      QueryGivenBy: {
        type: Schema.ObjectId,
        ref: "Users"
      },
      QueryDescription: { type: String },
      QueryDate: {
        type: Date,
        default: new Date()
      }
    }
  ],

  Documents: [
    {
      filename:"String",
      mimetype:"String",
      path:"String",
      size:Number
    }
  ],
  Images: [
    {
      filename:"String",
      mimetype:"String",
      path:"String",
      size:Number
    }
  ]
});

module.exports = mongoose.model("Asset", AssetSchema);
