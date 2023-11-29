const User = require("../models/User");

const verifyAdmin = async (req, res, next)=>{
    const email = req?.decoded?.email;
    const userData = await User.findOne({email})
    console.log(userData);
    if(userData?.role !== 'admin'){
        return res.status(401).send({message: 'unauthorized access'})
    }
    next()
}

module.exports = verifyAdmin;