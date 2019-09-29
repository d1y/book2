/*
** create by `@d1y` in 2019-09-29
** @tips { 格式化日期选项 }
*/

export default {
  time: ()=> Date.now(),
  date() {
    const XD = new Date()
    let Hours = XD.getHours()
    let Minutes = XD.getMinutes()
    const date = { Hours, Minutes }
    Hours =  Hours < 10 ? `0${Hours}` : Hours
    Minutes = Minutes < 10 ? `0${Minutes}` : Minutes
    return {
      text: `${Hours}:${Minutes}`,
      date
    }
  }
}