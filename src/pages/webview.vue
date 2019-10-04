<template>
  <view class="wrap">
    <web-view src=""></web-view>
  </view>
</template>

<script>
import qs from 'querystring'
console.log(qs)
export default {
  onLoad(options) {
    const { title, url } = options
    uni.setNavigationBarTitle({ title })
  }
}
</script>