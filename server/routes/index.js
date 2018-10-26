const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));

router.get('/', (req,res,next)=>{
    return res.send("Welcome")
})

module.exports = router;