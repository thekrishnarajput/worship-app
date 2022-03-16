const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRound = 10
const priestSchema = new mongoose.Schema({
    priestName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        min: 10
    },
    gender: {
        type: String,
    },
    profilePic: {
        type: String,
        trim: true
    },
    pujanName: {
        type: String,
        trim: false
    },
    pujanMedia: {
        type: String,
        trim: false
    },
    status: {
        type: Boolean,
        default: false
    }
})


priestSchema.pre('save', function (next) {
    var priest = this; 
    // only hash the password if it has been modified (or is new)
    if (!priest.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(saltRound, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(priest.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            priest.password = hash;
            next();
        })
    })
})

priestSchema.methods.comparePassword = function (hash, callback) {
    bcrypt.compare(hash, this.password, function (err, isMatch) {
        if (err) return callback(err)
        callback(null, isMatch)
    })
}

module.exports = mongoose.model('Priests', priestSchema)