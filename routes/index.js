const router = require("express").Router();
const VolunteerRoutes = require('./volunteers.route')
const MemberRoutes = require('./members.route');

router.use('/volunteers', VolunteerRoutes)
router.use('/members', MemberRoutes)

module.exports = router;