const cheerio = require('cheerio')
import request from '../../toy/request'

class Bookfetch {

  static init() {
    return new Bookfetch
  }

  static router(root, apiRouter) {
    let url = root
    return apiRouter=> `${url}/${apiRouter}`
  }

  /* 
  ** @tips 发送请求
  ** @param <obj> - options
  ** @return <Promise>
  */
  async initRequest(options) {
    return await request(options)
  }

  /*
  ** @tips <若返回的内容为`html`, 将转换为对象使用`>
  ** @param <string> - html
  ** @param <boolean> - flag
  ** @return <Promise>
  */
  async _toHTML(html, flag = true) {
    if (flag) {
      const HTML = await this.initRequest({
        url: html
      })
      return cheerio.load(HTML)
    }
    return cheerio.load(html)
  }

  /*
  ** @tips 分类
  ** @return <obj>
  */
  ranking() {
    return {}
  }

  /*
  ** @tips 获取带子分类的父分类
  ** @return <obj>
  */
  ranking2() {
    return {}
  }

  /*
  ** @tips 获取分类书籍
  ** @return <obj>
  */
 categoryInfo() {
   return {}
 }

 /*
 ** @tips 获取书籍详情
 ** @return <obj>
 */
 bookInfo() {
   return {}
 }

 /*
 ** @tips 获取书籍章节<继承`class`务必重写此方法>
 ** @return <obj>
 */
 getChapters() {
   return {}
 }

 /*
 ** @tips 获取章节内容
 ** @return <obj>
 */
 getBody() {
  return {}
 }

 /*
 ** @tips 获取作者书籍
 ** @return <obj>
 */
 getAuthors() {

 }

 /*
 ** @tips 评论
 ** @return <obj>
 */
 toSay() {
  return {}
 }

 /*
 ** @tips 书单
 ** @return <obj>
 */
 getBookList() {
  return {}
 }

 /*
 ** @tips 获取书单详情
 ** @return <obj>
 */
 toBookList() {
  return {}
 }

 /*
 ** @tips 搜索热词
 ** @return [ title: String ]
 */
 searchHotWords() {
   return false
 }

 /*
 ** @tips 热门搜索
 ** @return [{
 **   id: String,
 **   title: String
 ** }]
 */
 hotWords() {
  return false
 }

 /*
 ** @tips 搜索补全
 */
 searchAutoComplete() {
   return false
 }

}

module.exports = Bookfetch