var neonCrm = require('../api/neonApi');
let neon = new neonCrm.Client('virginiamocasandbox', process.env.API)

module.exports = async (req, res, next) => {
    try {
        var memberShipLevels = await neon.membershipLevels();
        var membershipTerms = await neon.membershipTerms();
        allMembershipLevels = memberShipLevels.data.membershipLevels;
        allMembershipTerms = membershipTerms.data.membershipTerms;
        var memberShipLevel = allMembershipLevels.filter(element =>
            element.description == req.body.memberTitle
        );
        var memberShipTerm = allMembershipTerms.filter(element =>
            element.id == memberShipLevel[0].id
        );
        var membershipData = {level : memberShipLevel[0],term : memberShipTerm[0]};
        req.memberShip = membershipData
    } catch (error) {
        console.log(error.response.data)
        req.memberShip = ''
    }
    next();
}