<template>
	<div id="travel-product-choose">
		<CommonHeader :titles="urlTitleName" :imgChangeFlags="true" :backFlags="false"></CommonHeader>

		<section>
			<!--有产品-->
			<div class="mui-card box-shadow" v-for="item in productList" v-show="!productNullFlag">
				<!--<router-link :to="'/travel_detail_info/' + item.pId">-->
					<div class="product-imgcon" @click="gopage(item.pId)">
						<img :src="img_URL+item.imgUrl"/>
						<span class="title-productsort">{{item.pLaId.split(',')[0]}}</span>
						<div class="title-money">
							<p class="color-red">
								<span>￥</span>{{item.payMonthly.toFixed(0)}}<span>起</span>
							</p>
						</div>
					</div>
					<p class="fontSize30 color-black lineheight30 marginBottom20 marginTop20">{{item.pTitle}}</p>
					<p class="fontSize24 color-darkgrey lineheight24 marginBottom32">{{item.pTitleSub}}</p>
				<!--</router-link>-->
			</div>
			<!--无产品-->
			<div class="productNull" v-show="productNullFlag">
				<img src="../../images/without_result.png"/>
				<p class="fontSize30 color-darkgrey">产品暂未上架，敬请期待~</p>
			</div>
		</section>


	</div>
</template>

<script>
	import CommonHeader from '../../components/Common_header.vue'
	export default{
		components: { CommonHeader },
		data(){
			var query=JSON.parse(JSON.stringify(this.$route.query));
			return{
				productList:[],
				productNullFlag:false,
				urlTitleName:query.laName,
				urlId:query.lbId,
				urlType:query.Type,
			}
		},
		mounted: function () {
		  this.$nextTick(function () {
			  this.getProductList();
		  })
		},
		methods:{
			getProductList(){
	            var e = {isHot: 1, queryType: this.urlType, id: this.urlId, pageSize:1};
	            this.$api.post('product1/searchProductList', e, r => {
	            	console.log(r);
	            	if (r.totalCount>0) {
	            		this.productList=r.data
	            	} else{
	            		this.productNullFlag=true;
	            	}
			      }, r => {
			      	console.log("请求失败")
			    })
			},
			gopage(pid){
		  		this.$router.push({path: '/travel_detail_info',query: {pId: pid}});
		  	}
		},
	}
</script>

<style>
.mui-card{margin: 0.2rem 0.3rem 0.3rem;}
.product-imgcon{position: relative;width: 100%;height: 3rem;overflow: hidden;}
.product-imgcon>img{width: 100%;height: 100%; display: block;}
.title-productsort{position: absolute;left: 0;top: 0;padding: 0.09rem 0.2rem 0.15rem 0.18rem;background: #30CFB6;font-size: 0.28rem;color: #FFFFFF;border-bottom-right-radius: 10px;line-height: 0.28rem;}
.title-money{position: absolute;top: 0.74rem;right: 0;width: 1.5rem;height: 0.98rem;border-radius: 5px;background:url(../../images/travel/index_p_07.png);background-size: 100% 100%;}
.title-money p{position: absolute; bottom: 0;width: 100%;text-align: center;font-size: 0.35rem;font-weight: 600;}
.title-money p span{color: #F42D2D;font-size: 0.17rem;}
.mui-card>p{padding: 0 0.3rem;}
.productNull img{width: 2.4rem;margin: 1.6rem auto;display: block;}
.productNull p{text-align: center;}
</style>
