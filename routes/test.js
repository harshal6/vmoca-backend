var express = require('express');
const { sendTicketEmail } = require('../helpers/email');
const { sendFeedbackEmail } = require('../helpers/email');
var router = express.Router();

router.get('/sendMail', (req, res, next) =>{
    sendFeedbackEmail({"member" : "No", "childrean" : "YES"},{'First Name' : "Jayesh", "Email 1": "jayesh203.jp@gmail.com", "Address Line 1" : "Vapi", "State/Province" : "GJ","Phone" :"12727272727", "City" : "Vapi"})
})

module.exports = router;
