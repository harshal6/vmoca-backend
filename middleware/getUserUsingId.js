var neonCrm = require('../api/neonApi');
let neon = new neonCrm.Client('virginiamocasandbox', process.env.API);

module.exports = async(req, res, next) => {
    try {
        var AccountId = req.body.access_token;
        const user = await findAccountUsingId(AccountId);
        req.user = user[0];
    } catch (error) {
        req.user = ''
    }
    next();
}