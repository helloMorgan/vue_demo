<template>
  <div id="homepage">
    <!--推荐-->
    <CommonHeader :titles="pTypes.pTypeValue" :imgChangeFlags="false" :backFlags="true" :headShow="false"></CommonHeader>
    <!--banner-->
    <div class="swiper-container" id="swiper1">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide" v-for="i in bannerList" @click="clickBanner(i.imgBusId)">
		        	<img :src="img_URL+i.imgUrl"/>
		        </div>
		    </div>
		    <div class="swiper-pagination"></div>
		</div>
		<!--title-->
		<div class="linetitle">
			<div class="line"></div>
			<p>
				<i></i>
				<span>分 期 旅 行 是 一 种 时 尚</span>
				<i></i>
			</p>
		</div>
		<!--导航swiper-->
		<div class="swiper-container" id="swiper2">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide  main-label" v-for="i in labelList">
		        	<img :src="img_URL+i.laImageUrl" @click="gopage(i.laId,i.laName)"/>
		        </div>
		    </div>
		</div>
		<!--热门路线-->
		<section class="product-con">
			<div class="label-name">
				<span>热门路线</span>
			</div>
			<ul>
				<li v-for="item in productLsit">
					<router-link :to="'/travel_detail_info?pId='+item.pId">
						<div class="product-imgcon">
							<img :src="img_URL+item.imgUrl"/>
							<span class="title-productsort">自由行</span>
							<div class="title-money">
								<p class="color-red">
									<span>￥</span>{{item.payMonthly.toFixed(0)}}<span>起</span>
								</p>
							</div>
						</div>
						<p class="fontSize30 color-black lineheight30 marginBottom20 marginTop20">{{item.pTitle}} </p>
						<p class="fontSize24 color-darkgrey lineheight24 marginBottom32">({{item.pTitleSub}})</p>
					</router-link>
				</li>
			</ul>
			
		</section>
		<FooterTravel class="FooterTravel" :homeSelect="false" :destSelect="true" :mineSelect="true" :ptypeSelectHome="pTypes.SelectHome" :ptypeSelectDest="pTypes.SelectDest" :ptypeSelectMine="pTypes.SelectMine"></FooterTravel>
  </div>
</template>
<script>
	import CommonHeader from '../components/Common_header.vue'
	import FooterTravel from '../components/Footer_travel.vue'
	export default {
  components: {
    CommonHeader,
    FooterTravel
  },
  data() {
    var query=this.$route.query;
    console.log("我是一条完美分割线");
    return {
      bannerList: [],
      labelList: [],
      productLsit: [],
      pType:query.ptype,
    }
  },
  beforeCreate: function() {
    var ProductType = parseInt(localStorage.getItem('ProductType'));
    if(isNaN(ProductType)) {
      console.log('选择页');
      this.$router.push({path: '/choose_ptype'});
    } else {
      if(ProductType == 1) {
        console.log('旅游');
        this.$router.push({path: '/homepage?ptype=1'});
      } else if(ProductType == 2) {
        console.log('婚庆');
        this.$router.push({path: '/homepage?ptype=2'});
      } else {
        console.log('选择页');
        this.$router.push({path: '/choose_ptype'});
      }
    }
},
computed:{
    pTypes:function(){
        var pTypesObject={};
         if (this.pType==1) {
         	pTypesObject.pTypeValue="分期惠·旅行";
         	pTypesObject.SelectHome=true;
         	pTypesObject.SelectDest=true;
         	pTypesObject.SelectMine=true;
         } else{
         	pTypesObject.pTypeValue="分期惠·婚庆";
          pTypesObject.SelectHome=false;
          pTypesObject.SelectDest=false;
          pTypesObject.SelectMine=false;
         }
         return pTypesObject;
    },
  
},

  mounted: function() {
    this.$nextTick(function() {
        var goPersonal=localStorage.getItem("goPersonal");
        if(goPersonal=="1"){
        this.$router.push({
              path:'/mypage',
        });
        localStorage.removeItem("goPersonal");
      } 
      this.getBanner();
      this.getLabelInfo();
      this.getProduct();     
    })
  },
  methods: {
    getBanner() {
      this.$api.post('product1/searchCarouselImgList?type=1&pageSize=1', {}, r => {
		      	this.bannerList=r.data;
		      	setTimeout(function () {
		      		var Swiper1 = new Swiper('#swiper1',{
								autoplay : 5000,
//								loop: true,
								pagination : '.swiper-pagination',
							})
		      	},500);
		      }, r => {
		      	mui.toast("网络繁忙，请稍后")
		      })
	    },
	    //点击banner
	    clickBanner(pId){
	    	var _this=this;
	    	_this.$router.push({
          path: '/travel_detail_info',
          query: {pId: pId}
        })
	    },
	    getLabelInfo(){
				this.$api.post('product1/searchLabelList', {}, r => {
		      	this.labelList=r.data;
		      	setTimeout(function () {
		      		var Swiper2 = new Swiper('#swiper2',{
									slidesPerView :'auto',
				         	slidesPerGroup : 1,
								})
		      	},500);
		      }, r => {
		      	console.log("请求失败")
		      });
	    },
	    getProduct(){
	    	var page=1;
            this.$api.post('product1/searchProductList?isHot=2&pageSize='+page+'&id=0', {}, r => {
		      	this.productLsit=r.data;
		      }, r => {
		      	console.log("请求失败")
		      });
	    },
	    gopage(Id,name){
		  		this.$router.push({path: '/travel_product_list',query: {lbId: Id,laName:name,Type:1,}});
		  }
		},
	}
