const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const allPriestController = require('../../controller/admin/allPriestController')

router.get('/all-priest', allPriestController.allPriest)


router.post('/edit-priest',
body('status').not().isEmpty(),
allPriestController.editPriest
)

module.exports = router