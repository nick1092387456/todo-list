//module.exports 並初始化套件
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
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
          if (user.password !== password) {
            return done(null, false, {
              message: 'Password or Email incorrect.',
            })
          }
          return done(null, user)
        })
        .catch((err) => done(err, false))
    })
  )
  //// 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => console.log(err, null))
  })
}