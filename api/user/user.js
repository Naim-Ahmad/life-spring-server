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

router.get('/users/:email', async(req, res) => {
    try {
        const query = {email: req.params.email}
        const users = await User.findOne(query)
        res.send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/users', async(req, res) => {
    try {
        console.log(req.body);
        let user = new User(req.body)
        user = await user.save()
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
        console.log(error);
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

router.patch('/users/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const result = await User.findByIdAndUpdate(id, req.body, {upsert: true})
        res.send(result)
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