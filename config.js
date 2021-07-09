module.exports = [
    {
        name: 'API URL',
        value: 'https://api.neoncrm.com/v2'
    },
    {
        name: 'HOST',
        value: 'localhost'
    },
    {
        name: 'PORT',
        value: '3000'
    },
    {
        name: 'PUBLIC KEY FOR PAYMENT',
        value: process.env.PAYMENT_PUBLIC_KEY
    },
    {
        name: 'MERCHAT ID ',
        value: process.env.PAYMENT_MERCHAT_ID
    },
    {
        name: 'PAYMENT APPLICATION ID',
        value: process.env.PAYMENT_APP_ID
    },
    {
        name: 'EMAIL',
        value: process.env.EMAIL
    },
    {
        name: 'EMAIL PASSWORD',
        value: process.env.PASSWORD
    },
    {
        name: 'EMAIL SERVICE',
        value: process.env.EMAIL_SERVICE
    }
]