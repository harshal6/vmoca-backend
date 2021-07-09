var express = require('express');
var router = express.Router();

//Middlewares
var getUser = require('../middleware/getUser');
const getMembershipTerm = require('../middleware/getMembershipTerm');

//Neon CRM
var neonCrm = require('../api/neonApi');
let neon = new neonCrm.Client('virginiamocasandbox', process.env.API);

router.post('/register', getUser, getMembershipTerm, (req, res, next) => {
    console.log(req.body);
    if (req.memberShipLevel == '') {
        res.status(404).json({ message: "No Membership FOund" });
    } else {
        if (req.user == '') {
            res.status(404).json({ message: 'User Not Found' });
        } else {
            var todaysDate = new Date();
            var startDate = todaysDate.toISOString();
            todaysDate.setFullYear(todaysDate.getFullYear() + 1);
            var endDate = todaysDate.toISOString();
            var userData = req.user;
            var memberShipData = req.memberShipLevel;
            var payMentDetail = req.body.user;
            var data = {
                "accountId": userData['Account ID'],
                "membershipTerm": {
                    "id": memberShipData.id
                },
                "membershipLevel": memberShipData.membershipLevel,
                "termDuration": memberShipData.duration,
                "enrollType": memberShipData.type,
                "termUnit": memberShipData.unit,
                "termStartDate": startDate,
                "termEndDate": endDate,
                "transactionDate": startDate,
                "fee": memberShipData.fee,
                "sendAcknowledgeEmail": true,
                "timestamps": {
                    "createdBy": userData['Account ID'],
                },
                "payments": [{
                    "amount": memberShipData.fee,
                    "creditCardOnline": {
                        "billingAddress": {
                            "addressLine1": payMentDetail.address,
                            "addressLine2": payMentDetail.address2,
                            "addressLine3": "",
                            "addressLine4": "",
                            "city": payMentDetail.city,
                            "stateProvinceCode": payMentDetail.state,
                            "zipCode": payMentDetail.zip,
                        },
                        "cardHolderEmail": payMentDetail.email,
                        "token": req.body.token // For credit card online payment
                    },
                    "tenderType": 4
                }]
            }
            console.log(data, 'DATA')
            neon.memberShipRegistration(data).then((result) => {
                res.status(200).json(result.data)
            }).catch((err) => {
                console.log(err.response)
            });
        }
    }
})

module.exports = router;