const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    adminName: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Admins', adminSchema)