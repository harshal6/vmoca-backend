var neonCrm = require('../api/neonApi');
let neon = new neonCrm.Client(process.env.USERNAME, process.env.API);

module.exports = async (req, res, next) => {
    try {
        var AccountId = req.body.access_token;
        var user = await neon.findAccountUsingId(AccountId)
        console.log(user)
        req.user = user.data.searchResults[0]
    } catch (error) {
        req.user = ''
    }
    next();
}