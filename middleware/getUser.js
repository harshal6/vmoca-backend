var neonCrm = require('../api/neonApi');
let neon = new neonCrm.Client('virginiamocasandbox', process.env.API);

module.exports = async (req, res, next) => {
    try {
        var fetchedUser = req.body.user;
        console.log(req.body.user)
        var user = await neon.findAccount(fetchedUser.email)
        console.log(user.data)
        if (user.data.pagination.totalResults != 0) {
            req.user = user.data.searchResults[0];
        } else {
            console.log(fetchedUser.address)
            await neon.createAccount(fetchedUser.email, fetchedUser.firstName, fetchedUser.lastName,fetchedUser.phone, fetchedUser.address, fetchedUser.address2, fetchedUser.state, fetchedUser.zipCode, fetchedUser.city );
            var accountDetails = await neon.findAccount(fetchedUser.email);
            req.user = accountDetails.data.searchResults[0];
            console.log(accountDetails)
        }
    } catch (error) {
        console.log(error.response)
        req.user = '';
    }
    next();
}