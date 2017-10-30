<template>
	<div id="connonProblems">
		<CommonHeader titles="常见问题" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
		<section>
			<div class="connonProblems-con">
				<h1 class="fontSize30 color-black marginBottom30">常见问题</h1>
				<p>
					1. 如何使用分期惠<br />
					<p class="cp-detail">
						具体流程如下：<br />
					    a.注册成为分期惠用户<br />
					    b.绑定银行卡<br />
					    c.选购分期惠产品<br />
					      方式一：在分期惠中选购心仪产品，分配至最近门店签约；<br />
					      方式二：在合作商户门店签约后使用分期惠选购对应产品下单；<br />
						d.用户资质审核<br />
					    e.完成首付，享用分期产品服务<br />
					    f.每月按时支付剩余账单
					</p>
				</p>
				<p>
					2. 申请条件？<br />
					<p  class="cp-detail">
						a.申请人必须是中国公民（不含港澳台居民），具有完全民事行为能力的自然人；<br />
						b. 在业务开展城市稳定居住或工作。<br />
						c. 年龄在25-65周岁；<br />
						d 无不良信用记录；<br />
					</p>
				</p>
				<p>
					3. 如何获取分期惠额度？<br />
					<p  class="cp-detail">
					    我们会基于您主动提交的信息、您在合作商户上的购买行为、多家征信平台的用户数据进行综合判断。您填写的信息仅作为我们对您信用额度的参考，我们将会对您的个人信息严格保密。
					</p>
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
		methods:{
			
		},
	}
</script>

<style>
	.connonProblems-con{margin:0.3rem 0.3rem 0;background: #FFFFFF;text-align: center;padding: 0.34rem 0.2rem;}
	.connonProblems-con p{text-align: left;font-size: 0.24rem; color: #5e5e5e;}
	.connonProblems-con .cp-detail{margin-left: 0.3rem;}
</style>