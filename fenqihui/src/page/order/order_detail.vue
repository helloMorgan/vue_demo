<template>
	<div id="recommendation_destination">
		<CommonHeader titles="订单详情" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
		<section>
			<div class="mui-card box-shadow">
				<img :src="img_URL+productInfoList.imgUrl"/>
				<div class="top-info-con">
					<p class="fontSize30 color-black lineheight30">
						{{chooseProductList.title}}
					</p>
					<p class="fontSize24 color-darkgrey marginTop20 lineheight24">
						（{{chooseProductList.subTitle}}）
					</p>
				</div>
				<ul type="disc">
					<li>
						<p class="color-black fontSize30"><i></i>商户名称<span class="mui-pull-right">{{chooseProductList.sName}}</span>  </p>
					</li>
					<li>
						<p class="color-black fontSize30"><i></i>出发日期<span class="mui-pull-right color-darkgrey">{{chooseProductList.departureDate}}</span>  </p>
					</li>
					<li>
						<p class="color-black fontSize30"><i></i>出发人数<span class="mui-pull-right color-darkgrey">成人x{{chooseProductList.adultNum}} 老人x{{chooseProductList.oldNum}} 儿童x{{chooseProductList.childNum}}</span>  </p>
					</li>
				</ul>
			</div>
			<div class="mui-card marginTop20 box-shadow">
				<div class="card-decoration">
					价格明细
				</div>
				<ul>
					<li>
						<p class="color-black fontSize30"><i></i>总价<span class="mui-pull-right color-darkgrey">￥{{chooseProductList.totalMoney}}</span>  </p>
					</li>
					<li>
						<p class="color-black fontSize30"><i></i>首付<span class="mui-pull-right color-darkgrey">￥{{chooseProductList.firstPrice}}</span>  </p>
					</li>
					<li>
						<p class="color-black fontSize30"><i></i>分期总金额<span class="mui-pull-right color-darkgrey">￥{{chooseProductList.calTotalPrice}}</span>  </p>
					</li>
					<li>
						<p class="color-black fontSize30"><i></i>分期选择<span class="mui-pull-right color-darkgrey">￥{{chooseProductList.oTotalprice}}*{{chooseProductList.oTotalDuration}}期</span>  </p>
					</li>
				</ul>
			</div>
			<div class="mui-checkbox mui-left">
				<p class="fontSize24 color-darkgrey mui-checkbox mui-left">
					<input type="checkbox" name="" id="" value="" checked="checkIsFlag" @click="checkIsFlag=!checkIsFlag,btnClickIfFlag=!btnClickIfFlag"/>
					我已阅读并同意<span class="color-red" @click="goaggreement()">《分期购买服务协议》</span>
				</p>
			</div>
		</section>
		<footer>
			<div class="footer-con mui-row">
				<div class="mui-col-sm-6 mui-col-xs-6 btn-upload-info" :class="{'reBackgrundcc':btnClickIfFlag}" @click="createOrder(1)">
					已签约，上传订单资料
				</div>
				<div class="mui-col-sm-6 mui-col-xs-6  btn-reservations" :class="{'reBackgrundcc':btnClickIfFlag}" @click="createOrder(2)">
					未签约，提交预定
				</div>
			</div>
		</footer>

	</div>
