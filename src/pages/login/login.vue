<template>
  <div>
    <div class="login-form">
      <van-cell-group>
        <van-field
          v-model="form.principal"
          required
          clearable
          left-icon="friends-o"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="form.password"
          type="password"
          left-icon="setting-o"
          placeholder="请输入密码"
          required
        />
        <van-button type="primary" @click="loginClick">登录</van-button>
      </van-cell-group>
    </div>
    <div class="footer">
      <van-button @click="wxLogin" type="primary">微信一键登录</van-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'

export default {
  name: 'User',
  data () {
    return {
      form: {
        loginType: 'ACCOUNT',
        client: this.$config.client,
        principal: '',
        password: '',
        captcha: '',
        rememberMe: false
      }
    }
  },
  methods: {
    wxLogin () {
      this.$router.push({name: 'Index'})
    },
    loginClick () {
      let self = this
      self.$http.post('/login', self.form)
        .then(function (response) {
          // 跳转到主页面
          self.$router.push({name: 'index'})
        })
        .catch(function (response) {
          console.log(response)
          Toast('登录失败')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-form{
    padding: 0 40px 0 40px;
  }
  .van-cell-group{
    margin-top: 150px;
  }
  .van-cell-group .van-button{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .van-button{
    width: 100%;
    border-radius: 30px;
  }
  .footer .van-button{
    width: 80%;
    margin-top: 30px;
  }
</style>
