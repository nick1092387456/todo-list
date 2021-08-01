//載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

//設定樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//載入 資料庫
const mongoose = require('mongoose')

//與資料庫連線，尋找指定資料庫路徑
mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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
  res.render('index')
})

//設定port
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
