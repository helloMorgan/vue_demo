<template>
	<div id="systemMaintenance">
		<CommonHeader titles="系统维护" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
		<section>
			<div class="systemMaintenance-con">
				<img class="sm-xiuli" src="../images/systemMaintenance-xiuli.png" alt="修理"/>
				<p>系统维护中</p>
				<p>您可以通过微信“<span class="color-orange">分期惠服务号</span>”访问</p>
				<img class="sm-evm" src="../images/systemMaintenance-evm.jpg" alt="二维码"/>
				<input class="btn-color btn-login sm-btn-copy" type="text" readonly="readonly" name="" id="" value="分期惠服务号" />
				<p class="fontSize24">（长按按钮复制，到微信中粘贴搜索公众号即可）</p>
			</div>
			<img class="sm-logo" src="../images/systemMaintenance-logo.png" alt="logo"/>
		</section>
	</div>
</template>

<script>
	import CommonHeader from '../components/Common_header.vue'
	export default{
		components: { CommonHeader },
		data(){
			return{
				
			}
		},
		mounted: function () {
		  this.$nextTick(function () {
		    this.getBodyHeight();
		  })
		},
		methods:{
			getBodyHeight(){
				var bodyheight=$(window).height();
				console.log(bodyheight);
				$(".aboutus-con").css("height",((bodyheight*2/100)-1.18)+"rem");
			},
		},
	}
</script>

<style>
	.systemMaintenance-con{text-align: center;}
	.systemMaintenance-con p{font-size: 0.3rem; color: #333333;}
	.systemMaintenance-con .fontSize24{font-size: 0.24rem;}
	.sm-xiuli{height: 1.8rem;margin:0.6rem auto;}
	.sm-evm{width: 2.1rem;margin: 0.5rem auto;}
	.systemMaintenance-con .sm-btn-copy{margin: auto;border: none;width: 5.8rem;height: 0.88rem;border-radius: 5px;}
	.sm-logo{width: 2.68rem;position: fixed;bottom: 0.48rem;left: 50%;margin-left: -1.34rem;}
</style>