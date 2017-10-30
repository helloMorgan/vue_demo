<template>
	<div id="travel_upload_contract">
		<CommonHeader titles="上传订单资料" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
		<section>
			<!--上传合同-->
			<div>
				<div class="travel_upload_title">
					<img src="../../images/xltravel-uploadhrtong.png"/>
					<span class="fontSize30 color-darkgrey">旅游合同</span>
				</div>
				<div class="mui-card">
					<ul class="hetong-show">
						<li v-for="item in hetongList">
							<div class="del-con">
								<img :src="item.finalImgUrl" alt="合同"/>
								<span class="mui-icon mui-icon-closeempty" @click="deleteImg(item.imgId,1)"></span>
							</div>
						</li>
						<li>
							<div>
								<figure id="travel_upload-hetong">
									<img src="../../images/xltravel-uploadImg.png" alt="站位图"/>
									<input id="file-hetong" type="file" name="file" capture="camera" accept="image/*" @change="changeImg($event,1)"/>
								</figure>
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
						<li v-for="item in payList">
							<div class="del-con">
								<img :src="item.finalImgUrl" alt="付款单据"/>
								<span class="mui-icon mui-icon-closeempty" @click="deleteImg(item.imgId,2)"></span>
							</div>
						</li>
						<li>
							<div>
								<figure id="travel_upload-pay">
									<img src="../../images/xltravel-uploadImg.png" alt="站位图"/>
									<input id="file-title" type="file" name="file" capture="camera" accept="image/*" @change="changeImg($event,2)"/>
								</figure>
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
						<li v-for="item in otherList">
							<div class="del-con">
								<img :src="item.finalImgUrl" alt="其它资料"/>
								<span class="mui-icon mui-icon-closeempty" @click="deleteImg(item.imgId,3)"></span>
							</div>
						</li>
						<li>
							<div>
								<figure id="travel_upload-other">
									<img src="../../images/xltravel-uploadImg.png"/>
									<input id="file-other" type="file" name="file" capture="camera" accept="image/*" @change="changeImg($event,3)"/>
								</figure>
							</div>
						</li>
					</ul>
					
				</div>
			</div>
		</section>
		<div class="btn-login btn-color btn-ok"@click="submitContract">
			提交
		</div>
	</div>
