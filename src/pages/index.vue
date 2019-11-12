<template>
  <div>
    <van-sticky class="search">
      <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          @focus="showPopup"
        >
        </van-search>
    </van-sticky>
    <van-popup
      v-model="show"
      position="top"
      :style="{ height: '40%' }"
    >
      <van-sticky class="search">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </van-sticky>
      <my-picker label="性别" :value="pickervalue" @onConfirm="onConfirm" :values="columns"></my-picker>
    </van-popup>
    <van-list   v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
      <van-cell class="index-list-cell"
        v-for="item in list"
        :key="item">
        <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
        >
          <div slot="tags">
            <van-tag plain type="danger">标签</van-tag>
            <van-tag plain type="danger">标签</van-tag>
          </div>
          <div slot="footer">
            <van-button size="mini">按钮</van-button>
            <van-button size="mini">按钮</van-button>
          </div>
        </van-card>
      </van-cell>
    </van-list>
    <my-tabber :value="0"/>
  </div>
</template>

<script>
import MyTabber from '../components/MyTabber'
import MyPicker from '../components/MyPicker'
import { Toast } from 'vant'
export default {
  components: {MyTabber, MyPicker},
  name: 'Inxde',
  data () {
    return {
      pickervalue: '',
      showPicker: false,
      columns: ['男', '女'],
      show: false,
      value: '',
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    onSearch () {
      this.show = !this.show
      Toast(this.pickervalue)
    },
    showPopup () {
      this.show = true
    },
    onConfirm (val, index) {
      this.pickervalue = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search{
    height: 50px;
  }
  .van-search {
    position: fixed;
    z-index: 100;
    width: 100%;
  }
  .index-list-cell{
    padding: 10px 5px;
  }
</style>
