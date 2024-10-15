const Router = require('express')
const router = new Router()
const productTypeController = require('../controllers/productTypeController')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', productTypeController.createProductType)

//Method GET to get brands
router.get('/', productTypeController.getProductType)

router.put('/:id', checkRole("ADMIN"), productTypeController.updateType)

router.delete('/:id', productTypeController.deleteProductType)

module.exports = router