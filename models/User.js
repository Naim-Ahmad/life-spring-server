const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   avatar: String,
   email: {
    type: String,
    required: true,
    unique: true
   },
   bloodGroup: {
    type: String,
    required: true
   },
   district: {
    type: String,
    required: true,
   },
   upazila: {
    type: String,
    required: true,
   },
   status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active'
   },
   role: {
      type: String,
      required: true,
      default: 'user'
   },
   reservation: {
      type: [{type: mongoose.Types.ObjectId, ref: "Reservation"}],
      default: []
  }
})

const User = mongoose.model("User", userSchema)


module.exports = User;