<template>
	<div id="userName">
		<CommonHeader titles="关于我们" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
		<section>
			<div class="userName-con">
				<div class="mui-card marginTop20  mui-row ta">
					<div class="mui-col-sm-3 mui-col-xs-3">
						<span class="binding-label">
							用户名
						</span>
					</div>
					<div class="mui-col-sm-9 mui-col-xs-9"><input type="text" id="" v-model="mNickName" placeholder="请输入用户名" @keyup="changeBtnColor()"></div>
				</div>
				<button class="btn-color btn-login" @click="uploadMyname()" :class="{'btnColorEd':btnColorEdFlag}">确定</button>
			</div>
		</section>
	</div>
</template>

<script>
	import CommonHeader from '../../components/Common_header.vue'
	export default{
		components: { CommonHeader },
		data(){
			return{
				 //名称
                  mNickName:localStorage.getItem('mNickName'),
                  btnColorEdFlag:true,
			}
		},
		mounted: function () {
		  this.$nextTick(function () {
		  })
		},
		methods:{
			//修改按钮颜色
			changeBtnColor(){
				var _this=this;
				if (_this.mNickName.length>0) {
					_this.btnColorEdFlag=false;
				} else{
					_this.btnColorEdFlag=true;
				}
			},
			//提交用户名
			uploadMyname(){
				var _this=this;
				if(_this.btnColorEdFlag==false){
					//可提交
					_this.$api.post("members/modifyNickName",{
						'token':getToken(),
                		'nickName':_this.mNickName
					},r=>{
						console.log(r)
						if(r.result=="0000"){
							localStorage.setItem("mNickName", _this.mNickName);
							_this.$router.push({
								path:'/personalCenter'
							});
						}
					},err=>{
						mui.toast("网络繁忙请重试！")
						if (err.result="4004") {
								_this.$router.push({path: '/loginIn'})
						} 
					});
					
				}else{
					mui.toast("请输入用户名！")
				}
			}
		},
	}
</script>

<style>
	#userName .mui-card{height: 1.20rem;margin: 0.3rem; padding: 0 0.3rem;box-sizing: border-box;}
	#userName .mui-col-sm-3 span{font-size:0.3rem ;color: #555555;text-align: left;border-right: 1px solid #EDEDED;height: 0.6rem;margin: 0.3rem 0;display: block;line-height: 0.6rem;}
	#userName .mui-col-sm-9 input{height: 0.6rem; margin: 0.3rem 0;border: none;background: none;line-height: 0.6rem;font-size: 0.3rem;color: #888888;}
	#userName .btn-login{padding: 0;margin: 0.68rem 0;}
	#userName .btn-login:active{opacity: 0.2;}
	.userName-con{text-align: center;}
	#userName .btnColorEd{background:#888888!important;color: #FFFFFF;}
</style>