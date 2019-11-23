<template>
  <div>
    <van-sticky class="search">
      <van-search v-model="searchForm.keyword" placeholder="请输入搜索关键词" @focus="showSearchPopup(true)"></van-search>
    </van-sticky>
    <van-popup v-model="show" position="top" :style="{ height: '40%' }" >
      <van-sticky class="search">
        <van-search v-model="searchForm.keyword" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </van-sticky>
      <dict-picker label="性别" :default-value="searchForm.gender" dict-type="gender"
                   @onConfirm="genderConfirm"></dict-picker>
      <date-range-picker label="年龄"
                   @onConfirm="dateRangeConfirm"></date-range-picker>
      <area-picker label="目前在" :default-value="{key1: searchForm.nowProvinceId, key2: searchForm.nowCityId , key3: searchForm.nowDistrictId }"
                   @onConfirm="nowAreaConfirm"></area-picker>
      <area-picker label="家乡在" :default-value="{key1: searchForm.homeProvinceId, key2: searchForm.homeCityId , key3: searchForm.homeDistrictId }"
                   @onConfirm="homeAreaConfirm"></area-picker>
    </van-popup>
    <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
      <van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell class="index-list-cell"  v-for="(item,index) in listData" :key="index">
          <van-card  :title="item.wwdUserDto.nickname || '-'" :thumb="$config.file.getDownloadUrl(photo[item.wwdUserDto.userId])">
            <div slot="desc">
              <dict-text type="gender" :val="item.wwdUserDto.gender"/>
            </div>
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
import AreaPicker from '../components/AreaPicker'
import { Toast } from 'vant'
import DictPicker from '../components/DictPicker'
import DictText from '../components/DictText'
import DateRangePicker from '../components/DateRangePicker'
export default {
  components: {MyTabber, AreaPicker, DictPicker, DictText, DateRangePicker},
  name: 'Index',
  data () {
    return {
      listData: [],
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
      show: false,
      loading: false,
      pullLoading: false,
      finished: false
    }
  },
  methods: {
    onLoad (pageNo, isSearch) {
      let self = this
      if (pageNo) {
        self.searchForm.pageNo = pageNo
      }
      self.$http.get('/wwd/users', self.searchForm).then(function (res) {
        let content = res.data.data.content
        if (self.pullLoading || isSearch) {
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
        let status = res.response.status
        self.loading = false
        self.finished = true
        if (status === 404) {
          self.listData = []
        }
      })
    },
    onRefresh () {
      this.onLoad(1)
      Toast('刷新成功')
    },
    onSearch () {
      this.show = this.showSearchPopup(false)
      this.onLoad(1, true)
    },
    showSearchPopup (flag) {
      this.show = flag
    },
    genderConfirm (val, index) {
      this.searchForm.gender = val.value
    },
    dateRangeConfirm (start, end) {
      console.log(start)
      console.log(end)
    },
    nowAreaConfirm (val, index) {
      this.searchForm.nowProvinceId = val.value.province_id
      this.searchForm.nowCityId = val.value.city_id
      this.searchForm.nowDistrictId = val.value.district_id
    },
    homeAreaConfirm (val, index) {
      this.searchForm.homeProvinceId = val.value.province_id
      this.searchForm.homeCityId = val.value.city_id
      this.searchForm.homeDistrictId = val.value.district_id
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
