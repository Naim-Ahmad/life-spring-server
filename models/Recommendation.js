const mongoose = require('mongoose')

const recommendationSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    id: {
        type: String,
    },
    content: {
        type: String,
    },
    source: {
        type: String,
    },
    category: {
        type: String,
    },
    date: {
        type: String,
    },
})

const Recommendation = mongoose.model('Recommendation', recommendationSchema)

module.exports = Recommendation;