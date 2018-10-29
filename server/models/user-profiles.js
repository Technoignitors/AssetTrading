const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  UserId: {
    type: Schema.ObjectId,
    ref: "Users"
  },
  FirstName: String,
  LastName: String,
  MaidenName: String,
  DOB: String,
  FatherName: String,
  CorrospondenceAddressStreet1: String,
  CorrospondenceAddressStreet2: String,
  CorrospondenceAddressCity: String,
  CorrospondenceAddressState: String,
  CorrospondenceAddressCountry: String,
  CorrospondenceAddressZipCode: String,
  PermanentAddressStreet1: String,
  PermanentAddressStreet2: String,
  PermanentAddressCity: String,
  PermanentAddressState: String,
  PermanentAddressCountry: String,
  PermanentAddressZipCode: String,
  PAN: String,
  ResidentStatus: { type: String, enum: ["Indian", "NRI"], default: "Indian" },
  Mobile: Number,
  LandLine: Number,
  MobileBelongsTo: { type: String, enum: ["1", "2"], default: "1" },
  Email: String,
  SecondaryEmail: String,
  IfEmployed: Boolean,
  Occupation: String,
  GrossIncome: Number,
  NetWorth: Number,
  GSTRegistered: Boolean,
  GST: String,
  Mtoken: Number,
  ProfileImage: String,
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

module.exports = mongoose.model("UserProfile", UsersSchema);
