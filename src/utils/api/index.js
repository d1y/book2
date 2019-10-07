/*
** create by `@d1y`
** 2019-09-11 - 2019-10-05
** @tips 书源列表
** @fix ** 应该返回同样的接口数据 **
*/

import utils from '../toy/storage';

const key = `default_site`
const Site = utils.getSync(key) || 'zhuishushenqi'

// sites
import xs115 from './books/site/115xs'
import zhuishushenqi from './books/site/zhuishushenqi';
// import biquge from './books/site/biquge'

const books = {
  'xs115': xs115,
  'zhuishushenqi': zhuishushenqi
}
export default {
  set: site=> utils.setSync(key, site),
  get: site=> site ? books[site] : books[Site],
  getAll: ()=> books
}