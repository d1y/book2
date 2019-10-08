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
    const data = await this.initRequest({
      url: DRAW(`book/search-hotwords`)
    })
    return data.searchHotWords.map(item=> item.word)
  }

  async hotWords() {
    const data = await this.initRequest({
      url: DRAW(`book/hot-word`)
    })
    return data.newHotWords.map(item=> ({
      id: item.book,
      title: item.word
    }))
  }

  async searchAutoComplete(query = `斗破苍穹`) {
    const data = await this.initRequest({
      url: DRAW(`book/auto-complete`),
      data: { query }
    })
    return data.keywords
  }

  /*
  ** query : 搜索文字
  ** start : 分页(0开始)
  ** limit : 每页大小
  */
  async searchBook(data) {
    const lists = await this.initRequest({
      url: DRAW(`book/fuzzy-search`),
      data
    })
    lists.books = lists.books.map(item=> {
      // TODO: 可能在App端,`unescape`可能不存在
      item.cover = decode(item.cover)
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

  async getChapters(id) {
    const data = await this.initRequest({
      url: DRAW(`mix-atoc/${id}?view=chapters`)
    })
    return data.mixToc
  }

}

export default {
  logo: '',
  title: '追书神器-api',
  site: 'http://api.zhuishushenqi.com',
  classes: zhuishu
}