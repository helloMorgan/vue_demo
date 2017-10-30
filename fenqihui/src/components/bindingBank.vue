<template>
	<div id="bindingBank">
		<CommonHeader titles="绑定银行卡" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
		
		<section>
			<div class="mui-card marginTop20  mui-row ta">
				<div class="mui-col-sm-3 mui-col-xs-3">
					<span class="binding-label">
						持卡人姓名
					</span>
				</div>
				<div class="mui-col-sm-9 mui-col-xs-9">
					<input type="text" id="" readonly="readonly" :value="mNickName" placeholder="请输入姓名" />
				</div>
			</div>
			<div class="mui-card marginTop20  mui-row">
				<div class="mui-col-sm-3 mui-col-xs-3">
					<span class="binding-label">
						银行卡号
					</span>
				</div>
				<div class="mui-col-sm-9 mui-col-xs-9">
					<input type="text" id="" v-model="paramArry.capAcntNo" placeholder="请输入银行卡号" maxlength="23" onkeyup="this.value=this.value.replace(/\D/g,'').replace(/....(?!$)/g,'$& ')"/>
				</div>
			</div>
			<div class="mui-card marginTop20  mui-row">
				<div class="mui-col-sm-3 mui-col-xs-3">
					<span class="binding-label">
						开户行名称
					</span>
				</div>
				<div class="mui-col-sm-9 mui-col-xs-9">
					<input type="text" id="showUserPicker" value="" v-model="paramArry.bankName" placeholder="请选择开户行名称" @click="pickerClick()"/>
					<i class="mui-icon mui-icon-arrowright mui-pull-right"></i>
				</div>
			</div>
			<div class="mui-card marginTop20  mui-row">
				<div class="mui-col-sm-3 mui-col-xs-3">
					<span class="binding-label" id="userResult">
						手机号
					</span>
				</div>
				<div class="mui-col-sm-9 mui-col-xs-9">
					<input type="tel" id="" v-model="paramArry.mobileNo" placeholder="请输入手机号" maxlength="11" />
				</div>
			</div>
			<div class="mui-card marginTop20  mui-row">
				<div class="mui-col-sm-3 mui-col-xs-3">
					<span class="binding-label">
						验证码
					</span>
				</div>
				<div class="mui-col-sm-9 mui-col-xs-9">
					<input type="tel"  id="verificatCode" v-model="paramArry.code" maxlength="6" placeholder="请输入验证码" @keyup="chekCodeIfNull(paramArry.code)" />
					<button type="button" id="getverificatCode" class="mui-pull-right fontSize30 color-black" @click="getverificatCode()" :disabled="!codeShow">
						<span v-show="codeShow">获取验证码</span>
		         		<span v-show="!codeShow" class="count">重新发送({{timeCount}})</span>
					</button>
				</div>
			</div>
		</section>
		<p class="fontSize20 color-red binding-warning">（请在60秒内完成验证，超时请点击重新发送）</p>
		<button class="btn-color btn-login" @click="putAllInfo" :disabled="btnIfFlag">完成</button>
	</div>
</template>

