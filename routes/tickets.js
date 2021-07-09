var express = require('express');
var router = express.Router();

var neonCrm = require('../api/neonApi');
let neon = new neonCrm.Client('virginiamocasandbox', process.env.API)

router.post('/tickets', (req, res, next) => {

})


module.exports = router;