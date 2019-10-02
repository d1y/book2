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
  async getBody(id) {
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
    let prev = false, next = false, chapters_id = 0
    const bars = HTML(`.pager`)[0].children
    const judge = `javascript:alert`, 
          judgePrevText = `已经是第一章了`,
          judgeNextText = `已经是最后一章了`,
          nextText = `下一章`,
          prevText = `上一章`
    for (let i=0; i<bars.length; i++) {
      const current = bars[i]
      if ( current.type === 'tag' && current.children && current.children[0].data != '设置' ) {
        const href = current.attribs.href
        if ( !href.includes(judge) ) {
          if ( href.includes('menu') ) {
            chapters_id = href.split('/menu/')[1].split('.html')[0]
          } else if ( href.includes('chapter') ) {
            const isTextFlag = current.children[0].data
            console.log('text: ', isTextFlag)
            const id = href.split('/chapter/')[1].split('.html')[0]
            if ( isTextFlag == nextText ) {
              next = id
            } else if ( isTextFlag == prevText ) {
              prev = id
            }
          }
        }
      }
    }
    result.prev = prev
    result.next = next
    result.chapters_id = chapters_id
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
    let prev, next
    const pgPrev = HTML(`.pg-prev`)[0]
    const pgNext = HTML(`.pg-next`)[0]
    // TODO: 判断是否为 `a` 标签, 如果是返回 `false`
    prev = pgPrev.name == 'a' && pgPrev.attribs.href
    next = pgNext.name == 'a' && pgNext.attribs.href
    const Middle = str=> {
      const sofa = str.split('/menu/')[1]
      const splitPane = sofa.split('/')
      return {
        id: splitPane[0],
        page: splitPane[1].split('.html')[0].split('_')[1]
      }
    }
    result.lists = LISTS
    result.total = LISTS.length
    result.prev = prev ? Middle(prev) : prev
    result.next = next ? Middle(next) : next
    result.time = Date.now()
    return result
  }
}

export default xs