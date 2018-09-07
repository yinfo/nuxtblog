export default {
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    email: 'qq22337383@gmail.com',
    nickname: 'VueBlog',
    motto: 'Never too old to learn',
    avatar: 'avatar.png'
  },
  jwt: {
    secret: 'vueblog'
  },
  mongodb: {
    host: 'ds050559.mlab.com',
    database: 'db1',
    port: 50559,
    username: 'yinfo',
    password: 'y5724189'
  },
  // mongodb: {
  //   host: '127.0.0.1',
  //   database: 'vueblog',
  //   port: 27017,
  //   username: '',
  //   password: ''
  // },
  githubConfig: {
    githubClient: '',
    githubSecret: '',
    scope: 'user'
  },
  emailConfig: {
    user: '',
    pass: ''
  },
  app: {
    domain: '',
    host: '192.168.1.41',
    port: 3000,
    routerBaseApi: 'api'
  }
}
