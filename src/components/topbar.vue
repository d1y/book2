<template>
  <view>
    <view class="cu-bar search" :style="{ backgroundColor: bg }">
      <view class="cu-avatar" @click="menuClick">
        <text class="lg cuIcon-sort" :class="color == 'white' ? 'text-white' : 'text-black'"></text>
      </view>
      <view class="content" :class="color == 'white' ? 'text-white' : 'text-black'">
        {{ title }}
      </view>
      <view class="action">
        <text class="cuIcon-search margin-right-sm" :class="color == 'white' ? 'text-white' : 'text-black'"></text>
        <text class="cuIcon-add" :class="color == 'white' ? 'text-white' : 'text-black'"></text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      bg: {
        type: String,
        default: `#3697DB`
      },
      // 黑色或者白色
      // black - white
      color: {
        type: String,
        default: 'white'
      },
      title: {
        type: String
      }
    },
    methods: {
        menuClick() {
          this.$emit('run', 'hello world')
        }
    }
  }
</script>

<style scoped>
.cu-avatar {
  background: none !important;
}
</style>