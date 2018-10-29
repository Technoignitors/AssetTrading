const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const isValidUser = async function(req, res, next) {
    console.log(req.payload.id)
    if(!mongoose.Types.ObjectId.isValid(req.payload.id)){
        return res.status(422).json({
            error: "User ID is not valid"
          });
    };

    let UserId = req.payload.id;
    if (!UserId) {
      return res.status(422).json({
        error: "User ID is required"
      });
    } else {
      let user = await Users.findOne({ _id: mongoose.Types.ObjectId(UserId)}).exec();
      if (!user) {
        return res.status(422).json({
          error: "User ID not Found"
        });
      } else {
        return next();
      }
    }
  };

  module.exports = isValidUser