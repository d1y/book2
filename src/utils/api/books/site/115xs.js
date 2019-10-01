/*
** crete by `@d1y`
** site: http://m.115xs.com/
*/

import trans from '../translater'

const $API = `http://m.115xs.com`
const DRAW = trans.router($API)

class xs extends trans {
  /*
  ** @param <string> - id (书籍`id`)
  ** @return <Promise>
  */
  async getBody(id = '2449576') {
    const result = {}
    const url = DRAW(`chapter/${ id }.html`)
    const HTML = await this._toHTML(url)
    result.raw_url = url
    result.title = HTML("#bookname").text()
    result.author = HTML(`#author`).text()
    result.chapter_name = HTML(`.headline`).text()
    let rawContent = HTML(`#content`)
    result.body = rawContent.html()
    result.word_length = result.body.trim().length
    return result
  }

  /*
  ** @tips 获取书籍章节
  ** @param <string> id
  ** @param <number> page
  ** @return <Promise>
  */
  async getChapters(id=`3979`, page=1) {
    const result = {}
    let url = DRAW(`menu/${ id }/0_${ page }.html`)
    const HTML = await this._toHTML(url)
    result.raw_url = url
    // 获取章节
    const LISTS = []
    let lists = HTML(`.readlist`)[0].children
    for (let i=0; i<lists.length; i++) {
      const ele = lists[i]
      const haschildren = ele.children
      if (haschildren && haschildren[0].parentNode.attribs.class != 'last') {
        const current = haschildren[0]
        let id = current.attribs.href
        id = id.split('/chapter/')[1]
        id = id.split('.html')[0]
        let text = current.children[0].data
        LISTS.push({
          id,
          text
        })
      }
    }
    // 上一页
    const pgPrev = HTML(`.pg-prev`)
    // 下一页
    const pgNext = HTML(`.pg-next`)
    console.log(pgNext)
    result.lists = LISTS
    return result
  }
}

export default xs