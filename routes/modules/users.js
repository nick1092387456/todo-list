const express = require('express')
const router = express.Router()

router.get('/login', (rep, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {})

router.get('/register', (rep, res) => {
  res.render('register')
})

module.exports = router
