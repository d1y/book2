<template>
  <view>
    <view class="cu-bar bg-cyan search">
      <view class="search-form radius">
        <text class="cuIcon-search"></text>
        <input v-model="search" type="text" placeholder="搜索小说" confirm-type="search" />
        <view class="input-placeholder">
          <text @click="search = ''" v-if="search.length >= 1" class="cuIcon-close close-color text-white radius"></text>
        </view>
      </view>
      <view class="action">
        <text class="cuIcon-close"></text>
        <text>取消</text>
      </view>
    </view>
    <view class="cu-bar bg-white solid-bottom">
      <view class="margin-left-sm action"><text class="cuIcon-title text-orange"></text>  搜索历史</view>
      <view class="action">
        <button class="cu-btn bg-green shadow">清空历史</button>
      </view>
    </view>
    <view class="cu-list grid col-3 no-border">
      <view class="cu-item text-gray">
        王者荣耀
      </view>
      <view class="cu-item text-blue">
        英雄联盟
      </view>
      <view class="cu-item text-green">
        系统
      </view>
      <view class="cu-item text-yellow">
        打工仔
      </view>
    </view>
    <view class="cu-list menu">
      <view v-if="search.length >= 1" class="cu-item text-center" @click="fetchSearchBook">
        <view class="content text-gray">搜索 "<text class="text-black">{{ search }}</text>"</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        search: ``
      }
    },
    methods: {
      fetchSearchBook() {
        const text = this.search
        if (!text || text == '') return
        console.log(`search to: `, text)
      }
    }
  }
</script>

<style>
  .close-color {
    color: #c8c0c0
  }
</style>