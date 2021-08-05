const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  isDone: {
    type: Boolean,
    default: false, //預設為未打勾的意思
  },
})
module.exports = mongoose.model('Todo', todoSchema)
