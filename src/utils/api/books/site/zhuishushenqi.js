/*
** the api: https://api.zhuishushenju.com
** @tips [ 接口版本 ]
*/
import trans from '../translater'

const $API = `http://api.zhuishushenqi.com`
const DRAW = trans.router($API)

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
}

export default zhuishu