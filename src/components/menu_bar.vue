<template>
  <view class="cu-bar tabbar bg-white diy-bar">
    <view class="action"
    v-for="item in menus"
    :key="item.text">
    {{ item.icon }}
      <view class="cuIcon-cu-image">
        <image :src="current == item.text ? item.hover : item.icon"></image>
        <view class="cu-tag badge">99</view>
      </view>
      <view :class="current == item.text ? 'active-color' : 'text-gray'">{{ item.text }}</view>
    </view>
  </view>
</template>

<script>

import menuConf from '@/utils/config/menu'
const hover = str=> str.split('.png')[0]+`_hover`+`.png`
const path = `/static/menu`
const bookshelf = `${path}/bookshelf.png`
const bookcity = `${path}/bookcity.png`
const board = `${path}/board.png`
const me = `${path}/me.png`

const links = [
  `/pages/index/index`,
  `/pages/xxx/xxx`,
  '/pages/xxx/xxxxx',
  '/pages/xx/xxx'
]

const obj = {
  bookshelf,
  bookshelf_hover: hover(bookshelf),
  bookcity,
  bookcity_hover: hover(bookcity),
  board,
  board_hover: hover(board),
  me,
  me_hover: hover(me),
  links
}

export default {
  props: {
    current: {
      type: String
    }
  },
  data() {
    return {
      menus: menuConf
    }
  },
  methods: {
    linkTo(e) {
      const url = e
      console.log(url)
      uni.navigateTo({ url })
    }
  }
}
</script>

<style scoped>
  .diy-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100upx;
  }
  .active-color {
    color: #3697DB
  }
</style>