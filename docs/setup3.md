# 写公共组件

总会有一些公共组件会在页面中多次引用,所以我们可以封装一个组件,首先创建一个`components`, 接下来新建一个组件

```console

mkdir components
cd components
touch menu_bar.vue

```

现在我们分析业务需求

![](https://i.loli.net/2019/09/08/KvyJtrx6ms4SYB5.png)


可以看到,我们会有一个活动的类, 可以修改`icon`和文字`color`
(这里我用了一个很蠢的方法)

```vue

<template>
  <view>
    <view @click="link('xx')">
      <text :class="icon == 'search' ? 'red' : 'gray'">search</text>
    </view>
    <view @click="link('xxx'">
      <text :class="icon == 'home' ? 'red' : 'gray'">home</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    }
  },
  methods: {
    link(e) {
      const url = e
      uni.navigateTo({ url })
    }
  }
}
</script>

```

使用就很简单了

```vue

<template>
  <menuBar icon="home"></menuBar>
</template>

<script>
import menuBar from 'xx/menu_bar'
export default {
  components: {
    menuBar
  }
}
</script>

```

在组件方面我不是太熟悉`vuejs`的一些`骚操作`(2019-09-08)

还有一些业务需求是在`topbar`上,有点复杂,不过和上面的也差不太多,可能需要封装一些方法之类的~