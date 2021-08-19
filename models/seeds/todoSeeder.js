const bcrypt = require('bcryptjs') //載入密碼交密套件
if (process.env.NODE_ENV !== 'production') {
  //確認資料庫連線狀態是否需要使用環境變數套件
  require('dotenv').config()
}
//載入必要資料庫資訊
const Todo = require('../todo')
const User = require('../user')
const db = require('../../config/mongoose')
//建立種子使用者
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
}
//密碼加密及將seedUser推入資料庫
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id
      return Promise.all(
        Array.from({ length: 10 }, (_, i) =>
          Todo.create({ name: `name-${i}`, userId })
        )
      )
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
