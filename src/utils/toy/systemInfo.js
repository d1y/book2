/*
** create by `@d1y` in 2019-09-29
** @tips { 获取系统信息 }
*/

export default ()=> {
  let system = uni.getSystemInfoSync()
  // #ifdef H5
  system.currentBattery = 0
  // #endi
  return system
}