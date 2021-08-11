const express = require('express')
const router = express.Router()

router.get('/login', (rep, res) => {
  res.render('login')
})

module.exports = router
