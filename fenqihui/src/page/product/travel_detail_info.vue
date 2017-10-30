<template>
	<div id="tavel-detail">
		<CommonHeader titles="产品详情" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
	    <!--banner-->
	    <div class="swiper-container" id="swiper1">
		    <!--<div class="swiper-wrapper">
		        <div class="swiper-slide" v-for="i in bannerList">
		        	<img :src="img_URL+i.imgUrl"/>
		        </div>
		    </div>-->
		     <div class="swiper-wrapper">
		        <div class="swiper-slide" v-for="item in bannerImgList">
		        	<!--<img src="../images/productomg.jpg"/>-->
		        	<img :src="img_URL+item.imgUrl"/>
		        	<div class="mui-slider-title">
		        		<p class="fontSize30 lineheight30">{{productInfoList.pTitle}}</p>
		        		<span class="fontSize24 lineheight24">{{productInfoList.pTitleSub}}</span>
		        	</div>
		        </div>

		    </div>
		     <span class="fontSize24 swiper-img-num">{{bannerImgList.length}}张</span>
		    <div class="swiper-pagination"></div>
		</div>
		<!--产品信息-->
		<div class="product-info-list">
			<ul class="mui-table-view">
				 <li class="mui-table-view-cell">
				 	<span class="fontSize30 color-orange">总价：￥{{pTotalMoney}}元</span>
				 	<span class="fontSize24 color-darkgrey  mui-pull-right">已有{{productInfoList.saleCount}}人购买</span>
				 </li>
			</ul>
			<ul class="mui-table-view marginBottom20">
				 <li class="mui-table-view-cell"> 
				 	<p class="fontSize24 lineheight24 color-black product-nper">
				 		分期出行：<span class="fontSize36 color-orange lineheight24">￥{{parseFloat(pFirstFee).toFixed(2)}}</span><i>起+</i><span class="fontSize24 color-orange">￥{{parseFloat(aomountInstallment).toFixed(2)}}</span><i>*</i><span class="fontSize24 color-orange">{{staging}}</span><i>期</i>
				 		<span class="mui-pull-right" @click="installmentFlag=false"><i>{{stageNum}}种选择</i> <span class="fontSize36 color-orange mui-icon mui-icon-help-filled"></span> </span>
				 	</p>
				 </li>
		         <li class="mui-table-view-cell" @click="gopage()">
		         	<div class="mui-navigate-right">
						<p  class="fontSize24 lineheight24 color-black">
							出发日期：<span class="fontSize24 lineheight24 color-darkgrey">{{productInfoList.departureMonth}}</span>
						</p>
					</div>
		         </li>
		         <li class="mui-table-view-cell">
		         	<p  class="fontSize24 lineheight24 color-black  marginBottom30">
						供应商：<span class="fontSize24 lineheight24 color-darkgrey">{{productInfoList.sName}}</span>
					</p>
					<p  class="fontSize24 lineheight24 color-black marginBottom30">
						咨询电话：<span class="fontSize24 lineheight24 color-darkgrey">{{productInfoList.siKefuMobile}}</span>
					</p>
					<p  class="fontSize24 lineheight24 color-black ">
						工作时间：<span class="fontSize24 lineheight24 color-darkgrey">{{productInfoList.sWorkTimeStart}} - {{productInfoList.sWorkTimeEnd}}</span>
					</p>
		         </li>
		         <li class="mui-table-view-cell">
					<p  class="fontSize24 lineheight24 color-black">
						用户评价：
						<span class="mui-icon mui-icon-star-filled fontSize36 lineheight24 color-orange"></span>
						<span class="mui-icon mui-icon-star-filled fontSize36 lineheight24 color-orange"></span>
						<span class="mui-icon mui-icon-star-filled fontSize36 lineheight24 color-orange"></span>
						<span class="mui-icon mui-icon-star-filled fontSize36 lineheight24 color-orange"></span>
						<span class="mui-icon mui-icon-star-filled fontSize36 lineheight24 color-orange"></span>
					</p>
		         </li>
			</ul>
		</div>
		<!--4种分期弹kuang-->
		<div class="mui-backdrop" id="installment" :class="{'hide':installmentFlag}">
			<div>
				<span class="icon-close mui-icon mui-icon-closeempty" @click="installmentFlag=true"></span>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" v-for="item in installmentArr">
					 	<p class="fontSize26 color-darkgrey">
					 		<span class="installment-num">{{item.fq}}期</span>
					 		首付￥<i class="color-orange">{{item.pFirstFee}}</i>起+￥<i class="color-orange">{{item.price}}x{{item.fq}}</i>期
					 	</p>
					</li>
				</ul>
			</div>
		</div>
		<!--图文信息-->
		<div class="product-detail-list">
			<div class="swiper-container" id="swiper2">
			     <div class="swiper-wrapper">
			        <div class="swiper-slide active-nav">
			        	<span>行程详情</span>
			        </div>
			        <div class="swiper-slide">
			        	<span>费用包含</span>
			        </div>
			        <div class="swiper-slide">
			        	<span>预定须知</span>
			        </div>
			    </div>
			</div>
			<div class="swiper-scrollbar"></div>
			<div class="swiper-container" id="swiper3">
			     <div class="swiper-wrapper" >
			        <div class="swiper-slide">
			        	<div v-for="item in travelInfoList">
			        		<img :src="img_URL+item.imgUrl"/>
			        	</div>
			        </div>
			        <div class="swiper-slide">
			        	<div v-for="item in feeIncludeList">
			        		<img :src="img_URL+item.imgUrl"/>
			        	</div>
			        </div>
			        <div class="swiper-slide">
			        	<div v-for="item in bookingInfoList">
			        		<img :src="img_URL+item.imgUrl"/>
			        	</div>
			        </div>
			    </div>
			</div>
		</div>
		<div class="popup" v-show="popflag"></div>
		<!--登录-->
        <div class="islogin">
            <div class="login btn-color" @click="confirmLogin()">立即登录</div>
            <div class="cancelLogin" @click="cancelLogin()">取消</div>
        </div>
		<!--底部按钮-->
		<footer v-show="footerShow">
			<div class="footer-con footer-btn-group mui-row">
				<div class="mui-col-sm-2 mui-col-xs-3">
					<a class="footer-kf consultBtn"  href="#/kf">
						<img src="../../images/travel/travel-detail-kf.png"/>
						<span class="fontSize24 color-77">客服</span>
					</a>
				</div>
				<div class="mui-col-sm-2 mui-col-xs-2" @click="collection()">
					<div class="footer-nocollection" v-if="!collectionFlag">
						<img src="../../images/travel/travel-detail-nocollect.png"/>
						<span class="fontSize24 color-77">收藏</span>
					</div>
					<div class="footer-collection"  v-else>
						<img src="../../images/travel/travel-detail-collect.png"/>
						<span class="fontSize24 color-orange">已收藏</span>
					</div>
				</div>
				<div class="mui-col-sm-8 mui-col-xs-7">
					<p @click="gopage()" class="btn-now-by btn-color">立即购买</p>
				</div>
			</div>
		</footer>


	</div>


