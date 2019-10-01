/*
** create by `@d1y` in 2019-09-30
** @tips { 阅读器主题 }
*/
import utils from '../toy/storage'
const key = 'reader_theme_index'
const fontSizeKey = 'read_font_size'
const themes = [
  {
    title: '高冷',
    bg: '#fff',
    bgImg: '',
    color: '#333'
  },
  {
    title: '少女',
    bg: '#e03997',
    bgImg: '',
    color: '#fff'
  }
]

export default {
  /* @return <Promise> */
  async get() {
    const index = (await utils.get(key)) || 0
    const fontSize = (await utils.get(fontSizeKey)) || 50
    return {
      all: themes,
      index,
      fontSize
    }
  },
  /* @return <Promise> */
  set: index=> utils.set(key, index),
  setFontSize: value=> utils.set(fontSizeKey, value)
}