<template>
	<div id="travel_upload_contract">
		<CommonHeader titles="订单资料" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
		<section>
			<!--上传合同-->
			<div>
				<div class="travel_upload_title">
					<img src="../../images/xltravel-uploadhrtong.png"/>
					<span class="fontSize30 color-darkgrey">旅游合同</span>
				</div>
				<div class="mui-card">
					<ul class="hetong-show">
						<li v-show="hetongList.length>0" v-for="item in hetongList">
							<div class="del-con">
								<img :src="item.finalImgUrl" alt="合同"/>
							</div>
						</li>
						<li v-show="hetongList.length<1">
							<div class="del-con">
								<img src="../../images/without_result.png" alt="无图占位图"/>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<!--付款单据-->
			<div>
				<div class="travel_upload_title">
					<img src="../../images/xltravel-uploadpay.png"/>
					<span class="fontSize30 color-darkgrey">付款单据</span>
				</div>
				<div class="mui-card">
					<ul class="pay-show">
						<li v-show="payList.length>0" v-for="item in payList">
							<div class="del-con">
								<img :src="item.finalImgUrl" alt="付款单据"/>
							</div>
						</li>
						<li v-show="payList.length<1">
							<div class="del-con">
								<img src="../../images/without_result.png" alt="无图占位图"/>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<!--其他订单资料-->
			<div>
				<div class="travel_upload_title">
					<img src="../../images/xltravel-uploadhrtong.png" alt="站位图"/>
					<span class="fontSize30 color-darkgrey">其他订单</span>
				</div>
				<div class="mui-card">
					<ul class="else-show">
						<li v-show="otherList.length>0" v-for="item in otherList">
							<div class="del-con">
								<img :src="item.finalImgUrl" alt="其它资料"/>
							</div>
						</li>
						<li v-show="otherList.length<1">
							<div class="del-con">
								<img src="../../images/without_result.png" alt="无图占位图"/>
							</div>
						</li>
					</ul>
					
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	import CommonHeader from '../../components/Common_header.vue'
	export default{
		components: { CommonHeader },
		data(){
			var query=this.$route.query;
			return{
				hetongList:[],
				payList:[],
				otherList:[],
				hetongZhanFlag:false,
				payZhanFlag:false,
				otherZhanFlag:false,
	            conId:query.conId,
	            token: getToken(),
			}
		},
		mounted: function () {
		  this.$nextTick(function () {
			  this.getContractImg();
		  })
		},
		methods:{
	        //获取合同图片
	        getContractImg(){
	        	var _this = this;
		        if (!_this.conId) {
		            return false;
		        }
		        _this.$api.post('contractInfo/findConImgs',{
		        	'token': _this.token,
		            'conId':_this.conId
		        },r=>{
		        	if(r.result=="0000"){
		        		for (var i=0;i<r.type1.length;i++) {
		        			var list={finalImgUrl:r.type1[i].fileUrl,imgId:r.type1[i].imgId,imgUrl:r.type1[i].fileName}
		        			_this.hetongList.push(list);
		        			
		        		}
		        		for (var i=0;i<r.type2.length;i++) {
		        			var list={finalImgUrl:r.type2[i].fileUrl,imgId:r.type2[i].imgId,imgUrl:r.type2[i].fileName}
		        			_this.payList.push(list);
		        		}
		        		for (var i=0;i<r.type3.length;i++) {
		        			var list={finalImgUrl:r.type3[i].fileUrl,imgId:r.type3[i].imgId,imgUrl:r.type3[i].fileName}
		        			_this.otherList.push(list);
		        		}
		        		return _this.hetongList,_this.payList, _this.otherList;
		        	}
		        },r=>{
		        	mui.toast("请求失败！")
		        });
	        },
	        //方法结束
		},
	}
</script>

<style>
	.travel_upload_title{height: 0.8rem;line-height: 0.8rem;padding: 0 0.3rem;}
	.travel_upload_title img{width: 0.3rem;vertical-align: sub;}
	#travel_upload_contract .mui-card{width: 100%;padding: 0.3rem;margin: 0;}
	figure{position: relative; display: inline-block;width: 2.2rem;height: 2.2rem;}
	figure img{width: 100%;height: 100%;}
	figure input[type='file']{position: absolute;bottom: 0;opacity: 0;width: 100%;height: 100%;}
	#travel_upload_contract .btn-ok{margin: 0.3rem auto;}
	#travel_upload_contract .mui-card img,#travel_upload_contract .del-con{width: 2.2rem;height: 2.2rem;}
	#travel_upload_contract .mui-card ul,#travel_upload_contract .mui-card ul li{display: inline-block;vertical-align: top;}
	#travel_upload_contract .mui-card ul li{margin-right: 0.1rem;margin-bottom: 0.1rem;}
	.del-con{position: relative;background: #ededed;}
	.mui-icon-closeempty{position: absolute;top: 0; right: 0; background: #333333;color: #fff;border-radius: 50%;}
</style>
