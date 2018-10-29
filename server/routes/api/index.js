const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/assets', require('./assets'));
router.use('/assetsOwnership', require('./assetOwnership'));
router.use('/orders', require('./orders'));
router.use('/assetsLogs', require('./assetLogs'));

module.exports = router;