const router = require('express').Router()

const Banner = require('../../models/Banner')

router.get('/banners', async(req, res) => {
    try {
        const queryParams = req.query
        let query = {}
        if(queryParams.isActive){
            // console.log('isActive', queryParams, query);
           const banner = await Banner.findOne(queryParams)
           return res.send(banner)
        }
        const banners = await Banner.find(query)
        res.send(banners)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/banners', async(req, res) => {
    try {
        let banner = new Banner(req.body)
        banner = await banner.save()
        res.send(banner)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/banners/:id', async(req, res) => {
    try {
        await Banner.findOneAndUpdate({isActive: true}, {isActive: false})
        let banner = await Banner.findByIdAndUpdate(req.params.id, {isActive: true})
        res.send(banner)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.delete('/banners/:id', async(req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id)
        res.send(banner)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;