const mongoose = require("mongoose");
const router = require("express").Router();
const auth = require("../auth");
const isValidUser = require('../../config/validations/userValidation');
const AssetOwnership = require('../../models/assetownership');



// To get list of user owned assets
router.get(
    "/getUserAssets",
    auth.required,
    isValidUser,
    async (req, res, next) => {
      try {
        AssetOwnership.find({"CurrentOwner":req.payload.id}, function(err, assets) {
          res.json({ "Assets": assets });
        });
       
      } catch (error) {
        return res.status(200).json({
          errors: {
            error: error
          }
        });
      }
    }
  );

module.exports = router;
