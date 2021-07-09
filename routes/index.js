var express = require('express');
var router = express.Router();

// Modules 
var users = require('./users');
var events = require('./eventRegistration');
var donation = require('./donation');
var membership = require('./membership');
var reservTickets = require('./tickets');
const { sendFeedbackEmail } = require('../helpers/email');

router.use('/user', users)
router.use('/events', events);
router.use('/donations', donation);
router.use('/membership', membership);
router.use('/reserve', reservTickets);
router.use('/payment', require('../routes/payment'));

router.post('/sendEmail', (req, res, next) => {
    sendFeedbackEmail(req.body);
})

module.exports = router;