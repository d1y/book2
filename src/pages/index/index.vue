<template>
	<view class="content">
		<topbar :title="title" @run="fuck"></topbar>
		<menuBar icon="shelf"></menuBar>
		<view class="text-center">
			<image class="logo" src="/static/logo.png"></image>
			<view class="margin-top-sm text-gray">
				<text class="title">{{ tinyMsg }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import menuBar from '../../components/menu_bar'
	import topbar from '../../components/topbar'
	export default {
		components: {
			menuBar,
			topbar
		},
		data() {
			return {
				title: '我的书架',
				tinyMsg: '暂无书籍📚\n快去书城看看吧'
			}
		},
		onLoad() {
			
		},
		methods: {
			fuck(e) {
				console.log(`vuejs 组件之间传递`)
			}
		}
	}
</script>

<style>
	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}
</style>
