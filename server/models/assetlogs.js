const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetLogsSchema = new Schema({
  CurrentOwner: {
    type: Schema.ObjectId,
    ref: "Users"
  },
  AssetID: {
    type: Schema.ObjectId,
    ref: "Asset"
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
