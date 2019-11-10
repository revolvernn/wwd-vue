<template>
  <div>
    <van-panel title="标题" desc="描述信息" status="状态">
      <div>内容</div>
      <div slot="footer">
        <van-button size="small">按钮</van-button>
        <van-button size="small" type="danger">按钮</van-button>
      </div>
    </van-panel>
    <my-tabber :value="0"/>
  </div>
</template>

<script>
import MyTabber from '../components/MyTabber'
export default {
  components: {MyTabber},
  name: 'Inxde',
  data () {
    return {
      imageList: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
