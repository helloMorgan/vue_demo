<template>
	<div id="personalCenter">
		<CommonHeader titles="个人中心" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
		
		<section>
			<div class="personal-con">
				<div class="ps-lictcon">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell ps-headercon" >
							<div href="javascript:;" class="mui-daiti-a mui-navigate-right mui-row" @click="changeHeaderImg" >
								<div class="mui-col-sm-6 mui-col-xs-6 ps-headerimg">
									<img :src="headerImage" alt=""/>
								</div>
								<div class="mui-col-sm-6 mui-col-xs-6 mui-text-right">
									<span class="line-height110">更换头像</span>
									<input type="file" id="change" accept="image" @change="change">
								</div>
							</div>
						</li>
						<li class="mui-table-view-cell">
							<a href="#/changeUserName" class="mui-navigate-right mui-row">
								<div class="mui-col-sm-6 mui-col-xs-6">
									用户名
								</div>
								<div class="mui-col-sm-6 mui-col-xs-6  mui-text-right">
									{{mNickName}}
								</div>
							</a>
						</li>
						<li class="mui-table-view-cell ps-bankcon">
							<div class="mui-row" v-if="accountStatus==1">
								<div class="mui-col-sm-3 mui-col-xs-3 lineheight54">
									<span>银行卡</span> 
								</div>
								<div class="mui-col-sm-5 mui-col-xs-5 ps-bank">
									<img :src="'/static/image/bank_icon/'+bankInfo.bankId+'.png'" alt="银行logo"/>
									<div>
										<p class="lineheight30 mui-ellipsis">{{bankInfo.bankName}}</p>
										<p class="fontSize22">(储蓄卡)</p>
									</div>
								</div>
								<div class="mui-col-sm-4 mui-col-xs-4 mui-text-right paddingRight4">
									<span>{{bankInfo.bankNo}}</span>
								</div>
							</div>
							<a href="#/bindingBank" class="mui-row mui-navigate-right" v-else>
								<div class="mui-col-sm-3 mui-col-xs-3 lineheight54">
									<span>银行卡</span> 
								</div>
								<div class="mui-col-sm-9 mui-col-xs-9 ps-bank mui-text-right">
									<span>去绑卡</span>
								</div>
							</a>
						</li>
					</ul>
					<ul class="mui-table-view marginTop20">
						<li class="mui-table-view-cell">
							<a href="#/connonProblems" class="mui-navigate-right mui-row">
								<div class="mui-col-sm-6 mui-col-xs-6">
									常见问题
								</div>
							</a>
						</li>
						<li class="mui-table-view-cell">
							<a href="#/aboutUs" class="mui-navigate-right mui-row">
								<div class="mui-col-sm-6 mui-col-xs-6">
									关于我们
								</div>
							</a>
						</li>
						<li class="mui-table-view-cell">
							<a href="tel:400-898-6658" class="mui-navigate-right mui-row">
								<div class="mui-col-sm-6 mui-col-xs-6">
									客服电话
								</div>
								<div class="mui-col-sm-6 mui-col-xs-6  mui-text-right">
									400-898-6658
								</div>
							</a>
						</li>
					</ul>
				</div>
				<div>
					<div   class="btn-color btn-login btn-exitlogin" @click="exitLogin()">退出登录</div>
				</div>
				<!--联系客服-->
				<!--<div id="kfphone" class="mui-popover mui-popover-action mui-popover-bottom" style="display: block;">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell">
							<a href="tel:400-898-6658">拨打客服电话</a>
						</li>
					</ul>
					<ul class="mui-table-view">
						<li class="mui-table-view-cell" @click="telkf()">
							取消
						</li>
					</ul>
				</div>-->
				<!--裁切头像蒙层-->
				<div class="mui-backdrop"  v-show="panel">  
			      <div class="clipPosition">  
			        <img id="image" :src="url" alt="Picture">  
			      </div>  
			      <button type="button" class="btn-color color-white btn-login btn-clip" id="button" @click="crop">确定</button>  
			    </div>  
			</div>
		</section>
	</div>
</template>

