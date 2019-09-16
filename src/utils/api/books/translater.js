const cheerio = require('cheerio')
import request from '../../toy/request'

class Bookfetch {
  // constructor(url) {
  //   this.url = url
  // }

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
  ** @return <obj>
  */
  _to(html) {
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
 ** @return <obj>
 */
 searchHotWords() {
   return {}
 }

 /*
 ** @tips 热门搜索
 ** @return <obj>
 */
 hotWords() {
  return {}
 }

 /*
 ** @tips 搜索补全
 ** @return {}
 */
 searchAutoComplete() {
   return {}
 }

}

module.exports = Bookfetch