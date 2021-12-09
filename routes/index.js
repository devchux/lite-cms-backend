const router = require("express").Router();
const VolunteerRoutes = require('./volunteers.route')
const MemberRoutes = require('./members.route');
const ArticleRoutes = require('./articles.route')
const VideosRoutes = require('./videos.route')
const AudiosRoutes = require('./audios.route')

router.use('/volunteers', VolunteerRoutes)
router.use('/members', MemberRoutes)
router.use('/articles', ArticleRoutes)
router.use('/audios', AudiosRoutes)
router.use('/videos', VideosRoutes)

module.exports = router;