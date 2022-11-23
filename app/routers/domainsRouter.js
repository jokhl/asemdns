const Express = require('express')

// Controllers
const DomainsController = require('../controllers/domainsController')
const RecordsController = require('../controllers/recordsController')

let router = Express.Router()

router.get('/', DomainsController.index)
router.get('/new', DomainsController.new)
router.post('/', DomainsController.create)
router.get('/:name', DomainsController.view)
router.get('/:name/delete', DomainsController.destroy)
router.post('/:name/records', RecordsController.create)
router.get('/:name/records/:hostname/delete', RecordsController.destroy)

module.exports = router