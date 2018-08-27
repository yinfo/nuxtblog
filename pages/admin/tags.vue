<template>
  <div class="admin-tags">
    <div class="tags-input" v-if="isEdit">
      <input type="text" @keyup.enter="edit" v-model="tag.name">
      <button class="black-button" @click="edit">Подтвердить изменение</button>
    </div>
    <ul class="tags-list">
      <li class="list-item" v-for="(tag, index) in tags" :key="index">
        <p class="item-title"><nuxt-link :to="'/tags/'+tag.id">{{tag.name}}</nuxt-link></p>
        <p class="item-date">{{tag.updatedAt | formatDate('yyyy-MM-dd')}}</p>
        <p class="item-del"><a @click="delTag(tag)">удалить|</a></p>
        <p class="item-edit"><a @click="editTag(tag)">редактировать</a></p>
      </li>
    </ul>
    <top-tip ref="tip"/>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      tag:{},
      tags: [],
      isEdit: false
    }
  },
  mounted() {
    this.$store.dispatch('TAGS').then((data) => {
      this.tags = data.data
    })
  },
  head() {
    return {
      title: 'Изменить тег - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    delTag(tag) {
       this.$store.dispatch('DELETE_TAG', tag.id).then((data) => {
        // console.log(data)
        if(data.success) {
         this.$refs.tip.openTip('Удаление тега завершено')
         this.$store.dispatch('TAGS').then((data) => {
           this.tags = data.data
         })
        }
      })
    },
    editTag(tag) {
      this.isEdit = true
      this.tag = tag
    },
    edit() {
      this.isEdit = false
      this.$store.dispatch('UPDATE_TAG', this.tag).then((data) => {
        if(data.success) {
          this.$refs.tip.openTip('Обновление тега завершено')
          this.$store.dispatch('TAGS').then((data) => {
           this.tags = data.data
         })
        }
      })
    }
  }
}

</script>
