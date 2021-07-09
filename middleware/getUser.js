var neonCrm = require('../api/neonApi');
let neon = new neonCrm.Client('virginiamocasandbox', process.env.API);

module.exports = async(req, res, next) => {
    try {
        var fetchedUser = req.body.user;
        var user = await neon.findAccount(fetchedUser.email)
        if (user.data.searchResults.length != 0) {
            req.user = user.data.searchResults[0];
        } else {
            await neon.createAccount(fetchedUser.email, fetchedUser.firstName, fetchedUser.lastName);
            var accountDetails = await neon.findAccount(fetchedUser.email);
            req.user = accountDetails.data.searchResults[0];
        }
    } catch (error) {
        req.user = '';
    }
    next();
}