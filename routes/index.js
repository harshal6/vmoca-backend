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
    .then(result =>{
        res.status(200).json({message : "Successfully Sent Email"})
    }).catch(err =>{
        console.log(err)
        res.status(500).json({message : "Somethign went wrong"});
    });
})

//Test Router
router.use('/test', require('./test'));

module.exports = router;