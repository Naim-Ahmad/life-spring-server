const router = require('express').Router()

const Banner = require('../../models/Banner')

router.post('/banners', async(req, res) => {
    try {
        let banner = new Banner(req.body)
        banner = await banner.save()
        res.send(banner)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;