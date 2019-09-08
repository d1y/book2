# 样式表玩法

**手写`css`是不可能的啦,这辈子都不可能的啦**

我们可以考虑使用第三方样式库,就像当年`bootstrap`一套龙一样.

这里的玩法我就不介绍了,大家自行上`github`搜索`uni-app` | `css` 这些关键字就可以了

我使用了的是[weilanwl/ColorUI](https://github.com/weilanwl/ColorUI)

```console

git clone https://github.com/weilanwl/ColorUI.git ~/colorui
mkdir src/common
cp -rf ~/colorui/Colorui-UniApp/colorui ./src/common/colorui

```

(我推荐大家使用官方的`uni-ui`, 很漂亮)

现在我们需要把样式库挂载到全局, 编辑`App.vue`文件,在`style`块

```css

@import url('./common/colorui/main.css');

```

这样我们就可以全局使用了, 非常好, 现在我们可以来写逻辑了