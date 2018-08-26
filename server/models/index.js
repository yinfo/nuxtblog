import mongoose from 'mongoose'
import md5 from 'md5'
import config from '../config'

require('./user')
require('./tag')
require('./article')
require('./comment')

const User = mongoose.model('User')

// const mongoUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`
const mongoUrl = 'mongodb://yinfo:y5724189@ds050559.mlab.com:50559/db1'
mongoose.Promise = global.Promise
mongoose.connection
  .openUri(mongoUrl)
  .once('open', async () => {
    console.log('database connect successed')
    // Инициализировать информацию администратора
    let userInfo = config.user
    userInfo.password = md5(userInfo.password)

    let user = await User.findOne({ role: 'superAdmin' }).exec()
    if (!user) {
      user = new User(userInfo)
      await user.save()
      console.log('Administrator information initialization succeeded')
    }
  })
  .on('error', (error) => {
    console.warn('database connect fail', error)
  })
