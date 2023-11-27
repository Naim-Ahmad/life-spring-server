const mongoose = require('mongoose')
const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true, 
    },
    date: {
        type: String,   
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
    },
    duration: {
        type: String,
        default: "30 minute"
    },
    availableSlots: {
        type: Array,
        required: true
    },
    reservation: {
        type: [{type: mongoose.Types.ObjectId, ref: "Reservation"}],
        default: []
    }
})

const Test = mongoose.model('Test', testSchema)

module.exports = Test