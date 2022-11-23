const Express = require('express')

// Controllers
const UsersController = require('../controllers/usersController')

let router = Express.Router()

router.get('/', UsersController.index)
router.get('/new', UsersController.new)
router.post('/', UsersController.create)
router.get('/delete/:username', UsersController.destroy)

module.exports = router