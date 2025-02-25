const Router = require('express')
const router = new Router()
const productBrandController = require('../controllers/productBrandController')
const checkRole = require('../middleware/checkRoleMiddleware')


//Method POST to create
router.post('/', productBrandController.createProductBrand)

//Method GET to get brands
router.get('/', productBrandController.getProductBrand)
router.delete('/:id', checkRole('ADMIN'), productBrandController.deleteProductBrand)
router.put('/:id', checkRole("ADMIN"), productBrandController.updateBrand)


module.exports = router