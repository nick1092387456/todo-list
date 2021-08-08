//引用expess&express路由器
const express = require('express')
const router = express.Router()
//引用Todo model
const Todo = require('../../models/todo')


router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.error(error))
})

module.exports = router
