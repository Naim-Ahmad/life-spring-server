const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router()
const User = require('../../models/User')

router.post('/createToken', async(req, res) => {
    try {
        const query = {email: req.body?.email}
        const user = await User.findOne(query)
        
        if((user && user?.email) !== req.body?.email){
            return res.status(401).send({message: 'unauthorized access'})
        }

       const token = jwt.sign(req.body, process.env.JWT_SECRET, {expiresIn: '1h'})
       res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
       }).send({message: 'token created!'})
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;