const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    default: false, //預設為未打勾的意思
  },
  password: {
    type: String,
    require: true,
    default: false, //預設為未打勾的意思
  },
  createAt: {
    type: Date,
    default: Date.now, //預設為未打勾的意思
  },
})
module.exports = mongoose.model('User', userSchema)
