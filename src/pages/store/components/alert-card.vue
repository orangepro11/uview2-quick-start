<template>
	<view class="alert-card">
		<!-- an image from unsplash screen -->
		<u-image width="130rpx" height="130rpx" class="preview" src="@/static/erp/store/alert-preview.png"></u-image>
		<view class="right">
			<view class="title">
				货品名称货品名称
				<text class="status">正常</text>
			</view>
			<view class="price_and_store">
				<view class="price">¥39.9</view>
				<view class="store">
					<text>库存</text>
					<view class="val">12</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.alert-card {
	display: flex;
	flex-direction: row;
	align-items: center;
	background: #fff;
	padding: 15rpx 14rpx;
	margin-bottom: 22rpx;
	border-radius: 10rpx;
	.preview {
		flex-shrink: 0;
	}
	.right {
		flex: 1;
		margin-left: 21rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 130rpx;
		.title {
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			.status {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #1c97ff;
			}
		}
		.price_and_store {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			display: flex;
			justify-content: space-between;
			margin-top: 16rpx;
			.price {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.store {
				display: flex;
				align-items: center;

				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #ff0000;

				.val {
					font-size: 30rpx;
				}
			}
		}
	}
}
</style>