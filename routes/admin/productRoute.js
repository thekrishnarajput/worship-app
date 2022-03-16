const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const productController = require('../../controller/admin/productController')

const multer = require('multer')

let storage = multer.diskStorage({
    destination: 'public/product/media',
    filename: (request, file, callback)=> {
        callback(null, "Prod_" + Date.now() + "_" + file.originalname)
    }
})
let upload = multer({storage: storage})

router.post('/add-product', upload.array('proImagePath'),
    body('proName').not().isEmpty(),
    body('proPrice').not().isEmpty(),
    body('proDescription').not().isEmpty(),
    productController.addProduct
)

router.get('/all-products', productController.allProducts)

router.post('/edit-product', upload.array('proImagePath'),
body('proName').not().isEmpty(),
body('proPrice').not().isEmpty(),
body('proDescription').not().isEmpty(),
productController.editProduct
)

router.get('/discard-product/:proId', productController.discardProduct)

module.exports = router