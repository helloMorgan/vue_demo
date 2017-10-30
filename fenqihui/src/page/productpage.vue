<template>
  <div id="productpage">
       <!--目的地列表-->
       <div id="ppheader">
       	<CommonHeader :titles="ppType.pTypeValues" :imgChangeFlags="true" :backFlags="true"></CommonHeader>
       </div>
       
 			
 			<section id="ppnavCon">
 				<div class="nav-left-con  mui-pull-left">
 					<ul>
 						<li v-for="(item,index) in desNameList" @click="changeClick(index)">{{item.firstDestName}}</li>
 					</ul>
 				</div>
 				<div class="nav-right-con">
 						<div class="destination-img-con" v-for="item in desImgList.destList">
 								<img :src="img_URL+item.imgUrl"  @click="gopage(item.seDestId,item.seDestName)"/>
 						</div>
 				</div>
 			</section>
  
  		<FooterTravel class="FooterTravel" :homeSelect="true" :destSelect="false" :mineSelect="true" :ptypeSelectHome="ppType.SelectHome" :ptypeSelectDest="ppType.SelectDest" :ptypeSelectMine="ppType.SelectMine"></FooterTravel>
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
    return {
      desNameList: [],
      desImgList: [],
      ptypes:localStorage.getItem('ProductType')
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getDesName();
      this.screenMedia();
    })
  },
  computed: {
    ppType: function() {
      var pTypesObjects = {};
      if(this.ptypes == 1) {
        pTypesObjects.pTypeValues = "目的地";
        pTypesObjects.SelectHome = true;
        pTypesObjects.SelectDest = true;
        pTypesObjects.SelectMine = true;
      } else {
        pTypesObjects.pTypeValues = "品类";
        pTypesObjects.SelectHome = false;
        pTypesObjects.SelectDest = false;
        pTypesObjects.SelectMine = false;
      }
      return pTypesObjects;
    },

  },

  methods: {
		//屏幕适配
		screenMedia(){
			var s=window.screen.availHeight;
			//判断是否是微信端打开
			function isOpenInWeixin() { // 检查是否在微信里面打开
		    var ua = navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i) == "micromessenger") {
		      return true;
		    } else {
		      return false;
		    }
			}
			if(isOpenInWeixin()){
				var h1=document.getElementById("ppheader").offsetHeight+114;
			}else{
				var h1=document.getElementById("ppheader").offsetHeight+50;
			}
			document.getElementById("ppnavCon").style.height= s-h1+"px";
		},
    getDesName() {
      var _this = this;
      this.$api.post('product1/searchDestInfoList',{},r=>{
	  			this.desNameList=r.data;
	  			setTimeout(function() {
	  				$('.nav-left-con>ul>li').eq(0).addClass('nav-active');
            _this.changListData(0);
	  				}, 10);
	  		}, r => {
	      	console.log("请求失败")
	      });
	  	},
	  	changListData(index){
	  		this.desImgList=this.desNameList[index];
	  	},
	  	changeClick(i){
	  		$('.nav-left-con>ul>li').eq(i).addClass('nav-active').siblings().removeClass('nav-active');
	  		this.changListData(i)
	  	},
	  	
	  	gopage(lbId,name){
	  		this.$router.push({path: '/travel_product_list',query: {lbId: lbId,laName:name,Type:2,}});
	  	}
		  }
	}
</script>

<style>
	#ppnavCon{padding-top: 0.2rem;}
	.nav-left-con,.nav-left-con ul{width: 2rem;background: #FFFFFF;height:100%;overflow-y: auto;}
	.nav-left-con li{width: 100%;height: 0.98rem;font-size: 0.3rem;line-height: 0.98rem;color: #555555;text-align: center;}
	.nav-active{background: #FAFAFA;font-weight: bold;}
	.nav-right-con{height: 100%;overflow-y: scroll;overflow-y: auto;}
	.destination-img-con{position: relative;width: 2.38rem;height: 1.6rem;margin:0 0 0.2rem 0.2rem;float: left;}
	.destination-img-con img{width: 100%;height: 100%;border-radius: 2px;}
</style>
