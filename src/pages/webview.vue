<template>
  <view class="wrap">
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  onLoad(options) {
    const { title, url } = options
    this.url = url
    uni.setNavigationBarTitle({ title })
  }
}
</script>