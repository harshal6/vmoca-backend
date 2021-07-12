var express = require('express');
var router = express.Router();

// Modules 
var users = require('./users');
var events = require('./eventRegistration');
var donation = require('./donation');
var membership = require('./membership');
const { sendFeedbackEmail } = require('../helpers/email');

router.use('/user', users)
router.use('/events', events);
router.use('/donations', donation);
router.use('/membership', membership);

router.post('/sendEmail', (req, res, next) => {
    console.log(req.body)
    sendFeedbackEmail(req.body.formData, req.body.user)
})

//Test Router
router.use('/test', require('./test'));

module.exports = router;