</template>
<script>
	import CommonHeader from '../../components/Common_header.vue'
     import mui from '../../../static/js/mui.min.js'
     mui('body').on('tap','a',function(){document.location.href=this.href;});
	export default{
		components: { CommonHeader },
		data(){
			var query = this.$route.query;
			return{
				checkIsFlag:true,
				oId:"",
				platformId:"1",
				pType:"1",
				productInfoList:[],
				chooseProductList:[],
				btnClickIfFlag:false,
			}
		},
		mounted:function () {
			this.$nextTick(function () {
				this.getProductInfoList();
			});
		},
		methods:{
			btnClick(type){
				var _this=this;
				var h='<p>您的预订已提交，请保持电话畅通</p><p>我们的客服将在两个工作日内与您联系</p>'
				mui.alert(h, ' ', function() {
					if(type==1){
						_this.$router.push({
							path: '/travel_upload_contract',
							query:{
		                        pId: _this.chooseProductList.pId ,
		                        platformId: 1 ,
		                        oId:_this.oId ,
		                        remark:_this.chooseProductList.remark
							}
						});
					}else{
						_this.$router.push({path: '/homepage'});
					}
				});
			},
			goaggreement(){
              this.$router.push({path: '/aggreement',query: {oId: this.oId,platformId:this.platformId,pType:this.pType}});
         	},
		//获取信息
			getProductInfoList(){
				var _this=this;
				var chooseProduct=sessionStorage.getItem("chooseProduct");
				_this.chooseProductList=JSON.parse(chooseProduct);
				console.log(_this.chooseProductList);
				_this.$api.post('product1/searchProductImgList',{
					pIds: _this.chooseProductList.pId,
	                pageSize: 1,
	                pageNum: 1,
	                type: 9
				},r=>{
					_this.productInfoList=r.data[0];
				},err=>{
					mui,toast("获取订单详情图失败");
					if(err.result="4004"){
						_this.$router.push({
		                  path: '/loginIn'
		                })
					}
				});
			},
			//预定请求
			createOrder(type) {
				var _this = this;
				if(_this.checkIsFlag == false) {
					mui.toast('请勾选《分期购买服务协议》');
				} else {
					_this.$api.post('order/createOrder/v1', {
						token: getToken(),
						//商品id
						oPid: _this.chooseProductList.pId,
						//套餐id
						oMealsId: _this.chooseProductList.oMealsId,
						//老人购票数
						oTicketOldNum: _this.chooseProductList.oldNum,
						//成人购票数
						oTicketYoungNum: _this.chooseProductList.adultNum,
						//儿童购票数
						oTicketChildrenNum: _this.chooseProductList.childNum,
						//首付价格
						oTotalFirstPrice: _this.chooseProductList.firstPrice,
						//总分期金额 不含手续费
						oTotalPrice: _this.chooseProductList.calTotalPrice,
						// contractNum: code,
						//总分期数
						oTotalDuration: _this.chooseProductList.oTotalDuration,
						//每期价格
						oDurationMoney: _this.chooseProductList.oTotalprice,
						//含手续费
						totalMoney: _this.chooseProductList.totalMoney,
						//总单房差
						oTotalDfcMoney: _this.chooseProductList.oTotalDfcMoney,
						//总手续费
						oTotalSxfMoney: _this.chooseProductList.oTotalSxfMoney,
						//单房差数量
						dfcNum: _this.chooseProductList.dfcNum,
						contractNum: "",
						oRemark: _this.chooseProductList.remark
					}, r => {
						console.log(r);
						_this.oId = r.oId;
						_this.btnClick(type);
					}, err => {
						mui,
						toast("订单创建失败");
						if(err.result = "4004") {
							_this.$router.push({
								path: '/loginIn'
							})
						}
					});
				}
			},
			//methods end
		}
		
	}
</script>

<style>
	#recommendation_destination .mui-card{width: 6.9rem;margin:0.3rem auto 0;}
	#recommendation_destination .mui-card>img{width: 100%;height: 3rem;display: block;}
	#recommendation_destination .top-info-con{margin: 0 0.3rem ;padding:  0.28rem 0 0.3rem; border-bottom: 1px solid #ededed;}
	#recommendation_destination .mui-card ul{margin: 0 0.3rem ;padding: 0.2rem 0 0.1rem;}
	#recommendation_destination li i{width: 0.12rem;height:  0.12rem;border-radius: 50%;background: #EDEDED;display: inline-block; margin:4px;}
	#recommendation_destination li{margin-bottom: 0.2rem;}
	.card-decoration{width: 1.5rem;height: 0.5rem;border-bottom-right-radius: 5px;background: #30cfb6;color: #FFFFFF;text-align: center;line-height: 0.5rem;}
	#recommendation_destination .marginTop20{margin-top: 0.2rem!important;}
	.btn-upload-info,#recommendation_destination .btn-reservations{color: #FFFFFF;font-size: 0.3rem;height: 100%;line-height: 0.98rem;background: #f42d2d;text-align: center;}
	#recommendation_destination .btn-reservations{background:#eb661e;}
	#recommendation_destination .mui-checkbox input[type=checkbox]:checked:before{color: #30cfb6;font-size: 0.24rem;content: '\e443'; }
	#recommendation_destination .mui-checkbox input[type=checkbox]:before {content: '\e413';font-size: 0.24rem;}
	#recommendation_destination .mui-checkbox input[type=checkbox]{top:-0.09rem;left: 0rem!important;    width:0.24rem;height:0.24rem;}
	#recommendation_destination .mui-checkbox p{margin: 0.1rem 0.3rem;padding: 0 0.3rem;}
	.reBackgrundcc{background:#888888!important;}
</style>
