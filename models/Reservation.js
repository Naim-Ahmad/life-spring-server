const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    test: {
        type: mongoose.Types.ObjectId,
        ref: 'Test'
    },
    slot: {
        type: String,
        required: true
    },
    paymentAmount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    resultURL: {
        type: String,
        
    },
    
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation;