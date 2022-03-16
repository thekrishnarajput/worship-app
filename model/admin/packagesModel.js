const mongoose = require('mongoose')
const packagesSchema = new mongoose.Schema({
    packName: {
        type: String,
        required: true,
        trim: true
    },
    packImagePath: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Packages', packagesSchema)