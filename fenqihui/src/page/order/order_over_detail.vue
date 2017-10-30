<template>
	<div id="orderOverDetail">
		<CommonHeader titles="订单详情" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
		<section>
			<div class="box-shadow ood-con">
				<div class="swiper-container" id="oodSwiper">
				     <div class="swiper-wrapper">
				        <div class="swiper-slide" v-for="item in imgLunbo">
				        	<img :src="img_URL+item"/>
				        </div>
				    </div>
				    <div class="swiper-pagination"></div>
				</div>
				<div class="ood-top-info marginTop30">
					<p class="fontSize30 color-black lineheight30">
						{{product.pTitle}}
					</p>
					<p class="fontSize24 color-darkgrey marginTop20 lineheight24">
						（{{product.titileSub}}）
					</p>
				</div>
				<ul class="marginTop30">
					<li>
						<p class="color-black fontSize24 lineheight24 marginBottom20"><i></i>分期惠游：<span class="color-darkgrey">￥{{productOrder.oTotalFirstPrice}}+￥{{productOrder.durationMoney}}*{{productOrder.totalDuration}}期</span>  </p>
					</li>
					<li>
						<p class="color-black fontSize24 lineheight24 marginBottom20"><i></i>出发日期：<span class="color-darkgrey">{{productMeals.mDate}}</span>  </p>
					</li>
					<li>
						<p class="color-black fontSize24 lineheight24"><i></i>出发人数：<span class="color-darkgrey">成人x{{productOrder.ticketYoungNum}}、老人x{{productOrder.ticketOldNum}}、儿童x{{productOrder.ticketChildrenNum}}</span>  </p>
					</li>
				</ul>
				<div class="btn-color btn-see-productDetaile" @click="chekProductInfo(product.pId)">查看产品详情</div>
			</div>
			<div class="ood-nav-list marginTop20 box-shadow mui-table-view-cell" v-show="agreementFlag" @click="chekHetong(product.pId,productOrder.oId)">
				<div class="mui-navigate-right fontSize30 color-black">
						查看服务协议
				</div>
			</div>
			<div class="ood-nav-list marginTop20 box-shadow mui-table-view-cell" @click="chekContract(productOrder.conId,productOrder.oId)" v-show="orderDetailFlag">
				<div class="mui-navigate-right fontSize30 color-black">
						查看订单资料
				</div>
			</div>
			<div class="ood-nav-list marginTop20 box-shadow mui-table-view-cell" @click="chekPayDetail(productOrder.oId,businessType)" v-show="payDetailFlag">
				<div class="mui-navigate-right fontSize30 color-black">
						查看付款详情
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	import CommonHeader from '../../components/Common_header.vue'
     import mui from '../../../static/js/mui.min.js'
     mui('body').on('tap','a',function(){document.location.href=this.href;});
	export default{
		components: { CommonHeader },
		data(){
			var query=this.$route.query;
			return{
				oId:query.oId,
    			isQianyue:query.isQianyue,
    			processStatus:query.processStatus,
    			agreementFlag:false,//协议显示标志
    			payDetailFlag:false,//付款详情显示标志
    			orderDetailFlag:false,//订单资料显示标志
    			token: getToken(),
    			product:[],
    			productOrder:[],
    			productMeals:[],
    			imgLunbo:[],
    			submitCon:false,//风控
    			businessType:query.businessType,//产品类别：旅游1/婚庆2
			}
		},
		
		mounted: function () {
		  this.$nextTick(function () {
			  this.getProductInfo();
		  })
		},
		methods:{
			//获取产品信息
			getProductInfo(){
				var _this=this;
				//判断分期服务协议显示
				 var arr=[204,203,205,502,501,201,503,202,601,602,504,305];
			    for(var i=0;i<arr.length;i++){
			    	if(arr.indexOf(_this.processStatus)==-1){
			             _this.agreementFlag=false;
			        }else{
			             _this.agreementFlag=true;
			        }
			    };
				if(_this.token){
					_this.$api.post('order/findOrderInfo/v1',{
						'token': _this.token,
                		'oId':_this.oId
					},r=>{
						console.log(r)
						_this.product=r.product;
						_this.productOrder=r.order;
						_this.productMeals=r.meals;
						_this.imgLunbo=r.product.lunboUrl.split(',');
						_this.submitCon=_this.statusContract(r.order.processStatus);
						var oodSwiper = new Swiper('#oodSwiper',{
							autoplay : 5000,
							loop: true,
							pagination : '.swiper-pagination',
						});
						var  processStatus = getAsInt(r.order.processStatus);
						if(getOrderElementIsAllow('assetAllowStatus',processStatus)){
							_this.orderDetailFlag=true;
		                }

		                if(getOrderElementIsAllow('payPlanAllowStatus',processStatus)){
		                    _this.payDetailFlag=false;
		                }
					},err=>{
						console.log(err);
						if (err.result="4004") {
								_this.$router.push({
				                  path: '/loginIn'
				                })
							} 
					})
				}else{
					_this.$router.push({
	                  path: '/loginIn'
	                })
				};
			},
			//查看分期服务协议
	        chekHetong(pId,oId) {
	        	var _this=this;
	        	_this.$router.push({
	        		path:'/aggreement',
	        		query:{
	        			'pId':pId,
	        			'oId':oId,
	        			'flag': 1,
	        			'isQianyue': _this.isQianyue,
	        			'processStatus': _this.processStatus,
	        			'platformId':_this.businessType,
	        			'ptype':"1"
	        		}
	        	});
	        },
			//查看产品详情
			chekProductInfo(pId){
				var _this=this;
	        	_this.$router.push({
	        		path:'/travel_detail_info',
	        		query:{
	        			'pId':pId,
	        			'ps': 'pi',
	        			'stu':1
	        		}
	        	});
			},
			//查看订单资料
			chekContract(conId,oId){
				var _this=this;
	        	_this.$router.push({
	        		path:'/travel_view_contract',
	        		query:{
	        			'conId':conId,
	        			'isQianyue': _this.isQianyue,
	        			'processStatus': _this.processStatus,
	        			'oId':oId,
	        			'platformId':_this.businessType,
	        		}
	        	});
			},
			chekPayDetail(oId,businessType){
				var _this=this;
	        	_this.$router.push({
	        		path:'/orderPaymentAdvance',
	        		query:{
	        			'oId':oId,
	        			'st':1,
	        			'businessType':businessType
	        		}
	        	});
			},
			//    订单风控审核成功之前的状态
	        statusContract(code) {
	            switch (code) {
	                case '101':
	                    return true;
	                    break;
	                case '102':
	                    return true;
	                    break;
	                case '107':
	                    return true;
	                    break;
	                case '108':
	                    return true;
	                    break;
	                case '110':
	                    return true;
	                    break;
	                case '111':
	                    return true;
	                    break;
	                case '303':
	                    return true;
	                    break;
	                case '304':
	                    return true;
	                    break;
	                case '305':
	                    return true;
	                    break;
	                case '306':
	                    return true;
	                    break;
	                default :
	                    return false;
	                    break;
	            }
	        },
			//methods end
		}
		
	}
</script>

<style>
	.ood-con{position: relative; width: 100%;padding: 0 0.3rem;background: #FFFFFF;}
	#oodSwiper img{width: 100%;height: 3rem;display: block;}
	.ood-con>ul{padding: 0 0 0.3rem 0;}
	.ood-con .btn-see-productDetaile{position: absolute;right: 0;bottom: 0.3rem;display: block;width: 1.96rem;height: 0.64rem;font-size: 0.24rem;line-height: 0.64rem;border-bottom-left-radius: 5px;border-top-left-radius: 5px;}
	#orderOverDetail .mui-table-view-cell{background: #FFFFFF;}
	#orderOverDetail .mui-table-view-cell:after{background-color: inherit;}
</style>
