const router = require('express').Router()

const PassController = require('../controllers/passController')
const { authorize } = require('../middlewares/auth')

router.post('/', PassController.create)
router.get('/', PassController.showPassword)
router.delete('/:id', authorize, PassController.delete)

module.exports = router