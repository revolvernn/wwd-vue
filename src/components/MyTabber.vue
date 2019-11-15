<template>
<div>
  <van-tabbar value="" v-model="active" inactive-color="#777777" active-color="#000000">
    <van-tabbar-item v-for="(item,index) in tabbars"  :icon="(item.icon)" :key="index" :to="(item.name)">
      <span>{{item.title}}</span>
      <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" v-if="!item.icon"/>
    </van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  name: 'MyTabber',
  props: {
    value: 0
  },
  data () {
    return {
      active: 0,
      tabbars: [
        {
          name: '/index',
          title: '首页',
          // icon: 'home-o',
          normal: require('@/assets/image/home.png'),
          active: require('@/assets/image/homeHL.png')
        },
        {
          name: '/activity',
          title: '活动',
          // icon: 'home-o',
          normal: require('@/assets/image/hd.png'),
          active: require('@/assets/image/hdHL.png')
        },
        {
          name: '/user',
          title: '我的',
          // icon: 'friends-o',
          normal: require('@/assets/image/user.png'),
          active: require('@/assets/image/userHL.png')
        }
      ]
    }
  },
  mounted () {
    this.active = this.value
  },
  watch: {
    value (val) {
      this.active = val
    }
  }
}
</script>

<style scoped>

</style>
