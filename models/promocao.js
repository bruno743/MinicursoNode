const mongoose = require('mongoose')
const Schema = mongoose.Schema

const promoSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    tags: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Promo = mongoose.model('Promo', promoSchema)
module.exports = Promo