<script>
	import CommonHeader from '../components/Common_header.vue'
	import picker from '../../static/js/mui.picker.min.js'
	import poppicker from '../../static/js/mui.poppicker.js'
	import pickercss from '../../static/css/mui.picker.min.css'
	import poppickercss from '../../static/css/mui.poppicker.css'
	const TIME_COUNT = 60;
	export default{
		components: { CommonHeader },
		data(){
			return{
				bankNameList:[],
		        codeShow: true,
		        timeCount: '',
		        btnIfFlag:true,
		        paramArry: {
			        code: "",
			        mobileNo: "",
			        bankCode: "",
			        cityCode: "1000",
			        proCode: "110",
			        capAcntNo: "",
			        bankName: ""
		        },
		        //名称
                mNickName:localStorage.getItem('mNickName'),
		        token:getToken(),
			}
		},
		mounted:function () {
			this.$nextTick(function () {
				this.getBankName();
			})
		},
		methods:{
			//获取银行名称
			getBankName(){
				var _this=this;
				var data = {
			       "token": _this.token,
			       'realName': "111",
			       'capAcntNo': "2222"
			     };
			     this.$api.post("account/openAccountFirst",data,r=>{
			     	for (var i=0;i<r.data.bankList.length;i++) {
			     		var strarry={value:r.data.bankList[i].bankCode,text:r.data.bankList[i].bankName}
			     		this.bankNameList.push(strarry);
			     	};
			     },err=>{
			     	mui.toast("请求失败！")
			     	if (err.result="4004") {
						_this.$router.push({
		                  path: '/loginIn'
		                })
					} 
			     });
			},
			//银行卡名插件
			pickerClick(){
				document.activeElement.blur();
				var _this=this;
				(function($, doc) {
					$.init();
					$.ready(function() {
						var userPicker = new $.PopPicker();
						userPicker.setData(_this.bankNameList);
						userPicker.show(function(items) {
							_this.paramArry.bankName = items[0].text;
							_this.paramArry.bankCode=items[0].value;
						});
					});
				})(mui, document);
			},
			//获取验证码
			getverificatCode(){
				if (this.validatemobile(this.paramArry.mobileNo)!=false) {
					var data ={
				       "phoneNum": this.paramArry.mobileNo,
				       "type": '2'
				     };
					this.$api.post('members/PhoneValidate',data,r=>{
						console.log(r);
						switch(r.result) {
				           case '0000':
				             mui.toast("发送成功");
				             this.timeCount = TIME_COUNT;
			                this.codeShow = false;
			                setInterval(() => {
			                  if (this.timeCount > 0 && this.timeCount <= TIME_COUNT) {
			                    this.timeCount--;
			                  } else {
			                    this.codeShow = true;
			                    clearInterval(this.timer);
			                  }
			                }, 1000)
				             break;
				           case '9999':
				             mui.toast("发送短信失败");
				             getCodeClick = true;
				             break;
				           case '1111':
				             mui.toast("发送短信失败") ;
				             getCodeClick = true;
				             break;
				           case '9998':
				            mui.toast("系统异常");
				             prompt(prompt_text);
				             getCodeClick = true;
				             break;
				           case '1001':
				           mui.toast("手机号无效")
				             prompt(prompt_text);
				             getCodeClick = true;
				             break;
				           case '1002':
				             mui.toast("手机号已经被注册");
				             prompt(prompt_text);
				             getCodeClick = true;
				             break;
				           case '1005':
				            mui.toast("用户不存在");
				             prompt(prompt_text);
				             getCodeClick = true;
				             break;
				           default:
				             getCodeClick = true;
				             break;
				         }
					},err=>{
						mui.toast("网络繁忙，稍后再试！")
						if (err.result="4004") {
							this.$router.push({
			                  path: '/loginIn'
			                })
						} 
					});
				} 
				
	        },
	        //验证银行卡号
	         luhmCheck(bankno) {
	         	if(bankno == "") {
	         		mui.toast("请输入银行卡号！")
	         		return false;
	         	}
	         	bankno = bankno.replace(/\s/g, "");
	         	var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）
	         	var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
	         	var newArr = new Array();
	         	for(var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
	         		newArr.push(first15Num.substr(i, 1));
	         	}
	         	var arrJiShu = new Array(); //奇数位*2的积 <9
	         	var arrJiShu2 = new Array(); //奇数位*2的积 >9

	         	var arrOuShu = new Array(); //偶数位数组
	         	for(var j = 0; j < newArr.length; j++) {
	         		if((j + 1) % 2 == 1) { //奇数位
	         			if(parseInt(newArr[j]) * 2 < 9)
	         				arrJiShu.push(parseInt(newArr[j]) * 2);
	         			else
	         				arrJiShu2.push(parseInt(newArr[j]) * 2);
	         		} else //偶数位
	         			arrOuShu.push(newArr[j]);
	         	}

	         	var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
	         	var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
	         	for(var h = 0; h < arrJiShu2.length; h++) {
	         		jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
	         		jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
	         	}

	         	var sumJiShu = 0; //奇数位*2 < 9 的数组之和
	         	var sumOuShu = 0; //偶数位数组之和
	         	var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
	         	var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
	         	var sumTotal = 0;
	         	for(var m = 0; m < arrJiShu.length; m++) {
	         		sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
	         	}

	         	for(var n = 0; n < arrOuShu.length; n++) {
	         		sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
	         	}

	         	for(var p = 0; p < jishu_child1.length; p++) {
	         		sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
	         		sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
	         	}
	         	//计算总和
	         	sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
	         	//计算Luhm值
	         	var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
	         	var luhm = 10 - k;
	         	if(lastNum == luhm) {
	         		//验证通过
	         		return true;
	         	} else {
	         		mui.toast("请输入正确的银行卡号！")
	         		return false;
	         	}
	         },
	         //验证手机号
	         validatemobile(mobile){ 
		       if(mobile.length==0) 
		       { 
		       	mui.toast("请输入手机号！")
		          return false; 
		       }     
		       if(mobile.length!=11) 
		       { 
		       		mui.toast("请输入有效的手机号码！！")
		           return false; 
		       } 
		       var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
		       if(!myreg.test(mobile)) 
		       { 
		           mui.toast("请输入有效的手机号码！！")
		           return false; 
		       } 
		       return true;
			},
	         //检验验证码是否为空和长度
	         chekCodeIfNull(val){
	         	if(val==""||val==null||val.length<3){
//	         		mui.toast("请输入正确的验证码！")
	         		return false;
	         	}else{
	         		this.btnIfFlag=false;
	         	}
	         },
	         //提交
	         putAllInfo(){
	         	var _this=this;
	         	if(!_this.luhmCheck(_this.paramArry.capAcntNo)){
	         		return false;
	         	};
	         	if (_this.paramArry.bankName=="") {
	         		mui.toast("请选择开户行名称！");
	         		return false;
	         	}
	         	if (!_this.validatemobile(_this.paramArry.mobileNo)) {
	         		return false;
	         	}
	         	if(!_this.chekCodeIfNull(_this.paramArry.code)){
	         		mui.toast("请输入正确的验证码！")
	         		return false;
	         	};
	         	var data={
	         		"token": _this.token,
			        "code": _this.paramArry.code,
			        "mobileNo": _this.paramArry.mobileNo,
			        "bankCode": _this.paramArry.bankCode,
			        "cityCode": "1000",
			        "proCode": "110",
			        "capAcntNo":_this.paramArry.capAcntNo.replace(/\s/g, ""),
			        "bankName": _this.paramArry.bankName
	         	}
	         	console.log(data);
	         	_this.$api.post("account/openAccount",data,r=>{
	         		console.log(r);
	         		if(r == undefined) {
	         			mui.toast("登陆过期， 请重新登陆")
			         }
	         		switch (r.result){
	         			case '0000':
	         				mui.toast("绑卡成功");
	         				break;
	         			case '2004':
	         				mui.toast("请填写各类选项");
	         				break;
	         			case '4009':
	         				mui.toast("网咯忙， 请稍后再试");
	         				break;
	         			case '4010':
	         				mui.toast("用户信息不一致");
	         				break;
	         			case '4011':
	         				mui.toast("请先实名验证");
	         				break;
	         			case '4012':
	         				mui.toast("短信验证码有误");
	         				break;
	         			case '2009':
	         				mui.toast("该银行卡已被其他帐号绑定");
	         				break;
	         			case '5836':
	         				mui.toast("绑卡失败,请绑定本人名下的储蓄卡");
	         				break;
	         			case '5344':
	         				mui.toast("绑卡失败,系统错误 5344,请稍后重试");
	         				break;
	         			default:
	         				mui.toast("绑卡失败,请重试"+r.message);
	         				break;
	         		}
	         	},r=>{
	         		mui.toast("网络繁忙请稍后再试！")
	         		if (r.result="4004") {_this.$router.push({ path: '/loginIn'});} 
	         	})
	         }
	     //end
		},
	}
</script>
<style>
	#bindingBank .mui-card{height: 1.20rem;margin: 0.3rem; padding: 0 0.3rem;box-sizing: border-box;}
	#bindingBank .mui-col-sm-3 span{font-size:0.3rem ;color: #555555;text-align: left;border-right: 1px solid #EDEDED;height: 0.6rem;margin: 0.3rem 0;display: block;line-height: 0.6rem;}
	#bindingBank .mui-col-sm-9 input,#showUserPicker,#bindingBank .mui-col-sm-9 button{height: 0.6rem; margin: 0.3rem 0;border: none;background: none;line-height: 0.6rem;font-size: 0.3rem;}
	.binding-warning{text-align: right;padding: 0 0.3rem;}
	#bindingBank .btn-login{margin: 0.56rem auto 0;padding: 0; display: block;}
	#bindingBank .btn-login:active{opacity: 0.5;}
	#bindingBank .mui-icon-arrowright{margin: 0.4rem 0;}
	#showUserPicker{width: 80%;}
	#verificatCode{width: 57%;}
	#getverificatCode{padding: 0!important;margin: 0;}
</style>