</script>
<style>
	@import url("../../static/css/swiper.min.css");
	#homepage #swiper1,#homepage #swiper1 img{width: 100%;height: 3.82rem;}
	.linetitle{position: relative; height: 0.82rem;width:100%; text-align: center;}
	.line{float: left;width: 5.9rem;height: 1px;background:#888888; margin: 0.41rem 0.8rem 0;  }
	.linetitle p{position: absolute;top: 0;left: 2.15rem; width: 3.20rem;line-height: 0.82rem;text-align: center;font-size: 0.24rem;color: #888888;    display: inline-block;background: #FAFAFA;overflow: hidden;}
	.linetitle p i{display: inline-block;width: 3px;height: 3px;border-radius: 50%;vertical-align: middle;background: #888888;}
	#homepage #swiper2{margin: 0 .28rem;}
	#homepage #swiper2 .swiper-slide{width: auto;}
	#homepage #swiper2 img{width: 2rem;height: 1.5rem;border-radius: 5px;display: block;}
	.main-label {text-align: center; margin-right: 0.16rem;}
	.product-con{margin: 0 0.28rem;padding-bottom: 0.98rem;}
	.label-name{width: 100%;height: 1.08rem;padding: 0.5rem 0 0.3rem;}
	.label-name span{height: 0.28rem;display: block;line-height: 0.28rem; font-size: 0.3rem;color: #293f46;padding-left: 0.2rem;border-left: 0.04rem solid #EB661E;}
	.product-imgcon{position: relative;width: 100%;height: 3rem;overflow: hidden;}
	.product-imgcon>img{width: 100%;height: 100%; display: block;}
	.title-productsort{position: absolute;left: 0;top: 0;padding: 0.09rem 0.2rem 0.15rem 0.18rem;background: #30CFB6;font-size: 0.28rem;color: #FFFFFF;border-bottom-right-radius: 10px;line-height: 0.28rem;}
	.title-money{position: absolute;top: 0.74rem;right: 0;width: 1.5rem;height: 0.98rem;border-radius: 5px;background:url(../images/travel/index_p_07.png);background-size: 100% 100%;}
	.title-money p{position: absolute; bottom: 0;width: 100%;text-align: center;font-size: 0.35rem;font-weight: 600;}
	.title-money p span{color: #F42D2D;font-size: 0.17rem;}
	
</style>
