/*
** crete by `@d1y`
** site: http://m.115xs.com/
*/

import trans from '../translater'

const $API = `http://m.115xs.com`
const DRAW = trans.router($API)

class xs extends trans {

  site = 'xs115'

  /*
  ** query : 搜索文字
  ** start : 分页(0开始)
  ** limit : 每页大小
  */
  async searchBook(data) {
    // TODO: 搜索`302`跳转会错误,需要 try{}
    // TODO: 分页
    const context = await this.initRequest({
      url: DRAW(`e/search`),
      data: {
        keyboard: data.query,
        classid: 0,
        searchget: 1,
        show: 'title,author'
      }
    })
    const $ = await this._toHTML(context, false)
    const result = {}

    // 搜索长度
    let length = $('.caption').text()
    length = length.replace(/[^0-9]/ig,"")
    length = Number.parseInt(length)
    result.total = length
    const list = []
    const bookLists = $('#sitebox dl')
    try {
      for (let i=0; i<bookLists.length; i++) {
        const ele = bookLists[i]
        let id = ele.children[1].children[0].attribs.href
        id = id.split('/book/')[1].split('.html')[0]
        let cover = ele.children[1].children[0].children[0].attribs.src
        let subInfo = ele.children[3].children[0]
        let tag = subInfo.children[0].children[0].data
        let title = subInfo.children[1].children[0].data
        let author = ele.children[5].children[0].data
        let state = ele.children[5].children[1].children[0].data
        let desc = ele.children[7].children[0].children[0].data
        // 然而这里的写法并不是这样的
        let lastChapter = ''
        let site = this.site
        list.push({
          id,
          cover,
          tag,
          title,
          author,
          state,
          desc,
          lastChapter,
          site
        })
      }
    } catch(err) {
      throw new Error(err)
    }
    result.books = list
    console.log(`result: `, result)
    return result
  }

  /*
  ** @return <Promise>
  */
  async hotWords() {
    const data = await this.initRequest({
      url: DRAW(`api/hotsearch`)
    })
    return data.data.map(item=> ({
      id: item.titleurl.split('/book/')[1].split('.html')[0],
      title: item.title,
      site: this.site
    }))
  }

  /*
  ** @param <string> - id (书籍`id`)
  ** @return <Promise>
  */
  async getBody(id) {
    const result = {}
    const url = DRAW(`chapter/${ id }.html`)
    const HTML = await this._toHTML(url)
    result.id = id
    result.raw_url = url
    result.title = HTML("#bookname").text()
    result.author = HTML(`#author`).text()
    result.chapter_name = HTML(`.headline`).text()
    let rawContent = HTML(`#content`)
    result.body = rawContent.html()
    result.word_length = result.body.trim().length
    let prev = false, next = false, chapters_id = 0 // 目录`id`
    const bars = HTML(`.pager`)[0].children
    const judge = `javascript:alert`, nextText = `下一章`,prevText = `上一章`
    for (let i=0; i<bars.length; i++) {
      const current = bars[i]
      if ( current.type === 'tag' && current.children && current.children[0].data != '设置' ) {
        const href = current.attribs.href
        if ( !href.includes(judge) ) {
          if ( href.includes('menu') ) {
            chapters_id = href.split('/menu/')[1].split('.html')[0]
          } else if ( href.includes('chapter') ) {
            const isTextFlag = current.children[0].data
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
    try {
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
    } catch(err) {
      console.error(err)
      prev = false
      next = false
    }
    
    result.lists = LISTS
    result.total = LISTS.length
    result.prev = prev ? Middle(prev) : prev
    result.next = next ? Middle(next) : next
    result.time = Date.now()
    return result
  }
}

export default {
  logo: 'http://www.115xs.com/style/images/logo.png',
  title: '115小说网',
  site: 'http://www.115xs.com',
  classes: xs,
}