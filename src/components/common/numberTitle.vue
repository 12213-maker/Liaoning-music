<template>
	<div class="number-title">
		<div class="num">{{num}}</div>
		<div class="text">{{text}}</div>
	</div>
</template>
<script>
	export default {
		name:"NumberTitle",
		props: {
			num:String,
			text:String
		},
		mounted(){}
	};
</script>
<style scoped lang="scss">
	.number-title {
		width: 328px;
		position: relative;

		.num {
			line-height: 62px;
			font-size:56px;
			font-family: 'syhtBold';
			font-weight: bold;
			color: #FCD0A4;
			position: relative;

			&::after {
				content: '';
				width: 328px;
				height: 8px;
				display: inline-block;
				background: linear-gradient(90deg, rgb(255, 165, 31) 0%, rgba(255, 235, 204,0.5) 100%);
				position: absolute;
				left:0px;
				bottom: 2px;
			};
		}

		.text {
			width: auto;
			font-family: 'syhtMedium';
			font-weight: 400;
			font-style: normal;
			font-size: 30px;
			line-height: 43px;
			position: absolute;
			color:#262626;
			left:0px;
			bottom: 2px;
		}
	}

</style>


