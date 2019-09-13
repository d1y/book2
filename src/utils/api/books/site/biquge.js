/*
** site: https://www.biquge.cm
*/

const book = require('../translater')

class biquge extends book { }

const nw = new biquge({
  url: `https://www.biquge.cm`
})

nw.tags(true)

module.exports = biquge