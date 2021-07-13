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
        return new Promise((resolve, reject) => {
            axios.post(`${neonCrmBaseUrl}/accounts/search/`, {
                outputFields: ["Account ID", "Email 1", "First Name", "Last Name", "Address Line 1", "Address Line 2", "State/Province", "City", "Zip Code", "Country"],
                pagination: {
                    pageSize: 1,
                },
                searchFields: [{
                    field: "Account ID",
                    operator: "EQUAL",
                    value: userId,
                },],
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
                outputFields: ["Account ID", "Email 1", "First Name", "Last Name","Phone 1 Number", "Address Line 1", "Address Line 2", "State/Province", "City", "Zip Code", "Country"],
                pagination: {
                    pageSize: 1,
                },
                searchFields: [{
                    field: "Email",
                    operator: "EQUAL",
                    value: email,
                },],
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

    async createAccount(email, firstName, lastName, phone, address1, address2, state, zip, city) {
        return new Promise((resolve, reject) => {
            var data = {
                individualAccount: {
                    origin: {
                        originDetail: '',
                    },
                    primaryContact: {
                        email1: email,
                        firstName,
                        lastName,
                        addresses: [{
                            isPrimaryAddress: true,
                            phone1: phone,
                            addressLine1: address1,
                            addressLine2: address2,
                            zipCode: zip,
                            city : city,
                            // stateProvince: state
                        },],
                    },
                },
            };
            console.log(data)
            axios.post(`${neonCrmBaseUrl}/accounts`,data , this.config)
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

    async recurringDonation(data) {
        return new Promise((resolve, reject) => {
            axios.post(`${neonCrmBaseUrl}/recurring`, data, this.config)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    async membershipLevels() {
        return new Promise((resolve, reject) => {
            axios.get(`${neonCrmBaseUrl}/memberships/levels`, this.config).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    async membershipTerms() {
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