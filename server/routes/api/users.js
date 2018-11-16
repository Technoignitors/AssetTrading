const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth");
const Users = mongoose.model("Users");
const UserProfile = require("../../models/user-profiles");
const Category = require("../../models/category");
const isValidUser = require("../../config/validations/userValidation");
const upload = require("../../config/image-upload");
const web3Connector = require("../../config/web3Connector");

//POST new user route (optional, everyone has access)
router.post("/", auth.optional, (req, res, next) => {
  const {
    body: { user }
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save().then(user => {
    let UserId = {
      UserId: user.id,
      FirstName: "Test",
      LastName: "Test"
    };
    let userProfile = new UserProfile(UserId);
    return userProfile.save().then(result => res.json({ result }));
  });
});

//POST login route (optional, everyone has access)
router.post("/login", auth.optional, (req, res, next) => {
  const {
    body: { user }
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        console.log(passportUser.role);
        const user = passportUser;
        user.token = passportUser.generateJWT();
        const role = passportUser.role;
        return res.json({ user: user.toAuthJSON(), role: role });
      }
      return res.status(200).json({
        errors: {
          error: "Invalid Email and Password"
        }
      });
    }
  )(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get("/current", auth.required, (req, res, next) => {
  const {
    payload: { id }
  } = req;

  return Users.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user: user.toAuthJSON() });
  });
});

router.post("/getBalance", auth.required, async (req, res, next) => {
  //let userInfo = await UserProfile.findOne({UserId:req.body.bAddress}).lean().exec()
  let balance = await web3Connector.GetUserBalance(req.body.bAddress)
  if(balance){
    return res.json({ balance: balance.c[0] });
  }else{
    return res.json({ balance: 0 });
  }
});

router.post("/getEthUser", auth.required, async (req, res, next) => {
  let userInfo = await UserProfile.findOne({UserId:req.body.id}).lean().exec()
  let user = await web3Connector.GetUser(userInfo.bAddress)
  if(balance){
    return res.json({ balance: user });
  }else{
    return res.json({ error: "Not Found" });
  }
});

router.post("/getBalance", auth.required, async (req, res, next) => {
  let userInfo = await UserProfile.findOne({UserId:req.body.bAddress}).lean().exec()
  let balance = await web3Connector.GetUserBalance(userInfo.bAddress)
  if(balance){
    return res.json({ balance: balance.c[0] });
  }else{
    return res.json({ balance: 0 });
  }
});

router.get("/logout", function(req, res) {
  try {
    req.logout();
    return res.status(200).json({
      Message: "Logout Successful"
    });
  } catch (error) {
    return res.status(200).json({
      errors: {
        error: "Could not logout"
      }
    });
  }
});

router.post(
  "/getUserProfile",
  auth.required,
  isValidUser,
  async (req, res, next) => {
    try {
      let UserId = req.body.id;
      let _up = await UserProfile.findOne({ UserId: UserId }).exec();

      if (!_up) {
        throw "User Profile is not set";
      } else {
        return await res.json({ userProfile: _up });
      }
    } catch (error) {
      return res.status(200).json({
        errors: {
          error: error
        }
      });
    }
  }
);

router.post("/saveCategories", auth.required, async (req, res, next) => {
  try {
    let cat = new Category(req.body);
    await cat.save();
    let _cat = await Category.find()
      .lean()
      .exec();
    return await res.json({ Categories: _cat });
  } catch (error) {
    return res.status(200).json({
      errors: {
        error: error
      }
    });
  }
});

router.get("/getCategories", auth.required, async (req, res, next) => {
  try {
    let _cat = await Category.find()
      .lean()
      .exec();
    return await res.json({ Categories: _cat });
  } catch (error) {
    return res.status(200).json({
      errors: {
        error: error
      }
    });
  }
});

router.post(
  "/userProfile",
  auth.required,
  isValidUser,
  async (req, res, next) => {
    try {
      let UserId = req.payload.id;
      let _up = await UserProfile.findOne({ UserId: UserId }).exec();
      if (!_up) {
        req.body.UserId = UserId;
        let userProfile = new UserProfile(req.body);
        await web3Connector.CreateUser(req.body.bAddress, 1000);
        return await userProfile.save().then(result => res.json({ result }));
      } else {
        const ID = _up._id;
        req.body.UpdatedOn = new Date();
        await UserProfile.findOneAndUpdate(
          { _id: ID },
          { $set: req.body },
          { new: true }
        ).exec(async (err, result) => {
          await console.log("RESULT: " + result);
          return await res.json({ result });
        });
       await web3Connector.CreateUser(req.body.bAddress, 1000);
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
  "/userProfileImageUpload",
  auth.required,
  isValidUser,
  upload.single("ProfileImage"),
  async (req, res, next) => {
    try {
      let UserId = req.payload.id;
      let _up = await UserProfile.findOne({ UserId: UserId }).exec();
      if (!_up) {
        return res.status(422).json({
          error: "User Profile Not Found"
        });
      } else {
        _up.ProfileImage = req.file.path;
        await _up.save();
        return await res.status(200).json({
          message: "Profile Updated"
        });
      }
    } catch (error) {
      console.log("dssd" + error);
      return res.status(422).json({
        errors: {
          error: error
        }
      });
    }
  }
);

module.exports = router;
