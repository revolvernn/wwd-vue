<template>
  <div>
    <van-nav-bar
      title="用户详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back(-1)"
    />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(pic, index) in wwdUser.picUrls" :key="index"  @click="showBigImg(index)">
        <van-image
          height="200"
          width="100%"
          lazy-load
          fit="cover"
          :src="$config.file.getDownloadUrl(pic.picOriginUrl) + '?x-oss-process=image/resize,h_528/auto-orient,1'"
        />
      </van-swipe-item>
    </van-swipe>
    <van-panel title="标题" desc="描述信息" status="状态">
      <div  slot="header">
        <div class="van-cell van-panel__header">
          <div class="van-cell__title">
            <span>{{wwdUser.wwdUserDto.nickname || '-'}}</span>
            <div class="van-cell__label">
               <dict-text class="dict-text" type="gender" :val="wwdUser.wwdUserDto.gender" :other-text="' / '+ $utils.ageFormat(wwdUser.wwdUserDto.birthDay)"/>
               <dict-text class="dict-text" icon="icon-daxuemingcheng" type="constellation_type" :val="wwdUser.wwdUserDto.constellation"></dict-text>
               <dict-text class="dict-text" icon="icon-daxuemingcheng" type="constellation_type" :val="wwdUser.wwdUserDto.constellation"></dict-text>
            </div>
          </div>
          <div class="van-cell__value van-panel__header-value">
            <span><dict-text type="married_status" :val="wwdUser.wwdUserDto.maritalStatus"></dict-text></span>
          </div>
        </div>
      </div>
      <div>
        <van-cell-group title="生活信息">
          <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <van-cell-group title="标签信息">
          <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <van-cell-group title="个人介绍">
          <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <van-cell-group title="择偶标准">
          <van-cell title="单元格" value="内容" />
        </van-cell-group>
      </div>
      <div slot="footer">
        <van-button size="small">有意思</van-button>
      </div>
    </van-panel>
    <pre-view-img :show="isPreViewImg" :imgs="picUrls" :currentImg="viewUrl" @close="isPreViewImg = false"></pre-view-img>
  </div>
</template>

<script>

import PreViewImg from 'w-previewimg'
import {Dialog, Toast} from 'vant'
import DictText from '../../components/DictText'
export default {
  components: {DictText, PreViewImg},
  name: 'UserDetail',
  data () {
    return {
      isPreViewImg: false,
      viewUrl: '',
      picUrls: [],
      wwdUserId: null,
      // 是否可以对他有意思
      isEnjoyCode: false,
      enjoyCode: null,
      isEnjoy: false,
      enjoyLoading: false,
      wwdUser: {
        picUrls: [],
        wwdUserDto: {},
        photo: null,
        userArea: {},
        tags: []
      }
    }
  },
  mounted () {
    let self = this
    self.wwdUserId = self.$route.query.wwdUserId
    this.loadPic()
    this.loadWwdUserDto()
    this.loadArea()
    this.loadTags()
    this.loadEnjoy()
    this.getEnjoyCode()
  },
  methods: {
    picUrlsComputed () {
      let urls = []
      for (let i = 0; i < this.wwdUser.picUrls.length; i++) {
        let pic = this.wwdUser.picUrls[i]
        urls.push(this.$config.file.getDownloadUrl(pic.picOriginUrl))
      }
      return urls
    },
    showBigImg (i) {
      this.viewUrl = this.picUrls[i]
      this.isPreViewImg = true
    },
    // 有意思按钮
    enjoy () {
      let self = this
      Dialog.confirm({
        title: '有意思',
        confirmButtonText: '确定，告诉TA',
        cancelButtonText: '算了，再想想',
        message: '每周只有7次使用该功能机会哦,若双方均“有意思”即可互看微信号'
      }).then(() => {
        self.doEnjoy()
      }).catch(() => {
        // on cancel
      })
    },
    doEnjoy () {
      let self = this
      // 发起对他有意思
      self.enjoyLoading = true
      self.$http.post('/wwd/user/current/enjoy/' + this.wwdUserId).then(function (res) {
        self.isEnjoy = false
        self.enjoyLoading = false
        Toast('你的心动信号已发出 记得关注公众号信息等待对方回应哦')
        self.getEnjoyCode()
      }).catch(res => {
        self.enjoyLoading = false
        let status = res.statusCode
        if (status === 409) {
          Toast(res.data.msg || '您近期操作已经达到限制！')
        }
        self.loadEnjoy()
      })
    },

    getEnjoyCode () {
      let self = this
      self.$http.get('/wwd/user/' + self.wwdUserId + '/enjoyCode').then(function (response) {
        self.isEnjoyCode = true
        self.enjoyCode = response.data.data.content.enjoyCode
      })
    },
    tagIcon (type) {
      let r = ''
      switch (type) {
        case 'nature_type':
          r = 'icon-smileface'
          break
        case 'hobby_type':
          r = 'icon-xingquaihao'
          break
        case 'food_type':
          r = 'icon-shiwu'
          break
        case 'movie_type':
          r = 'icon-dianying'
          break
        case 'trip_type':
          r = 'icon-lvhang'
          break
        case 'sport_type':
          r = 'icon-yundong101'
          break
      }
      return r
    },
    previewImage (url) {
    },
    // 加载图片
    loadPic () {
      let self = this
      self.$http.get('/wwd/user/' + self.wwdUserId + '/pic').then(function (response) {
        let content = response.data.data.content
        self.wwdUser.picUrls = content
        self.picUrls = self.picUrlsComputed()
      })
    },
    // 加载详细基本信息
    loadWwdUserDto () {
      let self = this
      self.$http.get('/wwd/user/' + self.wwdUserId).then(function (response) {
        let content = response.data.data.content
        self.wwdUser.wwdUserDto = content
        self.wwdUser.photo = response.data.data.photo
        // 记录页面访问
        self.$http.pageViewRecord({
          url: window.location.href,
          type: '汪汪队用户详情',
          contentId: content.id,
          contentName: content.name
        })
        self.addWwdUserVisit({wwdUserId: self.wwdUserId, visitType: self.$utils.getUrlFrom(window.location.href, 'from')})
      })
    },
    // 添加我看了谁
    addWwdUserVisit (data) {
      this.$http.post('/wwd/user/visit', data).then(function (res) {
      })
    },
    // 加载区域，家乡和当前所在地
    loadArea () {
      let self = this
      self.$http.get('/wwd/user/' + self.wwdUserId + '/area').then(function (response) {
        let content = response.data.data.content
        self.wwdUser.userArea = content
      })
    },
    // 加载是否已对他/她有意思
    loadEnjoy () {
      let self = this
      self.$http.get('/wwd/user/current/enjoy/' + self.wwdUserId).then(function (response) {
        let content = response.data.data.content
        // 不存在数据，可以点击有意思
        if (!content) {
          self.isEnjoy = true
        }
      }).catch(res => {
        // 不存在，可以点击有意思
        let status = res.statusCode
        if (status === 404) {
          self.isEnjoy = true
        }
      })
    },
    loadTags: function () {
      let self = this
      self.$http.get('/wwd/user/' + self.wwdUserId + '/tags').then(function (res) {
        let tagContent = res.data.data.content
        self.wwdUser.tags = tagContent
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .van-swipe {
    max-height: 200px;
    overflow: hidden;
  }
  .van-cell__title, .van-cell-group__title{
    text-align: left;
  }
  .dict-text {
    margin-top: 10px;
  }
</style>