</template>
<script>
	import CommonHeader from '../../components/Common_header.vue'
	import Kf from '../../components/Kf.vue'
	export default {
      components: {
        CommonHeader,
        Kf
      },
      data() {
        var query = JSON.parse(JSON.stringify(this.$route.query));
        return {
          installmentFlag: true,
          imgChangeFlag: true,
          backFlag: false,
          collectionFlag: false,
          kfShow: false,
          detaial: true,
          bannerImgList: [],
          productInfoList: [],
          travelInfoList: [],
          feeIncludeList: [],
          bookingInfoList: [],
          pId: query.pId,
          pFirstPayRate: "",
          islogin: false,
          ptype: localStorage.getItem("ProductType"),
          popflag:false,
          iscollection:"",
          fDurationList:[],
          fFeeList:[],
          pTotalMoney:"",
          poundages:[],
          installmentArr:[],
          aomountInstallment:"",
          staging:"",
          pFirstFee:"",
          stageNum:"",
          stu:query.stu,
          footerShow:true,
        }
      },
      mounted: function() {
        this.$nextTick(function() {
          this.getProductInfo();
          this.getProductdetail();
          this.getProducImgInfo("2", '10');
          this.getProducImgInfo("3", '10');
          this.getProducImgInfo("4", '10');
          this.collectionInit();
          if(this.stu=="1"){
              this.footerShow=false;
          }
        })
      },
      methods: {
        //登录
        confirmLogin(){
             var vueScope=this;
            vueScope.popflag=false;
            this.$router.push({path: '/loginIn'})
        },
        //取消
        cancelLogin(){
           var vueScope=this;
           vueScope.popflag=false;
           $(".islogin").hide();
        },
        refreshPage() {
          this.$router.replace("/index")
        },
        //获取产品信息
        getProductInfo() {
    
        },
        //获取产品详细信息
        getProductdetail() {
          //				var pId=this.$utils.GetQueryString('pId');
          //				console.log(pId);
    
          this.$api.post("product1/searchProductDetail", {
            pId: this.pId
          }, r => {
            //					console.log(r);
            this.bannerImgList = r.imageData;
            this.productInfoList = r.data;
            this.pFirstPayRate = r.data.pFirstPayRate;
            this.fDurationList=this.productInfoList.fDuration;
            this.fFeeList=r.fDurationData.fFee;
            this.pTotalMoney=this.productInfoList.pTotalMoney;
            this.pFirstFee=this.productInfoList.pFirstFee;
            this.stageData();
            setTimeout(function() {
              var Swiper1 = new Swiper('#swiper1', {
                autoplay: 5000,
                pagination: '.swiper-pagination',
              });
            }, 500)
          });
        },
        //分期data
        
        stageData(){
            var vueScope=this;
            var fDurationArr = parseFloatArr(vueScope.fDurationList.split(","));       
            var fFeeArr=parseFloatArr(vueScope.fFeeList.split(","));
                vueScope.pTotalMoney= formatNum(vueScope.pTotalMoney);
            var pTotalMoneys= parseFloat(vueScope.pTotalMoney.replace(/,/g, ""));
            var pay = vueScope.pFirstFee || '0';
            console.log(fDurationArr);
            console.log(fFeeArr);
            vueScope.stageNum=fDurationArr.length;
             if (fDurationArr.length == fFeeArr.length) {
                    for (var i = 0; i < fFeeArr.length; i++) {
                        vueScope.poundages[i] = (pTotalMoneys - parseFloat(vueScope.pFirstFee)) * fFeeArr[i];
                    }
                }
             for (var i = 0; i < fDurationArr.length; i++) {
                    var item = {};
                    var installmentAllMoney = pTotalMoneys - pay;
                    item.price = (installmentAllMoney / fDurationArr[i] + vueScope.poundages[i]).toFixed(2);
                    item.fq = fDurationArr[i];
                    item.pFirstFee = parseFloat(vueScope.pFirstFee);
                    item.poundage = vueScope.poundages[i] / item.fq;
                    item.fFee = fFeeArr[i];
                    item.initFee = parseInt(fFeeArr[i] * 100);
                    vueScope.installmentArr.push(item);
                }
             
            vueScope.aomountInstallment = vueScope.installmentArr[fDurationArr.length - 1].price;
            vueScope.staging = vueScope.installmentArr[fDurationArr.length - 1].fq;
            
        },
           
        //获取产品图文消息
        getProducImgInfo(type, num) {
          var type2 = true,
            type3 = true,
            type4 = true;
          this.$api.post("product1/searchProductImgList", {
            pageSize: '1',
            type: 2,
            pIds: this.pId,
            pageNum: num
          }, r => {
            console.log(r);
//		            if (r.totalCount > 10) {
//		                switch (type) {
//		                    case '2':
//		                        if (type2) {
//		                            getProducImgInfo(type, r.totalCount);
//		                            type2 = false;
//		                            return;
//		                        }
//		                        break;
//		                    case '3':
//		                        if (type3) {
//		                            getProducImgInfo(type, r.totalCount);
//		                            type3 = false;
//		                            return;
//		                        }
//		                        break;
//		                    case '4':
//		                        if (getProducImgInfo) {
//		                            getInfo(type, r.totalCount);
//		                            type4 = false;
//		                            return;
//		                        }
//		                        break;
//		                }
//		            }
            if(type == 2) {
              this.travelInfoList = r.data;
            } else if(type == 3) {
              this.feeIncludeList = r.data;
            } else if(type == 4) {
              this.bookingInfoList = r.data;
            }
            var Swiper2 = new Swiper('#swiper2', {
              watchSlidesProgress: true,
              watchSlidesVisibility: true,
              slidesPerView: 3,
              onTap: function() {
                Swiper3.slideTo(Swiper2.clickedIndex)
              }
            });
            var Swiper3 = new Swiper('#swiper3', {
              scrollbar: '.swiper-scrollbar',
              scrollbarHide: false,
              scrollbarDraggable: true,
              scrollbarSnapOnRelease: true,
              onSlideChangeStart: function() {
                updateNavPosition()
              }
            });
    
            function updateNavPosition() {
              $('#swiper2 .active-nav').removeClass('active-nav')
              var activeNav = $('#swiper2 .swiper-slide').eq(Swiper3.activeIndex).addClass('active-nav');
    
              if(!activeNav.hasClass('swiper-slide-visible')) {
                if(activeNav.index() > Swiper2.activeIndex) {
                  var thumbsPerNav = Math.floor(Swiper2.width / activeNav.width()) - 1
                  Swiper2.slideTo(activeNav.index() - thumbsPerNav)
                } else {
                  Swiper2.slideTo(activeNav.index())
                }
              }
            };
          });
        },
        gopage() {
            var vueScope=this;
            console.log(vueScope.installmentArr);
            var productMsgs={
                //特色
                pFeature:vueScope.productInfoList.pFeature,
                //标题
                pTitle:vueScope.productInfoList.pTitle,
                //子标题
                subTitle:vueScope.productInfoList.pTitleSub,
                //商户名
                sName:vueScope.productInfoList.sName
            };
            var productMsgStr = JSON.stringify(productMsgs);//存本地进行传值
            localStorage.setItem("productMsg",productMsgStr);
          vueScope.$router.push({
            path: '/travel_choose_product',
            query: {
            pId: vueScope.pId,
            pFirstPayRate: vueScope.pFirstPayRate,
            installmentArr:JSON.stringify(vueScope.installmentArr),
            productMsg:productMsgs,
            fDurationList:vueScope.fDurationList,
//           //特色
//          pFeature:vueScope.productInfoList.pFeature,
//              //标题
//          pTitle:vueScope.productInfoList.pTitle,
//              //子标题
//          subTitle:vueScope.productInfoList.pTitleSub,
//              //商户名
//          sName:vueScope.productInfoList.sName
            }
        });
},

        //获取产品图文消息end
        //初始化收藏 
        collectionInit() {
            var vueScope = this;
            vueScope.$api.post('product1/searchProductDetail', {
                token: getToken(),
                pId: vueScope.pId,
                //platformId: vueScope.ptype
              },
              r => {
                if(r.result == "0000") {
                  vueScope.iscollection = r.data.status;
                  if(r.data.status == "1") {
                    vueScope.collectionFlag = true;
                  } else if(r.data.status == "0") {
                    vueScope.collectionFlag = false;
                  }
                }
              }, err => {
                  if(err.result="4004"){
                      localStorage.removeItem("fqh_token")
                  }
                console.log("请求失败")
              });
        
          },
          //收藏
          collection() {
            var vueScope = this;
            if(!getToken()) {
              vueScope.popflag = true;
              $(".islogin").show();
              $('.islogin').animateCss('fadeInUp');
            } else {
              //未收藏时候
              if(vueScope.iscollection == "0") {
                this.$api.post('product1/addProductCollection', {
                    token: getToken(),
                    pId: vueScope.pId
                  },
                  r => {
                    if(r.result == "0000") {
                      mui.toast("收藏成功");
                      vueScope.collectionFlag = true;
                      vueScope.iscollection = "1";
                    } else {
                      mui.toast("收藏失败");
                    }
                  },
                  err => {
                      if(err.result="4004"){
                      localStorage.removeItem("fqh_token")
                  }
                    console.log("请求失败")
                  });
        
              } else if(vueScope.iscollection == "1") {
                vueScope.$api.post('product1/cancelProductCollection', {
                    token: getToken(),
                    pId: vueScope.pId
                  },
                  r => {
                    if(r.result == "0000") {
                      mui.toast("取消成功");
                      vueScope.collectionFlag = false;
                      vueScope.iscollection = "0";
                      
                    } else {
                      mui.toast("取消失败");
        
                    }
                  },
                  r => {
                    console.log("请求失败")
                  });
        
              }
        
            }
          },
          //收藏end
        },

}
</script>

