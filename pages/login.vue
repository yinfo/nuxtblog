<template>
  <div class="login container">
    <input type="text" placeholder="имя пользователя" autocomplete="off" v-model="user.username">
    <input type="password" placeholder="пароль" autocomplete="off" v-model="user.password" @keyup.enter="login">
    <button @click="login">войти</button>
    <top-tip ref="tip"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user:{}
    }
  },
  head() {
    return {
      title: 'войти - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    login() {

      if(!this.user.username || !this.user.password) {
        return false
      }

      this.$store.dispatch('LOGIN', this.user).then(data => {
        console.log('data.success=',data.success)
        if(data.success) {
          this.$router.push('/admin/publish')
        } else {
          this.$refs.tip.openTip('Имя пользователя или пароль неверны')
        }
      })
    }
  }
}
</script>

