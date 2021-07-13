var express = require('express');
var router = express.Router();
var moment = require('moment');

//Middlewares
var getUser = require('../middleware/getUser');
const getMembershipLevels = require('../middleware/getMembershipLevels');

//Neon CRM
var neonCrm = require('../api/neonApi');
let neon = new neonCrm.Client('virginiamocasandbox', process.env.API);

router.post('/register', getUser, getMembershipLevels, (req, res, next) => {

    console.log(req.memberShip)
    if (req.memberShip == '') {
        res.status(404).json({ message: "No Membership FOund" });
    } else {
        if (req.user == '') {
            res.status(404).json({ message: 'User Not Found' });
        } else {
            var startDate = moment().toISOString();
            var endDate = moment().add(1, 'years').toISOString();
            var renew, freq;
            if (req.body.freq == 'Annually') {
                var termEndDate = moment().add(1, 'years').toISOString()
                renew = true;
                freq = 'YEAR'
            } else {
                freq = 'MONTH'
                renew = true;
                termEndDate = moment().add(1, 'years').toISOString();
            }
            var userData = req.user;
            var memberShipData = req.memberShip;
            var memberShipFee = memberShipData.term.fee;
            var fee;
            if(req.body.coverCC){
                var percentage = req.body.coveredFeesPercent;
                if(freq == 'MONTH'){
                    var monthlyFee = memberShipFee/10;
                    var percentageFee = monthlyFee * (percentage/100);
                    fee  = monthlyFee+percentageFee;
                }else{
                    var percentageFee = memberShipFee * (percentage/100)
                    fee = memberShipFee + percentageFee
                }
            }else{
                if(freq == 'MONTH'){
                    var monthlyFee = memberShipFee/10;
                    fee  = monthlyFee;
                }else{
                    fee = memberShipFee
                }
            }
            var payMentDetail = req.body.user;
            var data = {
                "accountId": userData['Account ID'],
                "membershipTerm": memberShipData.term,
                "membershipLevel": memberShipData.level,
                "termDuration": memberShipData.term.duration,
                "enrollType": memberShipData.term.type,
                "termUnit": freq,
                "termStartDate": startDate,
                "termEndDate": termEndDate,
                "transactionDate": startDate,
                "fee": fee.toFixed(2),
                "sendAcknowledgeEmail": true,
                "timestamps": {
                    "createdBy": userData['Account ID'],
                },
                "payments": [{
                    "amount": fee.toFixed(2),
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
            console.log(req.body.coveredFeesPercent)
            neon.memberShipRegistration(data).then((result) => {
                res.status(200).json(result.data)
            }).catch((err) => {
                console.log(err.response)
                res.json(err.response)
            });
        }
    }
})

module.exports = router;