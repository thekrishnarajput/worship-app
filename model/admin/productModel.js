const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
    proName: {
        type: String,
        required: true,
        trim: true
    },
    proPrice: {
        type: Number,
        required: true,
        min: 1
    },
    proQty: {
        type: Number,
        required: true,
        min: 1
    },
    proDescription: {
        type: String
    },
    proImagePath1: {
        type: String
    },
    proImagePath2: {
        type: String
    },
    proImagePath3: {
        type: String
    },
    proImagePath4: {
        type: String
    },
    catId: Schema.Types.ObjectId
}
// ,{timestamps: {
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
//   }}
)

module.exports = mongoose.model('Products', productSchema)