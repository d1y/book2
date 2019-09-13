/*
** create by `@d1y` on 2019-09-13
** @tips 一个简单的封装方法, 只是简单的用`Promise`包装了一下
** @next 可能会还是用`flyio`来重写, 在一些场景下可能是不太适用
** @param <Object> - config
** @return (Promise)
*/
export default config => {
  let method = config.method || 'GET'
  let { url, data, header } = config
  data = data || {}
  /*
  ** headers 目前只用作 `useragent`
  */
  let userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1`
  header = header || {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    "user-agent": userAgent
  }
  return new Promise((rcv, rjt)=> {
    uni.request({
      url,
      data,
      method,
      header,
      success(data) {
        if (data.statusCode == 200) {
          rcv(data.data)
        } else {
          rjt('状态码不对')
        }
      },
      fail(err) {
        console.error(`send request: ${err}`)
        rcv(null)
      }
    })
  })
}