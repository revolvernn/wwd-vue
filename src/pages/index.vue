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
    <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
      <van-list   v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
        <van-cell class="index-list-cell"
                  v-for="(item,index) in listData"
                  :key="index">
          <van-card
            desc="asdf"
            :title="item.wwdUserDto.nickname"
            :thumb="$config.file.getDownloadUrl(photo[item.wwdUserDto.userId])"
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
    </van-pull-refresh>
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
      // 列表信息
      listData: [],
      // 列表头像信息
      photo: {},
      accessInfo: {},
      searchForm: {
        pageNo: 1,
        pageSize: 10,
        includePic: true,
        includeAccessInfo: true,
        keyword: '',
        gender: '',
        ageStart: '',
        ageEnd: '',
        education: '',
        homeProvinceId: '',
        homeCityId: '',
        homeDistrictId: '',
        nowProvinceId: '',
        nowCityId: '',
        nowDistrictId: ''
      },
      pickervalue: '',
      showPicker: false,
      columns: ['男', '女'],
      show: false,
      value: '',
      loading: false,
      pullLoading: false,
      finished: false
    }
  },
  methods: {
    onLoad (pageNo) {
      let self = this
      if (pageNo) {
        self.searchForm.pageNo = pageNo
      }
      self.$http.get('/wwd/users', self.searchForm).then(function (res) {
        let content = res.data.data.content
        if (self.pullLoading) {
          self.listData = content
          self.pullLoading = false
        } else {
          self.searchForm.pageNo = res.data.data.page.pageNo + 1
          self.listData = self.listData.concat(content)
        }
        for (let key in res.data.data.photo) {
          self.photo[key] = res.data.data.photo[key]
        }
        for (let key in res.data.data.accessInfo) {
          self.accessInfo[key] = res.data.data.accessInfo[key]
        }
        self.loading = false
        if (self.searchForm.pageNo === res.data.data.page.pageNum) {
          self.finished = true
        }
      }).catch(function (res) {
        let status = res.statusCode
        if (status === 404) {
          self.listData = []
        }
      })
    },
    onRefresh () {
      this.onLoad(1)
      this.$toast('刷新成功')
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
