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
          name: '/',
          title: '首页',
          icon: 'home-o',
          normal:
            'http://sucai.suoluomei.cn/sucai_zs/images/20190910093117-fx2.png',
          active:
            'http://sucai.suoluomei.cn/sucai_zs/images/20190910093117-fx.png'
        },
        {
          name: '/activity',
          title: '活动',
          icon: 'home-o',
          normal:
            'http://sucai.suoluomei.cn/sucai_zs/images/20190910093117-xx.png',
          active:
            'http://sucai.suoluomei.cn/sucai_zs/images/20190910093117-xx2.png'
        },
        {
          name: '/user',
          title: '我的',
          icon: 'friends-o',
          normal:
            'http://sucai.suoluomei.cn/sucai_zs/images/20190910093117-wd.png',
          active:
            'http://sucai.suoluomei.cn/sucai_zs/images/20190910093117-wd2.png'
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