<script>
	import CommonHeader from '../../components/Common_header.vue'
	import Cropper from 'cropperjs'
	export default{
		components: { CommonHeader },
		data(){
			return{
				 headerImage:'',  
			      picValue:'',  
			      cropper:'',  
			      croppable:false,  
			      panel:false,  
			      url:'',
			       token: getToken(),
                  //实名
                  status:localStorage.getItem('status'),
                  //绑卡
                  accountStatus:localStorage.getItem('accountStatus'),
                  //名称
                  mNickName:localStorage.getItem('mNickName'),
                  //银行卡
                  bankInfo:[],
			}
		},
		mounted () {  
		    //初始化这个裁剪框  
		    var self = this;
		    var image = document.getElementById('image');
		    var screenWidth = $(window).width();
		    var screenHeight = $(window).height();
		    this.cropper = new Cropper(image, {
		    	resizable: false,
		    	cropBoxMovable: false,
		    	cropBoxResizable: false,
		    	aspectRatio: 1,
		    	viewMode: 1,
		    	guides: false,
		    	background: false,
		    	minContainerHeight: screenHeight,
		    	minContainerWidth: screenWidth,
		    	dragMode: "move",
		    	ready: function() {
		    		self.croppable = true;
		    	}
		    });
		    this.$nextTick(function() {
		    	this.isLogin();
		    })

		    },
		    methods: {//更换头像
			changeHeaderImg(){
				$("#change").click();
			},
			//拨打客服电话
//			telkf(){
//				mui('#kfphone').popover('toggle');
//			},
			//裁剪头像
			getObjectURL (file) {  
				var url = null ;   
				if (window.createObjectURL!=undefined) { // basic  
				  url = window.createObjectURL(file) ;  
				} else if (window.URL!=undefined) { // mozilla(firefox)  
				  url = window.URL.createObjectURL(file) ;  
				} else if (window.webkitURL!=undefined) { // webkit or chrome  
				  url = window.webkitURL.createObjectURL(file) ;  
				}  
				return url ;  
		    },  
		    change (e) {  
		      let files = e.target.files || e.dataTransfer.files;  
		      if (!files.length) return;  
		      this.panel = true;  
		      this.picValue = files[0];  
		        
		      this.url = this.getObjectURL(this.picValue);  
		      //每次替换图片要重新得到新的url  
		      if(this.cropper){  
		        this.cropper.replace(this.url);  
		      }  
		      this.panel = true;  
		  
		    },  
		    crop () {  
		        this.panel = false;  
		        var croppedCanvas;  
		        var roundedCanvas;  
		  
		        if (!this.croppable) {  
		          return;  
		        }  
		        // Crop  
		        croppedCanvas = this.cropper.getCroppedCanvas();  
		        console.log(this.cropper)  
		        // Round  
		        roundedCanvas = this.getRoundedCanvas(croppedCanvas);  
		  
		        this.headerImage = roundedCanvas.toDataURL();  
		        this.postImg()  
		          
		    },  
		    getRoundedCanvas (sourceCanvas) {  
		        
		      var canvas = document.createElement('canvas');  
		      var context = canvas.getContext('2d');  
		      var width = sourceCanvas.width;  
		      var height = sourceCanvas.height;  
		        
		      canvas.width = width;  
		      canvas.height = height;  
		  
		      context.imageSmoothingEnabled = true;  
		      context.drawImage(sourceCanvas, 0, 0, width, height);  
		      context.globalCompositeOperation = 'destination-in';  
		      context.beginPath();  
		      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);  
		      context.fill();  
		  
		      return canvas;  
		    },  
		    postImg () {  
		      //这边写图片的上传  
		    }  ,
		    //裁剪头像结束
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
							_this.checkBank();
							return true;
						}
					}
				}
			},
			//查询银行卡
			checkBank() {
				var _this=this;
				_this.$api.post("members/bankInfo",{
					'token': _this.token,
				},r=>{
					console.log(r);
					_this.bankInfo=r;
					return _this.bankInfo;
				})
			},
			//退出登录
			exitLogin(){
				var _this=this;
				var btnArray = ['取消', '确定'];
				mui.confirm('', '确认退出登录?', btnArray, function(e) {
					if (e.index == 1) {
						var ProductType;
					    ProductType=localStorage.getItem('ProductType');
					    localStorage.clear();
					    localStorage.setItem('ProductType',ProductType);
						_this.$router.push({
		                  path: '/homepage'
		                })
					} else {
						
					}
				});
			},

		},
	}
