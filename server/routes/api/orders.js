const mongoose = require("mongoose");
const router = require("express").Router();
const auth = require("../auth");
const isValidUser = require('../../config/validations/userValidation');
const OrderHistory = require('../../models/orderhistory');
const AssetOwnership = require('../../models/assetownership');
const AssetLogs = require('../../models/assetlogs');


// To get order history of an user
router.get(
    "/getOrderHistory",
    auth.required,
    isValidUser,
    async (req, res, next) => {
      try {
        OrderHistory.find({"UserID":req.payload.id}, function(err, orders) {
          res.json({ "Orders": orders });
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

  // To save order details
  router.post("/setOrder",
  auth.required,
  isValidUser,
  async(req,res,next)=>{
      try {
          let OrderId = req.body.OrderId;
          if(OrderId){
            req.body.UserID = req.payload.id;
            req.body.UpdatedBy = req.payload.id;
            req.body.UpdatedOn = new Date();
            
            await OrderHistory.findOneAndUpdate(
                OrderId,
                { $set: req.body },
                { new: true }
              ).exec(async (err, result) => {
                await console.log("RESULT: " + result);
                //Set order ownership if order status changed to Completed
                if(req.body.Status === 'Completed'){
                    //Get asset
                    let asset = AssetOwnership.findOne({"AssetID": req.body.AssetID});
                    if(asset){
                        //Set asset current owner to previous owner
                        asset.CurrentOwner = asset.PreviousOwner;
                        
                        //Set asset current Owner
                        asset.CurrentOwner = req.payload.id;

                        await AssetOwnership.findOneAndUpdate(
                            req.body.AssetID,
                            {$set: asset},
                            {new:false}
                            ).exec(async(e,r)=>{
                                await console.log("RESULT: " + r);
                                //return await res.json({ r });
                            });
                    }
                }

                return await res.json({ result });
              });
          }
          else{            
            req.body.UserID = req.payload.id;
            req.body.CreatedBy = req.payload.id;
            let orderHistory = new OrderHistory(req.body);
            return await OrderHistory.save().then(result => res.json({ result }));
          }
          
      } catch (error) {
          return res.status(200).json({
              errors:{
                  error:error                  
              }
          });
      }
  });


module.exports = router;


