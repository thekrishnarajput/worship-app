const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const packageItemController = require('../../controller/admin/packageItemController')

const multer = require('multer')

let storage = multer.diskStorage({
    destination: 'public/packageItem/media',
    filename: (request, file, callback)=> {
        callback(null, "packItem_" + Date.now() + "_" + file.originalname)
    }
})
let upload = multer({storage: storage})

router.post('/add-packageitem', upload.array('packItemImagePath'),
    body('packItemName').not().isEmpty(),
    body('packItemPrice').not().isEmpty(),
    body('packItemDescription').not().isEmpty(),
    packageItemController.addPackageItem
)

router.get('/all-packageitem', packageItemController.allPackageItems)

router.post('/edit-packageitem', upload.array('packItemImagePath'),
body('packItemName').not().isEmpty(),
body('packItemPrice').not().isEmpty(),
body('packItemDescription').not().isEmpty(),
packageItemController.editPackageItem
)

router.get('/discard-packageitem/:packItemId', packageItemController.discardPackageItem)

module.exports = router