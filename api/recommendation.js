const router = require('express').Router()

const Recommendation = require('../models/Recommendation')


router.get('/recommendations', async(req, res) => {
    try {
        const recommendations = await Recommendation.find()
        res.send(recommendations)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;