</script>

<style>
	.personal-con{background: #FFFFFF;}
	.personal-con *{font-size: 0.3rem;color: #333333;}
	.ps-headerimg img{width: 1.1rem;height: 1.1rem;border-radius: 50%;display: block;background-image: url(../../images/personalcenter/personal-headerimg.png);background-size: 100% 100%;}
	.personal-con .mui-table-view-cell{padding:  0.2rem 0.3rem; height: 0.96rem;line-height: 0.56rem;}
	.personal-con .ps-headercon,.ps-headercon>a:not(.mui-btn),.mui-daiti-a{height: 1.5rem!important;}
	.ps-headercon input[type='file']{display: none;}
	.mui-daiti-a{position: relative;display: block; overflow: hidden; margin: -11px -15px;padding: inherit; white-space: nowrap;text-overflow: ellipsis; color: inherit;}
	.personal-con .mui-table-view-cell>a:not(.mui-btn),.mui-daiti-a,.mui-phone-a{margin: -0.2rem -0.3rem;padding:0.2rem 0.7rem 0.2rem 0.3rem;height: 0.96rem;}
	/*.personal-con .mui-navigate-right:after, .mui-push-right:after{right: 0.3rem;color: #333333;font-size: 0.4rem;}*/
	.line-height110{line-height: 1.1rem;}
	.personal-con .mui-table-view-cell:after{left: 0;}
	.personal-con .mui-table-view:before,.personal-con .mui-table-view:after{height: 0;}
	.personal-con .fontSize22{font-size: 0.22rem;line-height: 0.22rem;margin-top: 0.01rem;}
	.ps-bank img{width: 0.5rem;height: 0.5rem;border-radius: 50%;}
	.ps-bank>div{display: inline-block;}
	.ps-bankcon{height: 0.96rem;}
	.ps-bankcon span{line-height: 0.54rem;}
	.ps-lictcon{background: #FAFAFA;padding: 0.2rem 0;}
	.btn-exitlogin{color: #FFFFFF!important;margin: 1.02rem auto 2rem;display: block;}
	.clipPosition{width: 100%;height: 8rem;background-color: rgba(0,0,0,0);margin:auto;}
	.personal-con .mui-backdrop { background-color: rgba(0,0,0,.8);}
	.btn-clip{position: absolute;bottom: 1rem;padding: 0;left: 50%;margin-left: -2.9rem;color: #FFFFFF!important;}
	.personal-con .mui-ellipsis{width: 2rem;}
	.personal-con .paddingRight4{padding-right: 0.4rem;}
/*!  
 * Cropper.js v1.0.0-rc  
 * https://github.com/fengyuanchen/cropperjs  
 *  
 * Copyright (c) 2017 Fengyuan Chen  
 * Released under the MIT license  
 *  
 * Date: 2017-03-25T12:02:21.062Z  
 */  
  
	.cropper-container {
		font-size: 0;
		line-height: 0;
		position: relative;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		direction: ltr;
		-ms-touch-action: none;
		touch-action: none
	}
	.cropper-container img {
		/* Avoid margin top issue (Occur only when margin-top <= -height) */
		display: block;
		min-width: 0 !important;
		max-width: none !important;
		min-height: 0 !important;
		max-height: none !important;
		width: 100%;
		height: 100%;
		image-orientation: 0deg
	}
	.cropper-wrap-box,
	.cropper-canvas,
	.cropper-drag-box,
	.cropper-crop-box,
	.cropper-modal {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.cropper-wrap-box {
		overflow: hidden;
	}
	.cropper-drag-box {
		opacity: 0;
		background-color: #fff;
	}
	.cropper-modal {
		opacity: .5;
		background-color: #000;
	}
	.cropper-view-box {
		display: block;
		overflow: hidden;
		width: 100%;
		height: 100%;
		outline: 1px solid #39f;
		outline-color: rgba(51, 153, 255, 0.75);
	}
	.cropper-dashed {
		position: absolute;
		display: block;
		opacity: .5;
		border: 0 dashed #eee
	}
	.cropper-dashed.dashed-h {
		top: 33.33333%;
		left: 0;
		width: 100%;
		height: 33.33333%;
		border-top-width: 1px;
		border-bottom-width: 1px
	}
	.cropper-dashed.dashed-v {
		top: 0;
		left: 33.33333%;
		width: 33.33333%;
		height: 100%;
		border-right-width: 1px;
		border-left-width: 1px
	}
	.cropper-center {
		position: absolute;
		top: 50%;
		left: 50%;
		display: block;
		width: 0;
		height: 0;
		opacity: .75
	}
	.cropper-center:before,
	.cropper-center:after {
		position: absolute;
		display: block;
		content: ' ';
		background-color: #eee
	}
	.cropper-center:before {
		top: 0;
		left: -3px;
		width: 7px;
		height: 1px
	}
	.cropper-center:after {
		top: -3px;
		left: 0;
		width: 1px;
		height: 7px
	}
	.cropper-face,
	.cropper-line,
	.cropper-point {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		opacity: .1;
	}
	.cropper-face {
		top: 0;
		left: 0;
		background-color: #fff;
	}
	.cropper-line {
		background-color: #39f
	}
	.cropper-line.line-e {
		top: 0;
		right: -3px;
		width: 5px;
		cursor: e-resize
	}
	.cropper-line.line-n {
		top: -3px;
		left: 0;
		height: 5px;
		cursor: n-resize
	}
	.cropper-line.line-w {
		top: 0;
		left: -3px;
		width: 5px;
		cursor: w-resize
	}
	.cropper-line.line-s {
		bottom: -3px;
		left: 0;
		height: 5px;
		cursor: s-resize
	}
	.cropper-point {
		width: 5px;
		height: 5px;
		opacity: .75;
		background-color: #39f
	}
	.cropper-point.point-e {
		top: 50%;
		right: -3px;
		margin-top: -3px;
		cursor: e-resize
	}
	.cropper-point.point-n {
		top: -3px;
		left: 50%;
		margin-left: -3px;
		cursor: n-resize
	}
	.cropper-point.point-w {
		top: 50%;
		left: -3px;
		margin-top: -3px;
		cursor: w-resize
	}
	.cropper-point.point-s {
		bottom: -3px;
		left: 50%;
		margin-left: -3px;
		cursor: s-resize
	}
	.cropper-point.point-ne {
		top: -3px;
		right: -3px;
		cursor: ne-resize
	}
	.cropper-point.point-nw {
		top: -3px;
		left: -3px;
		cursor: nw-resize
	}
	.cropper-point.point-sw {
		bottom: -3px;
		left: -3px;
		cursor: sw-resize
	}
	.cropper-point.point-se {
		right: -3px;
		bottom: -3px;
		width: 20px;
		height: 20px;
		cursor: se-resize;
		opacity: 1
	}
	@media (min-width: 768px) {
		.cropper-point.point-se {
			width: 15px;
			height: 15px
		}
	}
	
	@media (min-width: 992px) {
		.cropper-point.point-se {
			width: 10px;
			height: 10px
		}
	}
	@media (min-width: 1200px) {
		.cropper-point.point-se {
			width: 5px;
			height: 5px;
			opacity: .75
		}
	}
	.cropper-point.point-se:before {
		position: absolute;
		right: -50%;
		bottom: -50%;
		display: block;
		width: 200%;
		height: 200%;
		content: ' ';
		opacity: 0;
		background-color: #39f
	}
	.cropper-invisible {
		opacity: 0;
	}
	.cropper-bg {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
	}
	.cropper-hide {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
	}
	.cropper-hidden {
		display: none !important;
	}
	.cropper-move {
		cursor: move;
	}
	.cropper-crop {
		cursor: crosshair;
	}
	.cropper-disabled .cropper-drag-box,
	.cropper-disabled .cropper-face,
	.cropper-disabled .cropper-line,
	.cropper-disabled .cropper-point {
		cursor: not-allowed;
	}
</style>