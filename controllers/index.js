var express = require('express');
var router = express.Router();

router.use('/api/bucketlist', require('./bucketlist'));


module.exports = router;