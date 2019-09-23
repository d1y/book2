/*
** create by @diy in 2019-09-23
** @tips 下方菜单的一些配置
** TODO: 配置文件
*/
const path = file=> `/static/menu/${file}.png`
const hover = str=> path(str).split('.png')[0]+`_hover`+`.png`
export default {
  list: [
    {
      link: `/pages/index/index`,
      text: `书架`,
      icon: path(`bookshelf`),
      hover: hover(`bookshelf`)
    },
    {
      link: `/page/xx/xx`,
      text: `书城`,
      icon: path(`bookcity`),
      hover: hover(`bookcity`)
    },
    {
      link: `/page/xx/xx`,
      text: `排行榜`,
      icon: path(`board`)
    },
    {
      link: `page/xx/xxx`,
      text: `关于我`,
      icon: path(`me`)
    }
  ]
}