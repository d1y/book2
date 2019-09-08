/*
** create by @d1y 2019-09-08
** @tips 首页启动图, 返回一个数组
** @fix [下载到本地, 不用缓存机制]
*/

const randomInt = require('../toy/randomInt')

/*
** 图床使用的`sm.ms`, 不知道啥时候会挂
*/
const bgs = [
	{
		src: `https://i.loli.net/2019/09/08/2LxTgf6eCzPpRjS.png`,
		bg: '#fff'
	},
	{
		src: `https://i.loli.net/2019/09/08/CgF6m1XKvpMltAc.png`,
		bg: `#fff`
	},
	{
		src: `https://i.loli.net/2019/09/08/bTaZEBOPGUjYNSF.png`,
		bg: `#F8F6EA`
	},
	{
		src: `../../static/girl_book.gif`,
		bg: `#0943AA`
	}
]

export default bgs[randomInt(0, bgs.length)]
// export default bgs[bgs.length-1]