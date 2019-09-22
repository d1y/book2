<template>
  <view class="cf padding-sm">
    <view class="fl">
      <view class="cu-avatar radius lg shadow-warp"
      :style="{ backgroundImage: `url(${data.cover})` }"></view>
    </view>
    <view class="fl margin-left-sm">
      <view class="title text-cyan">{{ data.title }}</view>
      <view class="text-sm text-black">{{ data.lastChapter }}</view>
      <view class="text-gray text-xs"> <text class="cuIcon-people padding-right-xs"></text> {{ data.author }}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      img: `https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg`
    }
  },
  props: {
    data: {
      type: Object
    }
  }
}
</script>


<style scoped>

</style>