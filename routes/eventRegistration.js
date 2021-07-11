var express = require('express');
const getEventDetails = require('../middleware/getEventDetails');
var router = express.Router();
var neonCrm = require('../api/neonApi');
const getUser = require('../middleware/getUser');

let neon = new neonCrm.Client('virginiamocasandbox', process.env.API)

const nodemailer = require('nodemailer');
const { sendTicketEmail } = require('../helpers/email');

let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD // generated ethereal password
    }
})

router.post('/register', getUser, getEventDetails, (req, res, next) => {
    console.log(req.body)
    console.log(req.user)
    var eventDetail = req.eventDetail.data;
    console.log(req.user)
    if (eventDetail == '') {
        res.status(404).json({ message: "No Event Found" })
    } else {
        var results = req.user;
        var user = results;
        var todaysDate = new Date();
        var date = new Date();
        var registrationDate = date.getFullYear() + '-' + parseInt(date.getMonth() + 1) + '-' + date.getDate() + 'T' + '00:00:00Z';
        var payment;
        var registrationAmount;
        console.log(req.body.attendees)
        if (req.body.eventId == '9695') {
            ticketId = null;
            tickets = [{ attendees: req.body.attendees }]
            payment = null;
            registrationAmount = 0;
        } else {
            registrationAmount = req.body.amount;
            ticketId = 3501;
            payment = [{
                "amount": registrationAmount,
                "id": "1234",
                "creditCardOnline": {
                    "billingAddress": {
                        "addressLine1": req.body.addressLine1,
                        "addressLine2": req.body.addressLine1,
                        "city": req.body.city,
                        "stateProvinceCode": req.body.stateProvinceCode,
                        "territory": "",
                        "zipCode": req.body.zipCode,
                        "zipCodeSuffix": ""
                    },
                    "cardHolderEmail": user['Email 1'],
                    "token": req.body.token,
                    "id": '1235'
                },
                "note": "string",
                "receivedDate": todaysDate.toISOString(),
                "tenderType": 4
            }]
            var attendees = req.body.attendees;
            var tickets = [];
            attendees.forEach(element => {
                var attendees = [];
                attendees.push(element)
                tickets.push({ attendees, ticketId })
            });
        }
        var data = {
            "registrantAccountId": user['Account ID'],
            "eventId": eventDetail.id,
            "payments": payment,
            "registrationAmount": registrationAmount,
            "registrationDateTime": registrationDate,
            "sendSystemEmail": true,
            "tickets": tickets,
        }
        console.log(data)
        neon.eventRegistrations(data)
            .then((result) => {
                if (result.status == 200) {
                    sendTicketEmail(user, eventDetail, req.body.attendees.length, req.body.date);
                    res.status(200).json({ result: result.data });
                }
            }).catch((err) => {
                console.log(err.response)
                res.status(401).json({ err: err.response });
            });
    }
})

router.post('/makePayment', (req, res, next) => {
    neon.makePayment().then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err.response.data.errors.header)
        res.json(err);
    })
})


module.exports = router;
