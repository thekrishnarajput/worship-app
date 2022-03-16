const mongoose = require('mongoose')
const Schema = mongoose.Schema

const packageItemSchema = new mongoose.Schema({
    packItemName: {
        type: String,
        required: true,
        trim: true
    },
    packItemPrice: {
        type: Number,
        required: true,
        min: 1
    },
    packItemQty: {
        type: Number,
        required: true,
        min: 1
    },
    packItemDescription: {
        type: String
    },
    packItemImagePath1: {
        type: String
    },
    packItemImagePath2: {
        type: String
    },
    packItemImagePath3: {
        type: String
    },
    packItemImagePath4: {
        type: String
    },
    packageId: Schema.Types.ObjectId
}
// ,{timestamps: {
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
//   }}
)

module.exports = mongoose.model('packageItems', packageItemSchema)