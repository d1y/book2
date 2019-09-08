<template>
  <view>
    <button @tap="fuck">{{ text }}</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      text: `hello world`
    }
  },
  methods: {
    fuck() {
      console.log('fuck you~')
    }
  }
}
</script>