<template>
  <view class="cu-bar tabbar bg-white diy-bar">
    <view class="action" v-for="item in menus" :key="item.text">
      <view class="cuIcon-cu-image">
        <image :src="current == item.text ? item.hover : item.icon"></image>
        <!-- TODO: 预留 -->
        <!-- <view class="cu-tag badge">99</view> -->
      </view>
      <view :class="current == item.text ? 'active-color' : 'text-gray'">{{ item.text }}</view>
    </view>
  </view>
</template>

<script>

import menuConf from '@/utils/config/menu'
const { list } = menuConf

export default {
  props: {
    current: {
      type: String
    }
  },
  data() {
    return {
      menus: list
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