# 创建一个项目

首先创建一个项目,我们使用`vue-cli`来创建一个`uni-app`项目,使我们不用去依赖`hbuildx`

```console

# 全局安装`vue-cli`
(c)npm i -g vue-cli

# 测试是否安装成功
vue --version

# 通过模板创建一个`uni-app`项目
vue create -p dcloudio/uni-preset-vue book2

```

我们通过交互式的选择方式选择一个默认模板, 假如你创建好了,现在进入这个目录运行一下


```console

# 进入这个目录
cd book2

# 运行`h5`
yarn serve

```

现在打开你的浏览器: http://localhost:8080

# 创建一个页面

```console

cd pages

# 创建一个启动图页面
mkdir startup
vi startup/index.vue

```

现在在`page.json`文件里,把刚才创建的启动图页面丢到`paths`数组的最上面
![](https://i.loli.net/2019/09/08/EThLG1uHFCkt79J.png)

我们会发现它会有一些默认的乱七八糟的东西,我们是不需要的,我们可以在`page.json`里进行配置

```jsonc

{
	"pages": [
		{
			"path": "pages/startup/index",
			"style": {
				"navigationStyle": "custom"
			}
		},
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "uni-app"
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8"
	}
}


```

非常好,现在我们就可以在这个页面来进行配置启动图了✨