<template>
  <div>
    <van-cell title="URL 跳转" is-link url="/vant/mobile.html" />
    <van-cell title="路由跳转" is-link to="/" />
    <my-tabber :value="2"/>
  </div>
</template>

<script>
import MyTabber from '../../components/MyTabber'
export default {
  components: {MyTabber},
  name: 'User',
  data () {
    return {
      active: 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
