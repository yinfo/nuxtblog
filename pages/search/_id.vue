<template>
  <div class="search container">
    <div v-if="$route.params.id">
      <div class="search-result">
        <p>найти{{ $store.state.searchArticles.length }}Статья и <span>{{ keyword }}</span> Связанные статьи</p>
        <top-list :articles="$store.state.searchArticles" />
      </div>
    </div>
    <div v-else>
      <div class="search-wrap">
        <h3>Поиск статьи</h3>
        <label>
          <input type="text" v-model="keyword" @keyup.enter="search" autofocus placeholder="Вернуться назад" maxlength="30">
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async fetch({ store, route }) {
    let id = route.params.id || ''
    await store.dispatch('SEARCH', id)
  },
  head() {
    return {
      title: 'поиск - ' + this.$store.state.user.nickname
    }
  },
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    search() {
      let keyword = encodeURIComponent(this.keyword) || encodeURIComponent(this.$route.params.id)
      if (!keyword) { return false }
      this.$router.push({
        name: 'search-id',
        params: {
          id: keyword
        }
      })
    }
  }
}

</script>
