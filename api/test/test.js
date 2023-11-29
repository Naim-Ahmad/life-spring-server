const express = require('express')

const router = express.Router()

const Test = require('../../models/Test')
const verifyToken = require('../../middlewares/verifyToken')
const verifyAdmin = require('../../middlewares/verifyAdmin')

router.get('/tests', async(req, res) => {
    try {
        const tests = await Test.find()
        res.send(tests)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/tests/:id', verifyToken, async(req, res) => {
    try {
        const tests = await Test.findById(req.params.id)
        res.send(tests)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/tests', async(req, res) => {
    try {
        let test = new Test(req.body)
        test = await test.save()
        res.send(test)
    } catch (error) {
        res.status(500).send(error.message)
        console.log(error);
    }
})

router.put('/tests/:id', verifyToken, verifyAdmin, async(req, res) => {
    try {
        const test = await Test.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send(test)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.delete('/tests/:id', verifyToken, verifyAdmin, async(req, res) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id)
        res.send(test)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;