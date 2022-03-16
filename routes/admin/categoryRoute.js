const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const categoryController = require('../../controller/admin/categoryController')

const multer = require('multer')

let storage = multer.diskStorage({
    destination: 'public/category/media',
    filename: (request, file, callback)=> {
        callback(null, "Cat_" + Date.now() + "_" + file.originalname)
    }
})

let upload = multer({storage: storage})

router.post('/add-category', upload.single('catImagePath'),
    body('catName').not().isEmpty(),
    categoryController.addCategory
)

router.get('/all-categories', categoryController.allCategories)

router.post('/edit-category', upload.single('catImagePath'),
    body('catId').not().isEmpty(),
    body('catName').not().isEmpty(),
    categoryController.editCategory
)

router.get('/discard-category/:catId', categoryController.discardCategory)

module.exports = router