</template>
<script>
	import CommonHeader from '../../components/Common_header.vue'
	export default{
		components: { CommonHeader },
		data(){
			var query=this.$route.query;
			console.log(query)
			return{
				hetongList:[],
				payList:[],
				otherList:[],
				compressImg: '',
				imgArr:{
	                type:Array,
	                twoWay: true,
	                default:Array
	            },
	            imgNumLimit:{//一次最多可以上传多少张照片
	                type:Number,
	                default:1
	            },
	            conId:query.conId,
	            token: getToken(),
	            oId:query.oId,
		        platformId:query.platformId
			}
		},
		mounted: function () {
		  this.$nextTick(function () {
			  this.getContractImg();
		  })
		},
		methods:{
			//压缩图片
			changeImg(e,imgLabelType){
				let tag = e.target;
                let fileList = tag.files;
                var imgName =fileList[0].name ;
                let imgNum = fileList.length;
                let _this = this;
                _this.imgArr = [];//图片数据清零
                if(this.imgArr.length + imgNum > this.imgNumLimit){
                    alert('一次最多上传'+this.imgNumLimit+'张图片！');
                    return;
                }
                var Orientation;
                for(let i=0;i<imgNum;i++){
                    let reader = new FileReader();
                    reader.readAsDataURL(fileList[i]);
                    reader.onload = function(){
                        var oReader = new FileReader();
                        oReader.onload = function(e) {
                            var image = new Image();
                            image.src = e.target.result;
                            image.onload = function() {
                            	var lastImgUrl=compress(image);
                            	uploadImg (lastImgUrl, imgName, imgLabelType);
                            };
                        };
                        oReader.readAsDataURL(fileList[i]);
                    }
                }
                //上传图片
                function uploadImg (imgSrc, imgName, imgLabelType) {
                	var data={
		                token: _this.token,
		                imgType: 2,
		                imgLabelType: imgLabelType,
		                imgfile: imgName,
		                base64str:imgSrc
		            };
                	$.ajax({
                		type: "POST",
		                url: "http://ceshi1.fenqihui.com/fqh_upload/imgupload/upload",
		                data:data,
		                beforeSend: function () {
		                    showhide($("#travel_upload_contract"),"show");
		                },
		                dataType:"json",
		                success: function (r) {
		                	console.log(r)
		                	switch (imgLabelType){
		                		case 1:
		                			_this.hetongList.push(r);
		                			break;
		                		case 2:
		                			_this.payList.push(r);
		                			break;
		                		case 3:
		                			_this.otherList.push(r);
		                			console.log(_this.otherList);
		                			break;
		                		default:
		                			break;
		                	}
		                },
				         complete:function(){
				          showhide($("#travel_upload_contract"),"hide");
				         },
		                 error: function () {
		                   mui.toast("添加失败");
		                }
                	});
                }
			},
			//删除图片
	        deleteImg(deleteimgId,listNum) {
	        	var _this=this;
	            _this.$api.post("imgupload/delete?",{
	            	imgId: deleteimgId,
                	token: _this.token
	            },r=>{
	            	console.log(r);
	            	if (r.result == "0000") {
	            		mui.toast("删除成功！");
	            		switch (listNum){
	                		case 1:
	                			for (var i=0;i<_this.hetongList.length;i++) {
	                				if (_this.hetongList[i].imgId==deleteimgId) {
	                					_this.hetongList.splice(i,1);
	                				}
	                			}
	                			return _this.hetongList;
	                			break;
	                		case 2:
	                			for (var i=0;i<_this.payList.length;i++) {
	                				if (_this.payList[i].imgId==deleteimgId) {
	                					_this.payList.splice(i,1);
	                				}
	                			}
	                			return _this.payList;
	                			break;
	                		case 3:
	                			for (var i=0;i<_this.otherList.length;i++) {
	                				if (_this.otherList[i].imgId==deleteimgId) {
	                					_this.otherList.splice(i,1);
	                				}
	                			}
	                			return _this.otherList;
	                			_this.otherList.push(r);
	                			console.log(_this.otherList);
	                			break;
	                		default:
	                			break;
	                	}
	            		
	            	} else{
	            		
	            	}
	            })
	        },
	        //获取合同图片
	        getContractImg(){
	        	var _this = this;
	        	console.log(_this.conId);
		        if (!_this.conId) {
		            return false;
		        }
		        _this.$api.post('contractInfo/findConImgs',{
		        	'token': _this.token,
		            'conId':_this.conId
		        },r=>{
		        	console.log("有没有");
		        	console.log(r);
		        	if(r.result=="0000"){
		        		console.log(r)
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
	        //提交合同
		    submitContract() {
		        var _this = this;
				var imgStringArry=[];
				imgStringArry.push(_this.hetongList);
				imgStringArry.push(_this.payList);
				imgStringArry.push(_this.otherList);
				
				var imgString="";
				for(var i=0;i<imgStringArry.length;i++){
					for(var j=0;j<imgStringArry[i].length;j++){
						imgString=imgString+imgStringArry[i][j].imgId+",";
					}
				};
				imgString=imgString.substring(0,imgString.length-1)
		        if (imgString== 0) {
		            mui.toast("请上传拍摄图片");
		            return false;
		        } else {
		        	_this.$api.post("contract/saveContract",{
		        		imgIds: imgString,
		                token:_this.token,
		                oId:_this.oId,
		                platformId:_this.platformId
		        	},r=>{
		        		console.log(r);
		        		var contractNum = r.contractRandomCode;
                        var conID=r.conId;
                        mui.toast("订单资料上传成功");
                        this.$router.push({path: '/mypage',query: {'contractNum': contractNum,'conID':conID,'imgstrings':imgString}});
		        	},r=>{
		        		mui.toast("上传失败，请重新上传");
		        	});
		        }
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
