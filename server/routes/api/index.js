const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/assets', require('./assets'));
router.use('/assetsOwnership', require('./assetsOwnership'));
router.use('/orders', require('./orders'));
router.use('/assetsLogs', require('./assetsLogs'));

module.exports = router;