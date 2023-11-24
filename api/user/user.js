const express = require('express')

const router = express.Router()

const User = require('../../models/User')
const verifyToken = require('../../middlewares/verifyToken')

router.get('/users', async(req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/users', async(req, res) => {
    try {
        let user = new User(req.body)
        user = await user.save()
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.put('/users/:id', verifyToken, async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body ,{new: true})
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.delete('/users/:id', verifyToken, async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router;