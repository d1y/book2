const rand = require('./randomInt')

const colors = [
  `red`,
  `orange`,
  `yellow`,
  `olive`,
  `green`,
  `cyan`,
  `blue`,
  `purple`,
  `mauve`,
  `pink`,
  `brown`,
  `grey`,
  `gray`,
  `black`,
  `white`
]

const RGBS = [
  `red`,
  `orange`,
  `green`,
  `blue`,
  `purple`,
  `pink`
]

const randColr = (middle = `text`, flag) => {
  /*
  ** middle => 三种模式 `text` | `bg` | `soak`
  ** flag => [number] [array]
  **      => 给定参数可设置渐变色
  */
  const check = `rand`
  const RGB = middle == `soak`
  const randomInt = (arr)=> arr[rand(0, arr.length)]
  let result
  if (flag == check || !flag) {
    const temp = randomInt(RGB ? RGBS : colors)
    if (RGB) {
      result = `bg-gradual-${temp}`
    } else result = `${middle}-${temp}`
  } else if (typeof flag == `number`) {
    result = []
    let Arrlen = 1
    Arrlen = flag || Arrlen
    for (let i=0; i<Arrlen; i++) {
      result.push(`${middle}-${randomInt(colors)}`)
    }
  }
  if (middle == `text`) {

  } else if (middle == `bg`) {

  }
  return result
}
console.log(randColr(`soak`))

module.exports = randColr