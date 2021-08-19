//載入 資料庫
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI 
console.log(process.env.MONGODB_URI)



//與資料庫連線，尋找指定資料庫路徑
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

//取得連線狀態
const db = mongoose.connection

//設定狀態回覆訊息
//連線失敗
db.on('error', () => {
  console.log('mongodb error!')
})

//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
