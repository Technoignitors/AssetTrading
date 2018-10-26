const express = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();
const auth = require("../auth");
const Users = mongoose.model("Users");
const Asset = require("../../models/assets");
//const Asset = mongoose.model("Assets");
const isValidUser = require("../../config/validations/userValidation");

router.post("/upload", auth.required, isValidUser, async (req, res, next) => {
  try {
    let sku = await Asset.findOne({ SKU: req.body.SKU }).exec();
    if (sku) {
      return res.status(422).json({
        error: "SKU Already Exists"
      });
    } else {
      let asset = new Asset(req.body);
      console.log("req.body", req.body);
      return await asset.save().then(result => res.json({ result }));
    }
  } catch (error) {
    console.log("error", error);
    return res.status(422).json({
      errors: {
        error: error
      }
    });
  }
});

router.post("/update", auth.required, isValidUser, async (req, res, next) => {
  try {
    let _sku = await Asset.findOne({ SKU: req.body.sku }).exec();
    if (sku) {
      return res.status(422).json({
        error: "SKU Already Exists"
      });
    } else {
      return await Asset.save().then(result => res.json({ result }));
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
