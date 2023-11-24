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
    details: {
        type: String,
        required: true,
    },
    slog: {
        type: String,
       
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
    },
    availableSlots: {
        type: Array,
    }

})

const Test = mongoose.model('Test', testSchema)

module.exports = Test