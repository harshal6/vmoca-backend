var express = require('express');
var router = express.Router();
var moment = require('moment');


var neonCrm = require('../api/neonApi');
const getUser = require('../middleware/getUser');
let neon = new neonCrm.Client('virginiamocasandbox', process.env.API);

router.post('/donate', getUser, (req, res, next) => {
    console.log(req.body)
    var user = req.user;
    req.body.accountId = user['Account ID'];
    var date = new Date();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    var today = yyyy + '-' + mm + '-' + dd;
    var nextDate;
    var type;
    var period ;
    if (req.body.type == 'Monthly') {
        type = 'MONTH';
        period = 1;
        nextDate = moment().add(1, 'months').toISOString().split('T')[0]
    } else if (req.body.type == 'One-time') {
        period = 1
        yyyy = parseInt(yyyy) + 1;
        nextDate = moment().add(1, 'years').toISOString().split('T')[0]
        type = 'YEAR';
    } else if (req.body.type == 'Weekly') {
        period = 1;
        type = 'WEEK';
        nextDate = moment().add(1, 'weeks').toISOString().split('T')[0];
    } else if(req.body.type == 'Bi-weekly'){
        period = 2
        type = 'WEEK';
        nextDate = moment().add(2, 'weeks').toISOString().split('T')[0];
    }else if (req.body.type == '2-months'){
        period = 2
        type = 'MONTH';
        nextDate = moment().add(2, 'months').toISOString().split('T')[0];
    }else if(req.body.type == 'Quarterly'){
        period = 3
        type = 'MONTH';
        nextDate = moment().add(3, 'months').toISOString().split('T')[0];
    }else if(req.body.type == '6-months'){
        period = 6
        type = 'MONTH';
        nextDate = moment().add(6, 'months').toISOString().split('T')[0];
    }else if(req.body.type == 'Annually'){
        period = 1
        type = 'YEAR';
        nextDate = moment().add(1, 'years').toISOString().split('T')[0];
    }
    console.log('enters if');
    console.log(req.body.recurringDonation);
    if (req.body.recurringDonation === "on") {
      const donorCoveredFee = Number(req.body.amount * (Number(req.body.coveredFeesPercent)/100)).toFixed(2);
      console.log(donorCoveredFee);
      const totalAmount = Number(req.body.amount) + Number(donorCoveredFee);
      console.log(totalAmount);
        var data = {
            donorCoveredFee,
            "accountId": user['Account ID'],
            "amount": totalAmount,
            "endDate": moment().add(1, 'years').toISOString().split('T')[0],
            "nextDate": nextDate,
            "payment": {
                "amount":req.body.amount,
                "creditCardOnline": {
                    "billingAddress": {
                        "addressLine1": user['Address Line 1'],
                        "addressLine2": user['Address Line 2'],
                        "city": user.City,
                        // "stateProvinceCode": user['State/Province'],
                        "zipCode": '94027',
                    },
                    "cardHolderEmail": user['Email 1'],
                    "token": req.body.token
                },
                "tenderType": 4
            },
            "recurringPeriod": period,
            "recurringPeriodType": type,
            "timestamps": {
                "createdBy": user['Account ID'],
            }
        }
        neon.recurringDonation(data).then((result) => {
            console.log(result)
          const configData = JSON.parse(result.config.data);
          const data={
            paymentResponse: result.data,
            configData: {amount:configData.amount,
            recurringPeriod: configData.recurringPeriod,
            recurringPeriodType: configData.recurringPeriodType,
            },
            status:result.status
          };
            res.json(data);
        }).catch((err) => {
            console.log(err.response)
            res.status(401).json(err);
        });

    } else {
        var data = {
            "accountId": user['Account ID'],
            "donorName": user['First Name'] + ' ' + user['Last Name'],
            "amount": req.body.amount,
            "date": today,
            "acknowledgee": {
                "accountId": user['Account ID'],
                "address": {
                    "addressLine1": req.body.address,
                    "addressLine2": req.body.address2,
                    "city": req.body.city,
                    "isPrimaryAddress": true,
                    "phone1": req.body.phone,
                    "phone1Type": "Home",
                    "state": {
                        "code": req.body.state
                    },
                    "startDate": mm + '/' + dd + '/' + yyyy,
                    "endDate": mm + '/' + dd + '/' + parseInt(yyyy + 1),
                    "zipCode": req.body.zip,
                },
                "email": user['Email 1'],
                "name": user['First Name'] + ' ' + user['Last Name'],
            },
            "anonymousType": "No",
            "sendAcknowledgeEmail": true,
            "timestamps": {
                "createdBy": user['First Name'] + ' ' + user['Last Name'],
            },
            "payments": [{
                "amount": req.body.amount,
                "creditCardOnline": {
                    "billingAddress": {
                        "addressLine1": req.body.address,
                        "addressLine2": req.body.address2,
                        "city": req.body.city,
                        // "stateProvinceCode": req.body.state,
                        "zipCode": req.body.zipCode,
                    },
                    "cardHolderEmail": user['Email 1'],
                    "token": req.body.token
                },
                "tenderType": 4
            }]
        }
        neon.saveDonation(data).then((result) => {
            res.json(result.data);
        }).catch((err) => {
            res.status(401).json(err);
        });
    }

})

module.exports = router;
