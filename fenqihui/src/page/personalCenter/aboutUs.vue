<template>
	<div id="aboutUs">
		<CommonHeader titles="关于我们" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
		<section>
			<div class="aboutus-con">
				<h1 class="fontSize30 color-black marginBottom30">分期惠简介</h1>
				<p>
					分期惠是征和控股旗下英泰福信息（北京）有限公司推出的场景化互联网消费金融服务产品，旨在解决新人婚礼及家庭出境旅游的短期资金压力，同时分期惠切实立足场景化，将服务嵌入婚礼及旅游链条，在提供金融服务的同时从源头筛选、监控服务质量，不仅为客户解决资金负担，更为客户提供优质、高效便捷的互联网消费金融服务。
				</p>
			</div>
		</section>
	</div>
</template>

<script>
	import CommonHeader from '../../components/Common_header.vue'
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
			}
		},
	}
</script>

<style>
	.aboutus-con{margin:0.3rem 0.3rem 0;background: #FFFFFF;text-align: center;padding: 0.34rem 0.2rem;}
	.aboutus-con p{text-indent: 0.5rem;text-align: left;font-size: 0.24rem; color: #5e5e5e;}
</style>