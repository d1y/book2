/*
** create by `@d1y` on 2019-09-13
** @tips 一个简单的封装方法, 只是简单的用`Promise`包装了一下
** @next 可能会还是用`flyio`来重写, 在一些场景下可能是不太适用
** @param <Object> - config
** @return <Promise>
*/
export default config => {
  let method = config.method || 'GET'
  let { url, data, header } = config
  data = data || {}
  let userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1`
  header = header || {
    'content-type': 'application/x-www-form-urlencoded;charset=gbk'
  }
  return new Promise((rcv, rjt)=> {
    uni.showLoading({
      title: '加载中(゜-゜)つロ ',
      mask: true,
    })
    uni.request({
      url,
      data,
      method,
      header,
      success(data) {
        if (data.statusCode == 200) {
          uni.hideLoading()
          rcv(data.data)
        }
      },
      fail(err) {
        uni.hideLoading()
        uni.showModal({
          title: '提示',
          content: '请求失败',
          showCancel: false
        })
        console.error(`send request: ${JSON.stringify(err)}`)
        rcv(err)
      }
    })
  })
}