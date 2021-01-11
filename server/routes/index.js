const router = require('express').Router()

const { authenticate } = require('../middlewares/auth')
const authRouter = require('./auth')
const passRouter = require('./password')

router.use('/', authRouter)
router.use(authenticate)
router.use('/passwords', passRouter)

module.exports = router