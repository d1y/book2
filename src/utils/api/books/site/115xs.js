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
    result.title = HTML("#bookname").text()
    result.author = HTML(`#author`).text()
    result.chapter_name = HTML(`.headline`).text()
    // TODO: 格式化内容
    result.body = HTML(`#content`).text()
    result.word_length = result.body.trim().length
    return result
  }
}

export default xs