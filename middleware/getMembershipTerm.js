var neonCrm = require('../api/neonApi');
let neon = new neonCrm.Client('virginiamocasandbox', process.env.API)

module.exports = async(req, res, next) => {
    try {
        var memberShips = await neon.memberShipTerms();
        allMemberships = memberShips.data.membershipTerms;
        var memberShip = allMemberships.filter(element =>
            element.membershipLevel.name == req.body.memberTitle
        );
        req.memberShipLevel = memberShip[0];
    } catch (error) {
        req.memberShipLevel = ''
    }
    next();
}