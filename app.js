//載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) //與資料庫連線，告知尋找資料庫
const db = mongoose.connection //取得連線狀態

//設定狀態回覆訊息
//連線失敗
db.on('error', () => {
  console.log('mongodb error!')
})

//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//設定網頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

//設定port
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
