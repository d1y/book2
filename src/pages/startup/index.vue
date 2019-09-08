<template>
  <view>
    <view class="full-bg flex solid-bottom padding justify-center"
    :style="{ backgroundColor: bg }">
      <image :src="src"></image>
    </view>
    <view class="flex solid-bottom padding justify-center"> 
      <text class="text-gray" style="margin-top: 50vh">{{ loadingText }}</text>
    </view>
    <view class="full-text" :style="{ bottom: `${bottom}upx` }">
      <view class="text-xl text-black margin-right-sm">{{ app }}</view>
      <view class="text-sm text-gray">{{ copyright }}</view>
    </view>
  </view>
</template>

<script>

const pack = require('../../../package.json')
import bgConfig from '../../utils/config/startup_bg'
const time = 2000
export default {
  data() {
    return {
      bottom: 100,
      app: pack.name,
      bg: bgConfig.bg,
      src: bgConfig.src,
      copyright: `仅供学习参考`,
      loadingText: 'loading...'
    }
  },
  onLoad() {
    setTimeout(()=> {
      uni.redirectTo({
        url: `/pages/index/index`
      })
    }, time)
  },
  methods: {
    fuck() {
      console.log('fuck you~')
    }
  }
}
</script>

<style lang="css">
  .full-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    /* background: #fff; */
  }
  .full-text{
    position: fixed;
    left: 0;
    width: 100%;
    text-align: center;
    height: 40rpx;
    text-transform: uppercase
  }
  .full-text image {
    width: 100%;
    margin-top: 20upx;
  }
</style>