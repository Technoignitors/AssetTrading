const express = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();
const auth = require("../auth");
const UserProfile = mongoose.model("UserProfile");
const Asset = require("../../models/assets");
const AssetOwnership = require("../../models/assetownership");
const AssetLogs = require("../../models/assetLogs");
const Category = require("../../models/category");
const isValidUser = require("../../config/validations/userValidation");
const upload = require("../../config/image-upload");

router.post("/upload", auth.required, isValidUser, async (req, res, next) => {
  try {
    console.log(req.body.id);
    let sku = await Asset.findOne({ SKU: req.body.SKU }).exec();
    if (sku) {
      return res.status(200).json({
        error: "SKU Already Exists"
      });
    } else {
      req.body.UploadedBy = req.body.id;
      req.body.CurrentOwner = req.body.id;
      req.body.CreatedBy = req.body.id;
      req.body.UpdatedBy = req.body.id;
      let asset = new Asset(req.body);
      return await asset.save().then(result => {
        let request = {
          CurrentOwner: result.CreatedBy,
          PreviousOwner: result.CreatedBy,
          AssetID: result._id,
          AvailDiscount: req.body.AvailDiscount,
          DiscountPercentage: req.body.DiscountPercentage,
          DiscounedAmount: req.body.DiscounedAmount,
          AssetPrice: req.body.AssetPrice,
          FinalPurchasePrice: req.body.FinalPurchasePrice,
          CreatedBy: result.CreatedBy,
          UpdatedBy: result.CreatedBy
        };
        let assetOwnership = new AssetOwnership(request);
        assetOwnership.save().then(result => {
          res.json({ result });
        });
      });
    }
  } catch (error) {
    return res.status(422).json({
      errors: {
        error: error
      }
    });
  }
});

router.post("/update", auth.required, isValidUser, async (req, res, next) => {
  try {
    let sku = await Asset.findOne({ _id: req.body.Id }).exec();
    if (!sku) {
      return res.status(422).json({
        error: "Asset Doesnot Exists"
      });
    } else {
      const ID = req.body.Id;
      req.body.UpdatedOn = new Date();
      await Asset.findOneAndUpdate(ID, { $set: req.body }, { new: true }).exec(
        async (err, result) => {
          return await res.json({ result });
        }
      );
    }
  } catch (error) {
    return res.status(422).json({
      errors: {
        error: error
      }
    });
  }
});

router.post("/myAssets", auth.required, async (req, res, next) => {
  try {
    let assets = await Asset.find({ CurrentOwner: req.body.id })
      .lean()
      .exec();
    let Owners = {};
    let userDetails = {};
    for (let index = 0; index < assets.length; index++) {
      let category = await Category.find({
        _id: assets[index].Category
      })
        .lean()
        .exec();
      assets[index].CategoryName = category[0].Name
      Owners = await AssetOwnership.find({ AssetID: assets[index]._id })
        .lean()
        .exec();
      userDetails = await UserProfile.find({
        UserId: assets[index].CurrentOwner
      })
        .lean()
        .exec();
      assets[index].UserDetails = userDetails[0];
      assets[index].OwnerShipDetails = Owners[0];
    }
    return await res.json({ Assets: assets });
  } catch (error) {
    return res.status(200).json({
      errors: {
        error: error
      }
    });
  }
});

router.post("/getDashboardAssets", auth.required, async (req, res, next) => {
  try {
    let assets = await Asset.find({
      CurrentOwner: { $ne: req.body.id }
    })
      .lean()
      .exec();
    let Owners = {};
    let userDetails = {};

    for (let index = 0; index < assets.length; index++) {
      let category = await Category.find({
        _id: assets[index].Category
      });
      assets[index].CategoryName = category[0].Name;
      Owners = await AssetOwnership.find({ AssetID: assets[index]._id })
        .lean()
        .exec();
      userDetails = await UserProfile.find({
        UserId: assets[index].CurrentOwner
      })
        .lean()
        .exec();
      assets[index].UserDetails = userDetails[0];
      assets[index].OwnerShipDetails = Owners[0];
    }

    return await res.json({ Assets: assets });
  } catch (error) {
    return res.status(200).json({
      errors: {
        error: error
      }
    });
  }
});

router.get("/getAllAssets", auth.required, async (req, res, next) => {
  try {
    let assets = await Asset.find()
      .lean()
      .exec();
    let Owners = {};
    let userDetails = {};
    for (let index = 0; index < assets.length; index++) {
      let category = await Category.find({
        _id: assets[index].Category
      });
      assets[index].CategoryName = category[0].Name;
      Owners = await AssetOwnership.find({ AssetID: assets[index]._id })
        .lean()
        .exec();
      userDetails = await UserProfile.find({
        UserId: assets[index].CurrentOwner
      })
        .lean()
        .exec();
      assets[index].UserDetails = userDetails[0];
      assets[index].OwnerShipDetails = Owners[0];
    }

    return await res.json({ Assets: assets });
  } catch (error) {
    return res.status(200).json({
      errors: {
        error: error
      }
    });
  }
});

