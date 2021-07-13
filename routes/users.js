const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();

// Neon Instance
let neonCrm = require('../api/neonApi');

neon = new neonCrm.Client('virginiamocasandbox', process.env.API)

router.post('/signup', (req, res, next) => {
    neon.findAccount(req.body.email).then((result) => {
        if (result.data.searchResults.length == 0) {
            var name = req.body.name;
            var firstName = name.split(' ')[0];
            var lastName = name.split(' ')[1];
            neon.createAccount(req.body.email, firstName, lastName, req.body.phone)
                .then((result) => {
                    res.status(200).json({ result: result.data })
                }).catch((err) => {
                    res.status(401).json({ err })
                });
        } else {
            res.status(409).json({ message: "Account Already Exists", user: result.data.searchResults });
        }
    }).catch((err) => {
        res.status(400).json(err)
    });
})

router.post('/getUserByAccountId', async(req, res, next) => {
        console.log(req.body)
        if(req.body.authorization_code !== 'undefined'){
            var data = {
                client_id: 'kkFM5CO3MEs5Ra_Pp6Bb6EGlTR9krkrRHpw8NQC7ddPoVgcIFQNbAHqA5SyCMk72rYJUUFB2jsqFN5rcsxRoFYMOh1JMr8YFdV2cWQ7enzs=',
                client_secret: 'a1eaecfa-0f12-38b0-a5b9-5d605cccd5c5',
                code: req.body.authorization_code.trim(),
            }
            var url = `https://www.z2systems.com/np/oauth/token?client_id=${data.client_id}&client_secret=${data.client_secret}&redirect_uri=http://127.0.0.1:8000/payment&code=${data.code}&grant_type=authorization_code`;
            let response = await axios.post(url, {}, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            neon.findAccountUsingId(response.data.access_token).then(result => {
                res.json({ user: result.data.searchResults[0] })
            }).catch(err => {
                res.json(err)
            })
        }
})

module.exports = router;