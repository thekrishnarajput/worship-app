const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const adminController = require('../../controller/admin/adminController')
const allPriestController = require('../../controller/admin/allPriestController')


const allPriestRoute= require('../../routes/admin/allPriestRoute')
// const adminCategoryRoute = require('./categoryRoute')
// const adminProductRoute = require('./productRoute')
// const adminPackagesRoute = require('./packagesRoute')

router.post('/signin', body('email', 'Invalid Email').isEmail(),
    body('password').notEmpty(),
    adminController.signIn
)


router.get('/all-priest', allPriestController.allPriest)

router.post('/edit-priest',
body('status').not().isEmpty(),
allPriestController.editPriest
)

// router.post('/admin/category', adminCategoryRoute)
// router.post('/admin/product', adminProductRoute)
// router.post('/admin/packages', adminPackagesRoute)

module.exports = router;