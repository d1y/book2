const cheerio = require('cheerio')
import request from '../../toy/request'

class Bookfetch {
  _jq = cheerio
  constructor(config) {
    this.config = config
  }

  taging = []

  static init() {
    /*
    ** @tips 初始化一个实例
    */
    return new Bookfetch()
  }

  async initHTML(options) {
    /*
    ** @tips 爬取`html`内容
    */
    return await request(options)
  }

  tags(isNew) {
    /* 
    ** @tips 书籍类别
    ** 继承该`class`必须重写此方法
    ** @param <bool> - isNew (是否请求一次最新的分类)
    ** @return <array>
    */
    if (isNew) {
      const { url } = this.config
      this.initHTML({ url }).then(r=> {
        const $ = this._jq.loads(r)
        console.log($)
      })
      return
    }
  }

}

module.exports = Bookfetch