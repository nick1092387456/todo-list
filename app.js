//載入 express 並建構應用程式伺服器

const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const Todo = require('./models/todo')
const usePassport = require('./config/passport')

const flash = require('connect-flash')
//新增判斷:若NODE_ENV不在production狀態(正式上線模式)就引入我們設定的環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT
console.log(process.env.PORT)

//設定樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: 'false',
    saveUnInitialized: true,
  })
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  next()
})
app.use(routes)

//設定port
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
