const express = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();
const auth = require("../auth");
const Users = mongoose.model("Users");
const Asset = require("../../models/assets");
//const Asset = mongoose.model("Assets");
const isValidUser = require("../../config/validations/userValidation");
const upload = require("../../config/image-upload");

router.post("/upload", auth.required, isValidUser, async (req, res, next) => {
  try {
    let sku = await Asset.findOne({ SKU: req.body.SKU }).exec();
    if (sku) {
      return res.status(422).json({
        error: "SKU Already Exists"
      });
    } else {
      let asset = new Asset(req.body);
      return await asset.save().then(result => res.json({ result }));
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
        await Asset.findOneAndUpdate(
          ID,
          { $set: req.body },
          { new: true }
        ).exec(async (err, result) => {
          return await res.json({ result });
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

router.post("/uploadImages", auth.required,isValidUser, upload.array('Images', 10), async (req, res, next) => {
  try {
    let _sku = await Asset.findOne({ _id: req.body.Id }).exec();
    if (!_sku) {
      return res.status(422).json({
        error: "Asset Doesnot Exists"
      });
    } else {
      req.files.forEach(element => {
        _sku.Images.push({
          filename:element.filename,
          mimetype:element.mimetype,
          path:element.path,
          size:element.size
        })
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
});

router.post("/uploadDocuments", auth.required,isValidUser, upload.array('Documents', 10), async (req, res, next) => {
  try {
    let _sku = await Asset.findOne({ _id: req.body.Id }).exec();
    if (!_sku) {
      return res.status(422).json({
        error: "Asset Doesnot Exists"
      });
    } else {
      req.files.forEach(element => {
        _sku.Documents.push({
          filename:element.filename,
          mimetype:element.mimetype,
          path:element.path,
          size:element.size
        })
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
});

router.post("/Reviews", auth.required,isValidUser, upload.array('Documents', 10), async (req, res, next) => {
  try {
    let _sku = await Asset.findOne({ _id: req.body.Id }).exec();
    if (!_sku) {
      return res.status(422).json({
        error: "Asset Doesnot Exists"
      });
    } else {
      req.body.ReviewGivenBy = req.payload.id
      _sku.Reviews.push(req.body)
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
});

router.post("/Ratings", auth.required,isValidUser, upload.array('Documents', 10), async (req, res, next) => {
  try {
    let _sku = await Asset.findOne({ _id: req.body.Id }).exec();
    if (!_sku) {
      return res.status(422).json({
        error: "Asset Doesnot Exists"
      });
    } else {
      req.body.RatingGivenBy = req.payload.id
      _sku.Rating.push(req.body)
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
});

router.post("/Queries", auth.required,isValidUser, upload.array('Documents', 10), async (req, res, next) => {
  try {
    let _sku = await Asset.findOne({ _id: req.body.Id }).exec();
    if (!_sku) {
      return res.status(422).json({
        error: "Asset Doesnot Exists"
      });
    } else {
      req.body.QueryGivenBy = req.payload.id
      _sku.Queries.push(req.body)
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
});

module.exports = router;
