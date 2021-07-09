const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();

router.post('/pay', (req, res, next) => {
    console.log(req.body)
    axios.post('https://sandbox.neononepay.com/api/charges', req.body, { headers: { 'X-API-Key': 'cafa6939bdfba34dc450ecd7dce69740', 'X-APP-ID': req.body.application_id } })
        .then((result) => {
            console.log(result, 'RESSSS')
        }).catch((err) => {
            console.log(err.response.data.errors, 'ERR')
        });
})

module.exports = router;