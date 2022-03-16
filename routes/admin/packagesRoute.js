const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const packagesController = require('../../controller/admin/packagesController')

const multer = require('multer')

let storage = multer.diskStorage({
    destination: 'public/packages/media',
    filename: (request, file, callback)=> {
        callback(null, "pack_" + Date.now() + "_" + file.originalname)
    }
})

let upload = multer({storage: storage})

router.post('/add-packages', upload.single('packImagePath'),
    body('packName').not().isEmpty(),
    packagesController.addPackages
)

router.get('/all-packages', packagesController.allPackages)

router.post('/edit-packages', upload.single('packImagePath'),
    body('packId').not().isEmpty(),
    body('packName').not().isEmpty(),
    packagesController.editPackages
)

router.get('/discard-packages/:packId', packagesController.discardPackages)

module.exports = router