const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const isValidUser = async function(req, res, next) {
    if(!mongoose.Types.ObjectId.isValid(req.body.UserId)){
        console.log(mongoose.Types.ObjectId.isValid(req.body.UserId));
        return res.status(422).json({
            error: "User ID is not valid"
          });
    };

    let UserId = req.body.UserId;
    if (!UserId) {
      return res.status(422).json({
        error: "User ID is required"
      });
    } else {
      let user = await Users.findOne({ _id: req.body.UserId }).exec();
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