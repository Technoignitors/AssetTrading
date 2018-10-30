const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  Name: String,
  Description:String,
  CreatedOn: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Category", CategorySchema);
