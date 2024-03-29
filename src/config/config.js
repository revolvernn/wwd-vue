// const host = 'http://yangwei.ngrok.ahbdz.com'
// const host = 'http://api.51match.cn'
const host = ''
const hostApi = host + '/api'
const config = {
  logo: 'http://p3.qhimg.com/t01f9eff21fde930194.png',
  host: host,
  hostApi: hostApi,
  hostContext: host + '/uni-app',
  cookieKey: 'cookieKey',
  file: {
    // 文件上传地址
    uploadUrl: hostApi + '/upload/file',
    // 文件下载地址
    downloadUrl: hostApi + '/file',
    getDownloadUrl: function (path) {
      if (path) {
        if (path.indexOf('http') === 0) {
          return path
        } else {
          return this.downloadUrl + path
        }
      }
      return ''
    }
  },
  // 是否需要强制登录
  forcedLogin: true,
  // 标识是小程序下是公众帐号，如果不是，可以配置为空
  which: 'kaopudanshen',
  // 这里后端会加客户端配置
  client: 'h5',
  dictExcludeValue: {
    gender: ['unknown']
  }
}
export default config
