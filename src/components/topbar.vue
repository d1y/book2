<template>
  <view>
    <view class="cu-bar search" :style="{ backgroundColor: bg }">
      <view class="cu-avatar" @click="menuClick">
        <text class="lg" 
         :class="[color == 'white' ? 'text-white' : 'text-black', isBack ? 'cuIcon-back' : 'cuIcon-sort']"></text>
      </view>
      <view class="content text-cut" :class="color == 'white' ? 'text-white' : 'text-black'">
        {{ title }}
      </view>
      <view class="action">
        <slot name="side"></slot>
        <text v-if="!isBack" @click="searchLink" class="cuIcon-search margin-right-sm" :class="color == 'white' ? 'text-white' : 'text-black'"></text>
        <text v-if="!isBack" @click="addMore" class="cuIcon-add" :class="color == 'white' ? 'text-white' : 'text-black'"></text>
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
      },
      onSearchLink: {
        type: String,
        default: `/pages/search/index`
      },
      isBack: {
        type: Boolean,
        default: false
      }
    },
    methods: {
        menuClick() {
          this.$emit('menu')
        },
        searchLink() {
          uni.navigateTo({url: this.onSearchLink})
        },
        addMore() {
          this.$emit('add')
        }
    }
  }
</script>

<style scoped>
.cu-avatar {
  background: none !important;
}
</style>