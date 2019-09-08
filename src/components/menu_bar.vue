<template>
  <view class="cu-bar tabbar bg-white diy-bar">
    <view class="action" @click="linkTo(links[0])">
      <view class="cuIcon-cu-image">
        <image :src="icon == 'shelf' ? bookshelf_hover : bookshelf"></image>
        <!-- <view class="cu-tag badge">99</view> -->
      </view>
      <view :class="icon == 'shelf' ? 'active-color' : 'text-gray'">书架</view>
    </view>
    <view class="action" @click="linkTo(links[1])">
      <view class="cuIcon-cu-image">
        <image :src="icon == 'city' ? bookcity_hover : bookcity"></image>
      </view>
      <view :class="icon == 'city' ? 'active-color' : 'text-gray'">书城</view>
    </view>
    <view class="action" @click="linkTo(links[2])">
      <view class="cuIcon-cu-image">
        <image :src="icon == 'board' ? board_hover : board"></image>
      </view>
      <view :class="icon == 'board' ? 'active-color' : 'text-gray'">排行榜</view>
    </view>
    <view class="action" @click="linkTo(links[3])">
      <view class="cuIcon-cu-image">
        <image :src="icon == 'me' ? me_hover : me"></image>
        <!-- <view class="cu-tag badge"></view> -->
      </view>
      <view :class="icon == 'me' ? 'active-color' : 'text-gray'">关于我</view>
    </view>
  </view>
</template>

<script>

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
    icon: {
      type: String
    }
  },
  data() {
    return obj
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