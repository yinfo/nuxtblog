import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default () => {
  return new Vuex.Store({
    state: {
      token: '',
      githubToken: '',
      user: {
        role: 'superAdmin',
        username: 'q',
        password: 'q',
        email: 'qq22337383@gmail.com',
        nickname: 'nobody',
        motto: 'Never too old to learn',
        avatar: 'avatar.png'
      },
      total: 0,
      articles: [],
      tags: [],
      tagArticles: [], // Список статей под лейблом
      searchArticles: [],
      archives: [],
      githubApi:{
        userInfo: 'https://api.github.com/user?access_token='
      }
    },
    getters,
    mutations,
    actions
  })
}
