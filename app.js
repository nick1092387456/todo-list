//載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()

//設定網頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

//設定port
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
