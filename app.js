//載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

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
  Todo.find() //取出 Todo model 裡的所有資料
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的 Javascript 資料陣列
    .sort({ _id: 'asc' })
    .then((todos) => res.render('index', { todos })) //將資料傳給index樣板
    .catch((error) => console.log(error)) //錯誤處理
})

//設定new路由
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

//設定detail路由
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error))
})

//設定edit路由
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error))
})

//add delete router
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

//設定port
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
