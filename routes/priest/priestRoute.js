const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const priestController = require('../../controller/priest/priestController')

const multer = require('multer')

let storage = multer.diskStorage({
    destination: 'public/priest/media',
    filename: (request, file, callback)=> {
        callback(null, "Profile" + Date.now() + "_" + file.originalname)
    }
})

let upload = multer({storage: storage})

router.post('/signup',upload.single('profilePic'), body('priestName').isAlphanumeric(), body('email').isEmail(),
body('password', 'Password should be at least 4 character').isLength(4),
body('mobile', 'Mobile phone number should be 10 digits').isLength(10),
body('gender').isAlphanumeric(), priestController.signup
)

router.get('/signin', body('email', 'Invalid email').isEmail(),
    body('password', 'Password should be at least 4 character').not().isEmpty(),
    priestController.signin
)

router.post('/profile', body('oldPassword').not().isEmpty(), body('newPassword').not().isEmpty(),
priestController.profile
)

module.exports = router