const router = require("express").Router();
const VolunteerRoutes = require('./volunteers.route')

router.use('/volunteers', VolunteerRoutes)

module.exports = router;