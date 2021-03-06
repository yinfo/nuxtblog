<template>
  <div class="detail container">
    <h1 class="detail-title">{{ article.title }}</h1>
    <div class="detail-meta">
      <span>
        {{ article.createdAt | formatDate('yyyy-MM-dd') }}
        <span class="meta-division">/</span> {{ article.updatedAt | formatDate('yyyy-MM-dd') }}
      <span class="meta-division">/</span> {{ article.views }}мнения
      </span>
    </div>
    <div class="detail-content">
      <top-preview :content="article.content" :options="options"></top-preview>
    </div>
    <p class="detail-tags">
      <nuxt-link v-for="(tag, index) in article.tags" :key="index" :to="'/tags/' + tag.id">{{ tag.name }}</nuxt-link>
    </p>
    <div class="detail-copyright">
      <p>Употребление статьи <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Attribution 4.0 Международное лицензионное соглашение</a> лицензирование，Пожалуйста, укажите оригинальную ссылку при перепечатке</p>
    </div>
    <div class="detail-admin" v-if="isLogin">
      <p class="admin-del"><a @click="del(article.id)">удалять</a></p>
      <p class="admin-edit"><a @click="edit(article.id)">редактировать</a></p>
    </div>
    <div v-if="isConfig">
      <top-comment :comment-list="article.comments" :article-id="article.id" />
    </div>
    <top-tip ref="tip" />
  </div>
</template>
<script>
import { cutString } from '~/plugins/filters'
export default {
  async asyncData({ store, route, error }) {
    let id = route.params.id || ''
    const { data } = await store.dispatch('ARTICLE_DETAIL', id)
    if (!id) {
      error({
        message: 'This page could not be found',
        statusCode: 404
      })
      return false
    }
    return {
      article: data || {}
    }
  },
  head() {
    return {
      title: this.article.title + '-' + this.$store.state.user.nickname,
      meta: [
        { description: cutString(this.article.content, 300) }
      ]
    }
  },
  data() {
    return {
      options: {},
      isLogin: this.$store.state.token ? true : false,
      isConfig: this.$store.getters.isGithubConfig
    }
  },

  mounted() {
    if (process.browser) {
      this.options = {
        linkify: true,
        highlight(str, lang = 'javascript') {
          if (require('highlight.js').getLanguage(lang)) {
            try {
              return require('highlight.js').highlight(lang, str).value
            } catch (__) {}
          }
          return ''
        }
      }
    }
  },

  methods: {
    del(id) {
      this.$store.dispatch('DELETE_ARTICLE', id).then(data => {
        if (data.success) {
          this.$refs.tip.openTip('Статья удалена')
          this.$router.go(-1)
        }
      })
    },
    edit(id) {
      this.$router.push(`/admin/publish/${id}`)
    }
  }
}

</script>
