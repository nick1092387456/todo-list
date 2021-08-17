//module.exports 並初始化套件
const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy //引用facebook登入策略
const User = require('../models/user')

module.exports = (app) => {
  //初始化模組

  app.use(passport.initialize())
  app.use(passport.session())

  //設定使用本地登入策略,設定使用反/序列化
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: 'That email is not registered',
            })
          }
          //比對密碼
          return bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
              return done(null, false, {
                message: 'Email or Password incorrect.',
              })
            }
            return done(null, user)
          })
        })
        .catch((err) => done(err, false))
    })
  )

  //引用FB登入策略
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName'], //要從FB取得授權的資料
      },

      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json //使用解構附值取得_json裡的資料
        User.findOne({ email }).then((user) => {
          //利用email查詢是否已註冊
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          //若沒有註冊過則亂數產生一個密碼for FB登入使用者
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(randomPassword, salt))
            .then((hash) =>
              User.create({
                name,
                email,
                password: hash,
              })
            )
            .then((user) => done(null, user))
            .catch((err) => done(err, false))
        })
      }
    )
  )

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
