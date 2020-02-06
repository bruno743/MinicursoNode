const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comboSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    moveis: {
        type: String,
        required: true
    },
    discount: {
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

const Combo = mongoose.model('Combo', comboSchema)
module.exports = Combo