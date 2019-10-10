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
    // TODO: 添加`DATA`(Post | Get)
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
  async ranking() {
    return {}
  }

  /*
  ** @tips 获取带子分类的父分类
  ** @return <obj>
  */
  async ranking2() {
    return {}
  }

/*
** @tips 获取分类书籍
** @return <obj>
*/
 async categoryInfo() {
   return {}
 }

 /*
 ** @tips 获取书籍详情
 ** @return <obj>
 */
 async bookInfo() {
   return {}
 }

 /*
 ** @tips 获取书籍章节<继承`class`务必重写此方法>
 ** @return <obj>
 */
 async getChapters() {
   return {}
 }

 /*
 ** @tips 获取章节内容
 ** @return <obj>
 */
 async getBody() {
  return {}
 }

 /*
 ** @tips 获取作者书籍
 ** @return <obj>
 */
 async getAuthors() {

 }

 /*
 ** @tips 评论
 ** @return <obj>
 */
 async toSay() {
  return {}
 }

 /*
 ** @tips 书单
 ** @return <obj>
 */
 async getBookList() {
  return {}
 }

 /*
 ** @tips 获取书单详情
 ** @return <obj>
 */
 async toBookList() {
  return {}
 }

 /*
 ** @tips 搜索热词
 ** @return [ title: String ]
 */
 async searchHotWords() {
   return []
 }

 /*
 ** @tips 热门搜索
 ** @return [{
 **   id: String,
 **   title: String
 ** }]
 */
 async hotWords() {
  return []
 }

 /*
 ** @tips 搜索补全
 ** @param {String} 搜索关键词
 ** @return [ Stirng ]
 */
 async searchAutoComplete(key) {
   return []
 }

}

module.exports = Bookfetch