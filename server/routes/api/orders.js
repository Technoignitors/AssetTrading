const mongoose = require("mongoose");
const router = require("express").Router();
const auth = require("../auth");
const isValidUser = require("../../config/validations/userValidation");
const OrderHistory = require("../../models/orderhistory");
const AssetOwnership = require("../../models/assetownership");
const UserProfile = require("../../models/user-profiles");
const Assets = require("../../models/assets");
const web3Connector = require("../../config/web3Connector");

// To get order history of an user
router.post(
  "/getOrderHistory",
  auth.required,
  isValidUser,
  async (req, res, next) => {
    try {
      let orderHistory = await OrderHistory.find({ UserID: req.body.userID })
        .lean()
        .exec();

      let Owners = {};
      let userDetails = {};
      let assetDetails = {};
      for (let index = 0; index < orderHistory.length; index++) {
        Owners = await AssetOwnership.find({
          AssetID: orderHistory[index].AssetID
        })
          .lean()
          .exec();

        assetDetails = await Assets.find({
          _id: orderHistory[index].AssetID
        })
          .lean()
          .exec();
        userDetails = await UserProfile.find({
          UserId: req.body.userID
        })
          .lean()
          .exec();
        orderHistory[index].UserDetails = userDetails[0];
        orderHistory[index].OwnerShipDetails = Owners[0];
        orderHistory[index].AssetDetails = assetDetails[0];
      }
      return await res.json({ Orders: orderHistory });
    } catch (error) {
      return res.status(200).json({
        errors: {
          error: error
        }
      });
    }
  }
);

router.get(
  "/getAllPendingOrder",
  auth.required,
  isValidUser,
  async (req, res, next) => {
    try {
      let orderHistory = await OrderHistory.find({ Status: "Pending" })
        .lean()
        .exec();

      let Owners = {};
      let userDetails = {};
      let assetDetails = {};
      for (let index = 0; index < orderHistory.length; index++) {
        Owners = await AssetOwnership.find({
          AssetID: orderHistory[index].AssetID
        })
          .lean()
          .exec();
        userDetails = await UserProfile.find({
          UserId: orderHistory[index].UserID
        })
          .lean()
          .exec();

        assetDetails = await Assets.find({
          _id: orderHistory[index].AssetID
        })
          .lean()
          .exec();
        orderHistory[index].UserDetails = userDetails[0];
        orderHistory[index].OwnerShipDetails = Owners[0];
        orderHistory[index].AssetDetails = assetDetails[0];
      }
      return await res.json({ Orders: orderHistory });
    } catch (error) {
      return res.status(200).json({
        errors: {
          error: error
        }
      });
    }
  }
);

// To save order details
router.post("/setOrder", auth.required, isValidUser, async (req, res, next) => {
  try {
    let OrderId = req.body.OrderId;
    let SKU = ""
    if (OrderId) {
      req.body.UpdatedBy = req.body.userID;
      req.body.UpdatedOn = new Date();

      await OrderHistory.findOneAndUpdate(
        { _id: OrderId },
        { $set: req.body },
        { new: false }
      ).exec(async (err, result) => {
        if (req.body.Status === "Completed") {
          let _req = {
            CurrentOwner: result.UserID,
            UpdatedOn: new Date(),
            UpdatedBy: req.body.userID
          };

          await Assets.findOneAndUpdate(
            { _id: req.body.AssetID },
            { $set: _req },
            { new: true }
          ).exec(async (err, result) => {
            console.log(result);
            SKU = result.SKU
          });

          let asset = await AssetOwnership.findOne({
            AssetID: req.body.AssetID
          })
            .lean()
            .exec();
          if (asset) {
            asset.PreviousOwner = asset.CurrentOwner;
            asset.CurrentOwner = result.CreatedBy;
            (asset.UpdatedOn = new Date()), (asset.UpdatedBy = req.body.userID);

            await AssetOwnership.findOneAndUpdate(
              { _id: req.body.AssetID },
              { $set: asset },
              { new: true }
            ).exec(async (e, r) => {
              await console.log("RESULT: " + r);
              //return await res.json({ r });
            });
            let currentLoggedIN = await UserProfile.findOne({
              UserId: asset.PreviousOwner
            })
              .lean()
              .exec();
            let currentOwner = await UserProfile.findOne({ UserId: asset.CurrentOwner })
              .lean()
              .exec();
            // await web3Connector.CreateOrder(
            //   result._id,
            //   result.FinalPurchasePrice,
            //   2,
            //   currentLoggedIN.bAddress, // current logedded in user buyer
            //   currentOwner.bAddress, // asset owner user is seller
            //   SKU,
            //   1321
            // );
          }
        } else {
          let _req = {
            CurrentOwner: result.UserID,
            UpdatedOn: new Date(),
            UpdatedBy: req.body.userID
          };

          await Assets.findOneAndUpdate(
            { _id: req.body.AssetID },
            { $set: _req },
            { new: true }
          ).exec(async (err, result) => {
            console.log(result);
          });
        }

        return await res.json({ result });
      });
    } else {
      req.body.UserID = req.body.userID;
      req.body.CreatedBy = req.body.userID;
      let orderHistory = new OrderHistory(req.body);
      return await orderHistory.save().then(result => res.json({ result }));
    }
  } catch (error) {
    return res.status(200).json({
      errors: {
        error: error
      }
    });
  }
});

module.exports = router;
