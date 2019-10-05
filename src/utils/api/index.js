/*
** create by `@d1y`
** 2019-09-11 - 2019-10-05
** @tips 书源列表
** @fix ** 应该返回同样的接口数据 **
*/

import utils from '../toy/storage';

const key = `default_site`
const site = utils.getSync(key) || 'xs115'

// sites
import xs115 from './books/site/115xs'
import biquge from './books/site/biquge'
import zhuishushenqi from './books/site/zhuishushenqi';

export default {
  site,
  books: {
    'xs115': xs115,
    'biquge': biquge,
    'zhuishushenqi': zhuishushenqi
  }
}