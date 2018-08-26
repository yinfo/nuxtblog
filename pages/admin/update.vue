<template>
  <div class="admin-update">
    <div class="update-info">
      <h4>Изменение личной информации</h4>
      <input type="text" v-model="user.nickname">
      <input type="text" v-model="user.motto">
      <input type="text" v-model="user.email">
      <button @click="updateInfo">Подтвердить изменение</button>
    </div>
    <div class="update-password">
      <h4>Изменить пароль</h4>
      <input type="password" v-model="oldPassword" placeholder="Введите старый пароль">
      <input type="password" v-model="newPassword" placeholder="Введите новый пароль">
      <input type="password" v-model="vertifyPassword" placeholder="Введите новый пароль еще раз.">
      <button @click="updatePassword">Подтвердить изменение</button>
    </div>
    <top-tip ref="tip"/>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      vertifyPassword: '',
      user: {}
    }
  },
  mounted() {
    this.$store.dispatch('ADMIN_INFO').then((data) => {
      this.user = data.data
    })
  },
  head() {
    return {
      title: 'Изменить информацию - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    updateInfo() {
      this.$store.dispatch('UPDATE_ADMIN', this.user).then((data) => {
        if(data.success) {
          this.$refs.tip.openTip('Завершена обработка информации')
        }
      })
    },
    updatePassword() {
      if (!this.oldPassword || !this.newPassword || !this.vertifyPassword) {
        return false
      }
      if (this.newPassword !== this.vertifyPassword) {
        this.$refs.tip.openTip('Два пароля непоследовательны！')
        return false
      }
      this.$store.dispatch('UPDATE_ADMIN', { oldPassword: this.oldPassword, newPassword: this.newPassword }).then((data) => {
        if(data.success) {
          this.$refs.tip.openTip('Сброс пароля завершен')
          // clear token
          this.$store.dispatch('LOGOUT').then(ret => {
            if(ret.success) {
              this.$store.state.token = ''
              this.$router.push('/login')
            }
          })
        }
      })
    }
  }
}

</script>
