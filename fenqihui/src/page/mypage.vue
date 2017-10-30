<template>
  <div id="mypage">
    <CommonHeader titles="我的" :imgChangeFlags="true" :backFlags="true"></CommonHeader>
      
     <section>
        <div>
        	<div class="my-header-con">
        		<div class="my-header-img">
        			<!--<router-link :to="/personalCenter">
			        	<p class="my-personal-center">个人中心 <span class="mui-icon mui-icon-arrowright fontSize36 color-white "></span></p>
			        </router-link>-->
        			<router-link to="/personalCenter"  class="mui-row">
	        			<div class="mui-col-sm-9 mui-col-xs-9">
	        				<img class="my-headerImg" src="../images/order/headerImg.png"/>
		        		<!--</div>
		        		<div class="mui-col-sm-6 mui-col-xs-6 my-name">-->
		        			<div class="my-name-con">
		        				<p class="fontSize30 color-white">{{mNickName}}</p>
		        				<img class="my-certified" src="../images/order/certified.png"/>
		        			</div>
		        		</div>
		        		<div class="mui-col-sm-3 mui-col-xs-3">
		        			<p class="my-personal-center">个人中心 <span class="mui-icon mui-icon-arrowright fontSize36 color-white "></span></p>
		        		</div>
	        		</router-link>
        		</div>
        		<div class="swiper-container" id="my-swiper2">
						     <div class="swiper-wrapper">
						        <div class="swiper-slide" :class="{'active-nav':slideshowFlag==0}">
						        	<span class='iconfont fontSize36'>&#xe602;</span>
						        	<p>我的订单</p>
						        </div>
						        <div class="swiper-slide" :class="{'active-nav':slideshowFlag==1}">
						        	<span class='iconfont fontSize36'>&#xe62d;</span>
						        	<p>月付账单</p>
						        </div>
						        <div class="swiper-slide" :class="{'active-nav':slideshowFlag==2}" @click="getHaveList(3)">
						        	<span class='iconfont fontSize36'>&#xe600;</span>
						        	<p>可使用</p>
						        </div>
						        <div class="swiper-slide" :class="{'active-nav':slideshowFlag==3}" @click="getCollectList()">
						        	<span class='iconfont fontSize36'>&#xe683;</span>
						        	<p>收藏</p>
						        </div>
						    </div>
						</div>
        		
        	</div>
					<div class="swiper-container marginTop30" id="my-swiper3">
					     <!--<div class="swiper-wrapper" >-->
					        <div class="swiper-slide" v-show="slideshowFlag==0">
					        	<div class="mui-card" v-for="item in myOrderList">
					        		<!--旅游-->
					        		<div class="my-lvyu" v-if="item.businessTypeDesc=='旅游'">
					        			<div class="my-order-list-title">
						        			<img src="../images/order/travel_arrow.png"/>
						        			<span class="my-title-small mui-ellipsis">
						        				{{item.order.processStatusMsg}}
						        			</span>
						        		</div>
						        		<div class="mui-row my-order-info">
						        			<div class="mui-col-xs-5 mui-col-sm-5">
						        				<img :src="img_URL+item.product.imgUrl"/>
						        			</div>
						        			<div class="mui-col-xs-7 mui-col-sm-7">
						        				<p class="fontSize30 color-black">
						        					{{item.product.pTitle}}
						        				</p>
						        				<dl class="fontSize24 color-black">
						        					<dd>分期选择：<span class="color-darkgrey">¥{{item.order.durationMoney}}x{{item.order.totalDuration}}期</span></dd>
						        					<dd>出发日期：<span class="color-darkgrey">{{item.meals.mDate}}</span></dd>
						        					<dd>出发人数：<span class="color-darkgrey">成人{{item.order.ticketYoungNum}}、老人{{item.order.ticketOldNum}}、儿童{{item.order.ticketChildrenNum}}</span></dd>
						        				</dl>
						        			</div>
						        		</div>
						        		<div class="my-order-list-footer">
						        			<span @click="lychekDetailAll(item.order.oId,item.order.processStatus,item.order.conId,item.businessType)">查看详情</span>
						        			<span class="my-upload-contract" v-if="item.order.processStatus=='303'||item.order.processStatus=='108'" @click="lyclikAddContract(item.order.conId ,'0',item.order.processStatus,item.order.oId,'1')" >补充资料</span>
						        			<span v-if="item.order.processStatus=='104'" @click="lyclikGoPay(item.order.oId)">去支付</span>
						        		</div>
					        		</div><!--旅游end-->
					        		<!--婚庆-->
					        		<div class="my-hunqing"v-if="item.businessTypeDesc=='婚庆'">
					        			<div class="my-order-list-title">
						        			<img src="../images/order/wedding_arrow.png"/>
						        			<span class="my-title-small mui-ellipsis">
						        				{{item.orderStatusDesc}}
						        			</span>
						        		</div>
						        		<div class="mui-row my-order-info">
						        			<div class="mui-col-xs-5 mui-col-sm-5">
						        				<img src="../images/productomg.jpg"/>
						        			</div>
						        			<div class="mui-col-xs-7 mui-col-sm-7">
						        				<p class="fontSize30 color-black">
						        					{{item.pTitle}}
						        				</p>
						        				<dl class="fontSize24 color-black">
						        					<dd>总价：<span class="color-darkgrey">¥{{item.productPrice.toFixed(2)}}</span></dd>
						        					<dd>订单金额：<span class="color-darkgrey">¥{{item.totalDurationPrice.toFixed(2)}}</span></dd>
						        					<dd>分期选择：<span class="color-darkgrey">¥{{item.durationMoney.toFixed(2)}}x{{item.duration}}期</span></dd>
						        				</dl>
						        			</div>
						        		</div>
						        		<div class="my-order-list-footer">
						        			<span class="my-upload-contract" @click="hqclikDetail(item.oId,item.conId,item.orderStatus,item.businessType)">查看详情</span>
						        			<span href="#/travel_upload_contract" v-if="item.orderStatus=='303'||item.orderStatus=='108'" @click="hqclikAddContract(item.oId,item.conId,item.orderStatus,item.businessType)">补充资料</span>
						        			<span v-if="item.orderStatus=='104'" @click="hqclikFirstPay(item.isPaid, item.oId, item.oNo)">首付</span>
						        		</div>
					        		</div><!--婚庆end-->
					        	</div>
					        </div>
					        <div class="swiper-slide" v-show="slideshowFlag==1">
					        	<div>
					        		
					        	</div>
					        	<div class="my-have-null" v-if="myPayMonthListShowFlag">
					        		<img class="my-allnull-img" src="../images/mypage-noList.png"/>
						        	<p class="fontSize36 color-black">很遗憾这里什么都没有</p>
						        	<p class="fontSize24 color-darkgrey">赶紧去逛逛吧！</p>
						        	<a class="btn-color btn-gosee">去逛逛</a>
					        	</div>
					        </div>
					        <div class="swiper-slide" v-show="slideshowFlag==2">
					        	<div class="mui-card" v-for="item in myHaveList">
					        			<div class="my-have-title">
						        			<span class="fontSize30 color-black">{{item.product.pTitle}}</span>
						        			<i class="fontSize20 mui-ellipsis">({{item.product.titileSub}})</i>
						        		</div>
						        		<div class="my-have-info">
						        			<div class="mui-row">
						        					<div class="mui-col-xs-6 mui-col-sm-6">
						        						<label>分期惠游：</label>
						        					</div>
						        					<div class="mui-col-xs-6 mui-col-sm-6">
						        						<p>¥{{item.order.oTotalFirstPrice}}+¥{{item.order.durationMoney}}×{{item.order.totalDuration}}期</p>
						        					</div>
						        			</div>
						        			<div class="mui-row">
						        					<div class="mui-col-xs-6 mui-col-sm-6">
						        						<label>出发日期：</label>
						        					</div>
						        					<div class="mui-col-xs-6 mui-col-sm-6">
						        						<p>{{item.meals.mDate}}</p> 
						        					</div>
						        			</div>
						        			<div class="mui-row">
						        					<div class="mui-col-xs-6 mui-col-sm-6">
						        						<label>出发人数：</label>
						        					</div>
						        					<div class="mui-col-xs-6 mui-col-sm-6">
						        						<p>成人{{item.order.ticketYoungNum}}、老人{{item.order.ticketOldNum}}、儿童{{item.order.ticketChildrenNum}}</p> 
						        					</div>
						        			</div>
						        		</div>
						        		<div class="my-order-list-footer">
						        			<span @click="lychekDetailAll(item.order.oId,item.order.processStatus,item.order.conId,item.businessType)">查看详情</span>
						        		</div>
					        	</div>
					        	
					        	<div class="my-have-null" v-if="myHaveListShowFlag">
					        		<img class="my-allnull-img" src="../images/mypage-noList.png"/>
						        	<p class="fontSize36 color-black">很遗憾这里什么都没有</p>
						        	<p class="fontSize24 color-darkgrey">赶紧去逛逛吧！</p>
						        	<a class="btn-color btn-gosee">去逛逛</a>
					        	</div>
					        	
					        </div><!--可使用end	-->				        
					        <!--收藏列表-->
					        <div class="swiper-slide" v-show="slideshowFlag==3">
					        	<div class="mui-card" v-for="item in CollectList" @click="clickCollectList(item.pId,item.platformId)">
					        		<div class="my-collect-title">
					        			<p class="fontSize30 color-black my-collect-titlep">
					        				{{item.pTitle}}
					        			</p>
					        			<p class="fontSize24 color-darkgrey lineheight24">
					        				{{item.pTitleSub}}
					        			</p>
					        		</div>
					        		<img class="my-collect-img" :src="img_URL+item.imgUrl"/>
					        		<div class="my-collect-footer">
					        			<span v-for="items in item.pLaId.split(',')">{{items}}</span>
					        		</div>
					        	</div>
					        </div> <!--收藏列表end-->
					    </div>
					<!--</div>-->
        </div>
     </section>
     
    <FooterTravel class="FooterTravel" :homeSelect="true" :destSelect="true" :mineSelect="false" :ptypeSelectDest="pTypes.SelectDest"></FooterTravel>
  </div>
