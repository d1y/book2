<template>
	<view class="content">
		<view class="DrawerPage" :class="modalName=='view'?'show':''">
			<topbar @menu="menuClick" :title="title"></topbar>
			<menuBar current="书架"></menuBar>
			<view class="text-center">
				<image class="logo" src="/static/logo.png"></image>
				<view class="margin-top-sm text-gray">
					<text class="title">{{ tinyMsg }}</text>
				</view>
			</view>
		</view>
		<view class="DrawerClose" :class="modalName=='view'?'show':''" @tap="modalName = ''">
			<text class="cuIcon-pullright"></text>
		</view>
		<scroll-view scroll-y class="DrawerWindow" :style="{ backgroundImage: `url(${windowBg})` }" :class="modalName=='view'?'show':''">
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<view 
				class="cu-item arrow" 
				v-for="(item,index) in menus" 
				:key="index"
				@click="getCard(item.link)">
					<view class="content">
						<text class="text-grey" :class="[ `cuIcon-${item.icon}` ]"></text>
						<text class="text-grey">{{ item.title }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
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
				title: `我的书架`,
				tinyMsg: `暂无书籍📚\n快去书城看看吧`,
				modalName: ``,
				menus: [
					{
						title: '设置',
						icon: 'settings',
						link: 'settings/index'
					},
					{
						title: '分享给朋友',
						icon: 'friend',
						link: 'xx/xx'
					}
				],
				windowBg: `https://i.loli.net/2019/09/23/hEj5nvgI8WKeiQ3.png`
			}
		},
		onLoad() {
			
		},
		methods: {
			Link(url) {
				uni.navigateTo({url})
			},
			menuClick() {
				this.modalName = `view`
			},
			getCard(url) {
				this.Link(`/pages/${url}`)
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
	/* by weilanwl/colorui */
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}
	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
	}
	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}
	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
		/* 自定义设置背景 */
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}
	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}
	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}
	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}
	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}
	.DrawerPage .nav {
		flex: 1;
	}
	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}
	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}
	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
</style>