router.post("/getAssetDetails", auth.required, async (req, res, next) => {
  try {
    let assets = await Asset.findById({ _id: req.body.id })
      .lean()
      .exec();
    let Owners = {};
    let userDetails = {};
    let category = await Category.find({
      _id: assets.Category
    })
      .lean()
      .exec();
    assets.CategoryName = category[0].Name;
    Owners = await AssetOwnership.find({ AssetID: assets._id })
      .lean()
      .exec();
    userDetails = await UserProfile.find({
      UserId: assets.CurrentOwner
    })
      .lean()
      .exec();
    assets.UserDetails = userDetails[0];
    assets.OwnerShipDetails = Owners[0];
    return await res.json({ Assets: assets });
  } catch (error) {
    return res.status(200).json({
      errors: {
        error: error
      }
    });
  }
});

router.post("/getAssetHistory", auth.required, async (req, res, next) => {
  try {
    let assets = await AssetLogs.findById({ _id: req.body.id })
      .lean()
      .exec();
    let Owners = {};
    let userDetails = {};
    Owners = await AssetOwnership.find({ AssetID: assets._id })
      .lean()
      .exec();
    userDetails = await UserProfile.find({
      UserId: assets.CurrentOwner
    })
      .lean()
      .exec();
    assets.UserDetails = userDetails;
    assets.OwnerShipDetails = Owners;
    return await res.json({ Assets: assets });
  } catch (error) {
    return res.status(200).json({
      errors: {
        error: error
      }
    });
  }
});

router.post(
  "/uploadImages",
  auth.required,
  isValidUser,
  upload.array("Images", 10),
  async (req, res, next) => {
    try {
      let _sku = await Asset.findOne({ _id: req.body.Id }).exec();
      if (!_sku) {
        return res.status(422).json({
          error: "Asset Doesnot Exists"
        });
      } else {
        req.files.forEach(element => {
          _sku.Images.push({
            filename: element.filename,
            mimetype: element.mimetype,
            path: element.path,
            size: element.size
          });
        });
        let asset = new Asset(_sku);
        return await asset.save().then(result => res.json({ result }));
      }
    } catch (error) {
      return res.status(422).json({
        errors: {
          error: error
        }
      });
    }
  }
);

router.post(
  "/uploadDocuments",
  auth.required,
  isValidUser,
  upload.array("Documents", 10),
  async (req, res, next) => {
    try {
      let _sku = await Asset.findOne({ _id: req.body.Id }).exec();
      if (!_sku) {
        return res.status(422).json({
          error: "Asset Doesnot Exists"
        });
      } else {
        req.files.forEach(element => {
          _sku.Documents.push({
            filename: element.filename,
            mimetype: element.mimetype,
            path: element.path,
            size: element.size
          });
        });
        let asset = new Asset(_sku);
        return await asset.save().then(result => res.json({ result }));
      }
    } catch (error) {
      return res.status(422).json({
        errors: {
          error: error
        }
      });
    }
  }
);

router.post(
  "/Reviews",
  auth.required,
  isValidUser,
  upload.array("Documents", 10),
  async (req, res, next) => {
    try {
      let _sku = await Asset.findOne({ _id: req.body.Id }).exec();
      if (!_sku) {
        return res.status(422).json({
          error: "Asset Doesnot Exists"
        });
      } else {
        req.body.ReviewGivenBy = req.body.id;
        _sku.Reviews.push(req.body);
        let asset = new Asset(_sku);
        return await asset.save().then(result => res.json({ result }));
      }
    } catch (error) {
      return res.status(422).json({
        errors: {
          error: error
        }
      });
    }
  }
);

router.post(
  "/Ratings",
  auth.required,
  isValidUser,
  upload.array("Documents", 10),
  async (req, res, next) => {
    try {
      let _sku = await Asset.findOne({ _id: req.body.Id }).exec();
      if (!_sku) {
        return res.status(422).json({
          error: "Asset Doesnot Exists"
        });
      } else {
        req.body.RatingGivenBy = req.body.id;
        _sku.Rating.push(req.body);
        let asset = new Asset(_sku);
        return await asset.save().then(result => res.json({ result }));
      }
    } catch (error) {
      return res.status(422).json({
        errors: {
          error: error
        }
      });
    }
  }
);

router.post(
  "/Queries",
  auth.required,
  isValidUser,
  upload.array("Documents", 10),
  async (req, res, next) => {
    try {
      let _sku = await Asset.findOne({ _id: req.body.Id }).exec();
      if (!_sku) {
        return res.status(422).json({
          error: "Asset Doesnot Exists"
        });
      } else {
        req.body.QueryGivenBy = req.body.id;
        _sku.Queries.push(req.body);
        let asset = new Asset(_sku);
        return await asset.save().then(result => res.json({ result }));
      }
    } catch (error) {
      return res.status(422).json({
        errors: {
          error: error
        }
      });
    }
  }
);

module.exports = router;