</template>
<script>
    import CommonHeader from '../components/Common_header.vue'
    import FooterTravel from '../components/Footer_travel.vue'
    import aliicon from '../../static/css/aliIcon.css'
    import swipercss from '../../static/css/swiper.min.css'
    export default{
        components: { CommonHeader,FooterTravel},
          data() {
          		var query=this.$route.query;
                return {
                  pType:localStorage.getItem('ProductType'),
                  slideshowFlag:0,
                  imgstrings:query.imgstrings,
                  conID:query.conID,
                  //我的订单
                  myOrderList:[],
                  //月付账单
                  payMonthList:[],
                  //可使用
                  haveList:[],
                  //收藏
                  collectList:[],
                  token: getToken(),
                  //实名
                  status:localStorage.getItem('status'),
                  //绑卡
                  accountStatus:localStorage.getItem('accountStatus'),
                  //名称
                  mNickName:localStorage.getItem('mNickName'),
                  //收藏列表
                  CollectList:[],
                  //可使用
                  myHaveList:[],
                  myHaveListShowFlag:false,
                  //月付账单
                  myPayMonthList:[],
                  myPayMonthListShowFlag:true,
                  //产品类型旅游/婚庆
                  businessType:query.businessType
                }
              },
        computed:{
            pTypes:function(){
                var pTypesObject={};
                 if (this.pType==1) {
                    pTypesObject.SelectHome=true;
                    pTypesObject.SelectDest=true;
                    pTypesObject.SelectMine=true;
                 } else{
                  pTypesObject.SelectHome=false;
                  pTypesObject.SelectDest=false;
                  pTypesObject.SelectMine=false;
                 }
                 return pTypesObject;
            },
  
				},
				mounted: function () {
				  this.$nextTick(function () {
					  this.tabSwiper();
					  this.isLogin();
				  })
				},
				methods:{
					//菜单切换
					tabSwiper(){
						var _this=this;
						var mySwiper2 = new Swiper('#my-swiper2',{
							watchSlidesProgress : true,
							watchSlidesVisibility : true,
							slidesPerView : 4,
							onTap: function(){
										return _this.slideshowFlag=mySwiper2.clickedIndex;
//										Swiper3.slideTo( mySwiper2.clickedIndex,1)

									}
						});
						//联动
//						var Swiper3 = new Swiper('#my-swiper3',{
//							autoHeight: true,
//							onSlideChangeStart: function(){
//									updateNavPosition()
//								}
//						});
//						function updateNavPosition() {
//							$('#my-swiper2 .active-nav').removeClass('active-nav')
//							var activeNav = $('#my-swiper2 .swiper-slide').eq(Swiper3.activeIndex).addClass('active-nav');
//	
//							if(!activeNav.hasClass('swiper-slide-visible')) {
//								if(activeNav.index() > mySwiper2.activeIndex) {
//									var thumbsPerNav = Math.floor(mySwiper2.width / activeNav.width()) - 1
//									mySwiper2.slideTo(activeNav.index() - thumbsPerNav)
//								} else {
//									mySwiper2.slideTo(activeNav.index())
//								}
//							}
//						};
				},
					//判断是否登录
					isLogin(){
						var _this=this;
						if (!_this.token) {
							_this.$router.push({
                  path: '/loginIn'
                })
						} else{
							//判断是否实名认证
							if (_this.status!=1) {
									var btnArray = ['不要', '好'];
									mui.confirm('', '您尚未完成实名认证,是否现在去认证?', btnArray, function(e) {
										if (e.index == 1) {
											_this.$router.push({
			                  path: '/realName'
			                })
										} else {
										}
									});
							}else{
								//判断是否绑卡
								if (_this.accountStatus!=1) {
									var btnArray = ['不要', '好'];
										mui.confirm('', '您尚未完成绑卡,是否现在去绑定?', btnArray, function(e) {
											if (e.index == 1) {
												_this.$router.push({
				                  path: '/bindingBank'
				                })
											} else {
											}
										});
								} else{
									_this.GetmyOrderList();
								}
							}
						}
					},
					//获取订单
					GetmyOrderList(){
						var _this=this;
						_this.$api.post("combine/orderList",{
							 "token": _this.token,
					     "start": 1,
					     "limit": 70
						},r=>{
							console.log(r.data);
							_this.myOrderList=r.data;
						},err=>{
							if (err.result="4004") {
									_this.$router.push({path: '/loginIn'})
							} 
						});
					},
					//婚庆按钮
					//婚庆查看详情
					hqclikDetail(oId,conId,orderStatus,businessType){
						var _this=this;
						_this.$router.push({path:'/orderOverDetail',query:{oId:oId,conId:conId,orderStatus:orderStatus,businessType:businessType}})
					},
					//婚庆补充资料
					hqclikAddContract(oId,conId,updateMsg,ptype){
						var _this=this;
						_this.$router.push({path:'/travel_upload_contract',query:{oId:oId,conId:conId,updateMsg:updateMsg,ptype:ptype}})
					},
					//婚庆首付
					hqclikFirstPay(isPaid, oId, oNo){
						var _this=this;
						_this.$router.push({path:'/orderPayment',query:{isPaid:isPaid, oId:oId, oNo:oNo,choosePayments:"1"}})
					},
					
					//旅游按钮
					//旅游查看详情
					lychekDetailAll(oId,processStatus,conId,businessType){
						var _this=this;
						_this.$router.push({
							path:'/orderOverDetail',
							query:{
								oId:oId,
								processStatus:processStatus,
								isQianyue:"0",
								imgstrings:_this.imgstrings,
								conId:conId,
								businessType:businessType
							}
						});
					},
//					lyclikDetail(stu,oid){
//						var _this=this;
//						_this.$router.push({path:'/orderOverDetail',query:{stu:stu,oid:oid}});
//					},
					//旅游补充资料
					lyclikAddContract(conID,isQianyue,processStatus,oId,platformId){
						var _this=this;
						_this.$router.push({path:'/travel_upload_contract',query:{conId:conID,isQianyue:'0',processStatus:processStatus,oId:oId,platformId:'1'}})
					},
					//旅游去支付
					lyclikGoPay(oid){
						var _this=this;
						_this.$router.push({path:'/orderPayment',query:{oid:oid}})
					},
					
					
					//可使用
					getHaveList(type){
						var _this=this;
						_this.$api.post('order/findOrderList/v1',{
							token:_this.token,
      				type: type
						},r=>{
							if(r.dCfNum==0)
							_this.myHaveListShowFlag=true;
							if(r.dCfNum>0){
								_this.myHaveList=r.orderList;
							}
						},err=>{
							console.log(err);
							if (err.result="4004") {
									_this.$router.push({path: '/loginIn'})
							} 
						})
					},
					//可使用查看详情
//					haveclikDetail(oId,processStatus){
//						var _this=this;
//						_this.$router.push({path:'/orderOverDetail',query:{oId:oId,processStatus:processStatus}})
//					},
					
					//收藏
					getCollectList(){
						var _this=this;
						_this.$api.post('collection/getCollectionList',{
							  token: _this.token,
					      start: '1',
					      limit: '40'
						},r=>{
							if(r.result="0000"){
								_this.CollectList=r.data;
								console.log(_this.CollectList)
							}
						},err=>{
							mui.toast("网络繁忙，请稍后重试！");
							console.log(err);
							if (err.result="4004") {
									_this.$router.push({path: '/loginIn'})
							} 
						})
						
					},
					//点击收藏列表路由
					clickCollectList(pId, platformId){
						var _this=this;
//						if(platformId == "1") {//1是旅游2是婚庆
							_this.$router.push({
								path:'/travel_detail_info',
								query:{
									'pId': pId
								}
							});
//				    } else if(platformId == "2") {
//				      _this.$router.push({
//								path:'/travel_detail_info',
//								query:{
//									'pId': pId
//								}
//							});
//				    }
					},
					
				//	methods end
				}
    }