<style>
	@import url("../../../static/css/swiper.min.css");
	#tavel-detail{padding-bottom:2rem;}
	#tavel-detail .product-info-list,#tavel-detail .product-detail-list{background: #FFFFFF;}
	#tavel-detail #swiper1{width: 100%;height: 6rem;}
	#tavel-detail #swiper1 img{width: 100%;height: 100%;display: block;}
	.mui-slider-title {background-color: rgba(0,0,0,0.4);height: 1rem;text-indent: 0.3rem;}
	.mui-slider-title p,.mui-slider-title span{color: #FFFFFF;display: block;}
	.mui-slider-title p{margin: 0.18rem 0;}
	.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{bottom: 0;}
	.swiper-img-num{position: absolute;right: 0.3rem;bottom: 0.3rem;line-height: 0.24rem;z-index: 20;color: #fff;}
	.swiper-pagination-bullet-active{opacity: 0.7;}
	.mui-table-view-cell:after,.mui-table-view:after,.mui-table-view:before{background-color: #ededed;}
	.mui-table-view-cell{padding: 0.3rem 0.3rem;}
	i{font-style: normal;color: #888888;font-size: 0.24rem;}
	.marginBottom30 {margin-bottom: 0.3rem!important;}
	.boxShadow{box-shadow:1px 1px 1px rgba(0,0,0,0.5);}
	#tavel-detail #swiper2{width: 100%;height: 0.96rem;margin: 0;}
	#tavel-detail #swiper2 .swiper-slide{text-align: center;line-height: 0.96rem;font-size: 0.3rem;color: #333333;}
	#tavel-detail #swiper2 .active-nav span{color: #EB661E!important;}
	.swiper-scrollbar{ height: 3px;margin-bottom: -2px;background: none;z-index: 2;}
	.swiper-scrollbar-drag{background: #EB661E;}
	#tavel-detail #swiper3{border-top: 1px solid #ededed;}
	/*#tavel-detail #swiper3 .swiper-slide{padding: 0.3rem;}*/
	#tavel-detail #swiper3 .swiper-slide img{width: 100%;}
	#installment>div{position: absolute;width: 6.3rem;height: 4rem;top: 3.75rem;left: 0.6rem;}
	#installment .mui-table-view-cell:after{right:0.5rem;left:0.5rem;}
	#installment ul{border-radius: 10px;overflow: hidden;}
	#installment .mui-table-view-cell{padding: 0.3rem 0.5rem;}
	#installment .icon-close{display: block;color: #fff;width: 0.52rem;height: 0.52rem;position: absolute;right: 0; top: -0.72rem;border-radius: 50%;border: 1px solid #fff; text-align: center;line-height: 0.50rem;}
	.installment-num{width: 0.8rem;height: 0.4rem;line-height: 0.39rem;border: 1px solid #e86a48;border-radius: 15px;text-align: center;display: inline-block;color: #E86A48;margin-right: 0.1rem;}
	.footer-btn-group>div{height: 100%;text-align: center;}
	.footer-btn-group img{width: 0.4rem;display: block;margin:0.16rem auto 0;}
	.btn-now-by{display: block;line-height: 0.98rem;}
	/*点击登录*/
	.popup{position:fixed;width:100%;height:100%;left:0;bottom:0;right:0;top:0;background: rgba(0,0,0,0.4);z-index: 999;}
    .islogin {width: 100%; padding: 0.4rem 0 0.4rem;color: #FFFFFF;background-color: #FFFFFF;position: fixed;left: 0;bottom:0;z-index: 9999;display: none;}
    .islogin .login {width:6.4rem;margin: 0 auto;height:0.88rem;line-height: 0.88rem;text-align: center;border-radius: 5px;font-size:0.3rem;}
    .islogin .cancelLogin {width:6.4rem;margin: 0 auto;height:0.88rem;margin-top: 0.4rem;line-height: 0.88rem;text-align: center;font-size:0.3rem;color: #eb661e;border-radius:5px;-webkit-border-radius: 5px;background: url(../../images/button_boder.png);background-size:100% 100%;}

</style>
