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
    bg: '#fff5f8',
    bgImg: '',
    color: '#7f333d'
  },
  {
    title: '骚黄',
    bg: '#f2e8c8',
    bgImg: '',
    color: '#333'
  },
  {
    title: '性冷淡',
    bg: '#dfecf0',
    bgImg: '',
    color: '#333'
  },
  {
    title: '原谅色',
    bg: '#e3efe3',
    bgImg: '',
    color: '#333'
  },
  {
    title: '深沉',
    bg: '#e0e0e0',
    bgImg: '',
    color: '#333'
  },
  {
    title: '神仙',
    bg: 'rgb(0, 128, 0)',
    bgImg: '',
    color: 'rgb(70, 217, 37)'
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