</script>
<style>
	.my-header-con{position: relative;width: 100%;height: 2.9rem;background: url(../images/order/topbackground.jpg);background-size: 100% 100%;}
	.my-header-img{width: 100%;height: 1.8rem;padding: 0.3rem;}
	.my-header-img>a,.my-header-img a>div{height: 100%;display: block;}
	.my-headerImg{width: 1.2rem;height: 1.2rem;border-radius: 50%;border:2px solid #FFFFFF;vertical-align: middle;}
	.my-certified{width: 0.9rem;}
	.my-name{padding: 0.2rem 0;}
	.my-name-con{display: inline-block;margin-left: 0.2rem;vertical-align: middle;}
	.my-personal-center{line-height: 1.2rem; text-align: right;color: #FFFFFF;font-size: 0.24rem;}
	.my-personal-center span{vertical-align: middle;}
	
	#my-swiper2{width: 100%;height: 1.1rem;margin: 0;background-color: rgba(255,255,255,0.3);}
	#my-swiper2 .swiper-slide{padding: 0.2rem 0;}
	#my-swiper2 .swiper-slide p{text-align: center;font-size: 0.24rem;color: #FFFFFF;}
	#my-swiper2 .swiper-slide span{font-size: 0.4rem;color: #FFFFFF;display: block;text-align: center;}
	#my-swiper2 .active-nav span,#my-swiper2 .active-nav p{color: #30cfb6!important;}
	#my-swiper2 .active-nav{background: #fff;border-top-left-radius: 5px;border-top-right-radius: 5px;}
	/*我的订单*/
	#mypage .mui-card{margin: 0 0 0.3rem;padding: 0 0.3rem;    box-shadow: 0 2px 6px #EDEDED;}
	.my-order-list-title,.my-have-title{position: relative;height: 0.7rem;border-bottom: 1px solid #EDEDED;}
	.my-order-list-title img{height: 0.44rem;margin: 0.13rem;}
	.my-order-list-footer{height: 1.28rem;border-top: 1px solid #EDEDED;text-align: right;}
	.my-order-list-footer span{display: inline-block;width: 1.64rem;height: 0.64rem;border: 1px solid #333333;
	margin-left: 0.2rem;text-align: center;line-height: 0.64rem;font-size: 0.3rem;border-radius: 5px;margin-top: 0.3rem;color: #333333;}
	.my-order-list-footer a:active{opacity: 0.5;background: #EDEDED;}
	.my-order-list-footer .my-upload-contract{border: 1px solid #eb661e;color: #eb661e;}
	.my-order-info{padding: 0.2rem 0;}
	.my-order-info .mui-col-sm-5 img{width: 2.5rem;height: 2rem;border-radius:5px ;display: block;}
	.my-order-info .mui-col-sm-7 p{ overflow : hidden; text-overflow: ellipsis; display: -webkit-box;-webkit-line-clamp:2;-webkit-box-orient: vertical;}
	.my-title-small{position: absolute;right: 0;bottom: 0.1rem; color: #eb661e;}
	/*可使用*/
	.my-have-title span{line-height: 0.7rem;}
	.my-have-title .fontSize20{position: absolute;right: 0;bottom: 0;color:#EB661E;max-width: 2.5rem;}
	.my-have-info{padding: 0.3rem 0 0.2rem;}
	.my-have-info label{font-size: 0.24rem;}
	.my-have-info p{font-size: 0.24rem;text-align: right;}
	.my-have-info .mui-row{margin-bottom: 0.1rem;}
	/*收藏*/
	.my-collect-title{padding: 0.24rem 0;}
	.my-collect-titlep{margin-bottom: 0.1rem;}
	.my-collect-img{width: 100%;height:3rem ;}
	.my-collect-footer span{padding: 0.04rem 0.2rem; border-radius: 15px;border: 1px solid #1cb9a5;font-size: 0.24rem;color: #1cb9a5;
													margin-right: 0.1rem;display: inline-block;line-height: 0.24rem;}
	.my-collect-footer{padding: 0 0 0.3rem;}
	
	/*无产品*/
	.my-have-null{text-align: center;}
	.my-allnull-img{margin: 0.5rem auto;width: 3.5rem;}
	.btn-gosee{display: inline-block;padding: 0.1rem 0.3rem;border-radius: 5px;}
	
	
</style>

