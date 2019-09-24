/*
** the api: https://api.zhuishushenju.com
** @tips [ 接口版本 ]
*/
import trans from '../translater'

const $API = `http://api.zhuishushenqi.com`
const DRAW = trans.router($API)
const decode = str=> unescape(str).split(`/agent/`)[1]

class zhuishu extends trans {
  
  async searchHotWords() {
    return await this.initRequest({
      url: DRAW(`book/search-hotwords`)
    })
  }

  async hotWords() {
    return await this.initRequest({
      url: DRAW(`book/hot-word`)
    })
  }

  async searchAutoComplete(query = `斗破苍穹`) {
    return await this.initRequest({
      url: DRAW(`book/auto-complete`),
      data: { query }
    })
  }

  async searchBook(data) {
    const lists = await this.initRequest({
      url: DRAW(`book/fuzzy-search`),
      /*
      ** query : 搜索文字
      ** start : 分页(0开始)
      ** limit : 每页大小
      */
      data
    })
    lists.books = lists.books.map(item=> {
      // TODO: 可能在App端,`unescape`可能不存在
      item.cover = UNCODE(item.cover)
      return item
    })
    return lists
  }

  async bookInfo(id) {
    const DATA = await this.initRequest({
      url: DRAW(`book/${id}`)
    })
    DATA.cover = decode(DATA.cover)
    return DATA
  }

}

export default zhuishu