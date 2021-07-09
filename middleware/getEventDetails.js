let neonCrm = require('../api/neonApi');
let neon = new neonCrm.Client('virginiamocasandbox', process.env.API);


module.exports = async(req, res, next) => {
    try {
        var eventId = req.body.eventId;
        var eventDetails = await neon.getEventDetails(eventId);
        req.eventDetail = eventDetails;
    } catch (error) {
        req.eventDetail = '';
    }
    next()
}