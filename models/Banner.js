const mongoose = require('mongoose')
const bannerSchema = new mongoose.Schema({
    bannerTitle: {
        type: String,
    },
    bannerDescription: {
        type: String,
    },
    bannerURL: {
        type: String,
    },
    promoCode: {
        type: String,
    },
    isActive: {
        type: Boolean,
        enum: [true, false],
        default: false
    }
})

const Banner = mongoose.model('Banner', bannerSchema)

module.exports = Banner;