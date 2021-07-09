const axios = require("axios");
const moment = require("moment");

// Neon CRM
const neonCrmBaseUrl = 'https://api.neoncrm.com/v2';

//Neon Pay
// const neonPayBaseUrl = 'https://sandbox.neononepay.com/api';
// const paymentMerchantId = process.env.PAYMENT_MERCHAT_ID;
// const paymentAppId = process.env.PAYMENT_APP_ID;
// const paymentPublicKey = process.env.PAYMENT_PUBLIC_KEY;

class Client {
    constructor(username, apiKey) {
        this.config = {
            headers: {
                "NEON-API-VERSION": "2.1",
            },
            auth: {
                username: username,
                password: apiKey,
            },
        };

        this.username = username;
        this.apiKey = apiKey;
    }

    async findAccountUsingId(userId) {
        console.log(userId)
        return new Promise((resolve, reject) => {
            axios.post(`${neonCrmBaseUrl}/accounts/search/`, {
                    outputFields: ["Account ID", "Email 1", "First Name", "Last Name"],
                    pagination: {
                        pageSize: 1,
                    },
                    searchFields: [{
                        field: "Account ID",
                        operator: "EQUAL",
                        value: userId,
                    }, ],
                },
                this.config
            ).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    async findAccount(email) {
        return new Promise((resolve, reject) => {
            axios.post(
                    `${neonCrmBaseUrl}/accounts/search/`, {
                        outputFields: ["Account ID", "Email 1", "First Name", "Last Name"],
                        pagination: {
                            pageSize: 1,
                        },
                        searchFields: [{
                            field: "Email",
                            operator: "EQUAL",
                            value: email,
                        }, ],
                    },
                    this.config
                )
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err);
                });
        })
    }

    async createAccount(email, firstName, lastName, phone, source = '') {
        return new Promise((resolve, reject) => {
            axios.post(`${neonCrmBaseUrl}/accounts`, {
                    individualAccount: {
                        origin: {
                            originDetail: source,
                        },
                        primaryContact: {
                            email1: email,
                            firstName,
                            lastName,
                            addresses: [{
                                isPrimaryAddress: true,
                                phone1: phone,
                            }, ],
                        },
                    },
                }, this.config)
                .then((result) => {
                    resolve(result.data);
                }).catch((err) => {
                    reject(err);
                });
        })
    }

    async getEventDetails(eventId) {
        return new Promise((resolve, reject) => {
            axios.get(`${neonCrmBaseUrl}/events/${eventId}`, this.config)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err);
                });
        })
    }

    async eventRegistrations(data) {
        return new Promise((resolve, reject) => {
            axios.post(`${neonCrmBaseUrl}/eventRegistrations`, data, this.config)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    async saveDonation(donationData) {
        return new Promise((resolve, reject) => {
            axios.post(`${neonCrmBaseUrl}/donations`, donationData, this.config)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    //Donation will be done afterwards 
    async donate(data) {
        return new Promise((resolve, reject) => {
            axios.post(`${neonPayBaseUrl}/charges`, data
                // Header will go here
            ).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err);
            });
        })
    }

    async memberShipTerms() {
        return new Promise((resolve, reject) => {
            axios.get(`${neonCrmBaseUrl}/memberships/terms`, this.config).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    async memberShipRegistration(data) {
        return new Promise((resolve, reject) => {
            axios.post(`${neonCrmBaseUrl}/memberships`, data, this.config)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }
}

exports.Client = Client;