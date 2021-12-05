const router = require("express").Router();
const VolunteerRoutes = require('./volunteers.route')
const MemberRoutes = require('./members.route');
const ArticleRoutes = require('./articles.route')

router.use('/volunteers', VolunteerRoutes)
router.use('/members', MemberRoutes)
router.use('/articles', ArticleRoutes)

module.exports = router;