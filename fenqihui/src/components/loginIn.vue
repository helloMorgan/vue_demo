<template>
 <div class="login_content" id="loginIn">
    <div class="travel-head-nav login_nav" style="display: none;">
        <i class="iconfont-back iconfont  login_iconfont">&#xe603;</i>
    </div>
    <div class="login_background">

    </div>
    <div class="login_container">
        <div class="login_form">
            <div class="login_user_phone clearfix">
                <input type="tel" class="login_tel_input leftFloat" maxlength="11" id="phoneNum" placeholder="请输入手机号" v-model="telPhone">
                <i class="iconfont login_iconfont login_close_btn rightFloat" @click="clearMeaasge()" style="display: block;color:#EDEDED">&#xe65b;</i>
            </div>

            <div class="login_user_code clearfix">
                <input type="tel" class="login_tel_input leftFloat" maxlength="6" id="userCode" placeholder="请输入验证码" v-model="userCode">
                <!--<i class="iconfont login_iconfont line_font" style="visibility: hidden;">&#xe668;</i>-->
                <div class="login_get_code rightFloat" @click="getCode()">
                    <span id="verification_code">{{msText}}</span>
                </div>
            </div>

            <div class="login_register_agree register-same" id="login_register_only">
                <i class="iconfont login_iconfont" :class="{ 'read_deal_state' : isReadDeal, 'read-deal': !isReadDeal}" @click="togglereaddel()">&#xe68a;</i>
                <span class="readDeal"  style="text-decoration:underline" @click="readDealC()">
                    <!--&lt;-->阅读并接受《分期惠平台注册服务协议》
                    <!--&gt;-->
                </span>

            </div>
            <div class="login_submit" @click="submintLogin()">
                登录
            </div>

            <div class="login_register_agree register-same login_register_only" style="text-align:center">
                <a class="readDeal" style="text-decoration:underline" @click="gotoScan();">随便逛逛</a>
            </div>

        </div>

    </div>

    <div id="login_code_state">
        <span class="send-status"></span>
    </div>
</div>
</template>
<script>
    export default {

  data() {
    return {
      telPhone: "",
      userCode:"",
      msText: "获取验证码",
      //阅读协议
      isReadDeal: true,
      //  获取验证码按钮是否可用
      getCodeClick: true,
      state: "1111111111",
      //验证码获取状态
      codeSend: false,
      //发送的登录请求状态
      isSendLogin: true,
      //  手机号校验结果
      resultPhone: false,
      resultCode: false,
      flag: false,
    }
  },
  methods: {
    //清除内容
    clearMeaasge() {
      var vueScope = this;
      vueScope.telPhone = "";
    },
    //点击阅读事件
    togglereaddel() {
       var vueScope = this;
       this.isReadDeal=!this.isReadDeal;
    },
    //获取验证码
    getCode() {
      var vueScope = this;
      vueScope.checkPhone();
      vueScope.resultPhone = true;
      if(vueScope.resultPhone && vueScope.getCodeClick) {
        vueScope.getCodeClick = false;
        vueScope.getCodePort('0000');
      }
    },
    //检查手机规则
    checkPhone() {
      var vueScope = this;
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
      if(vueScope.telPhone == '' || vueScope.telPhone == null||vueScope.telPhone ==undefined) {
        vueScope.resultPhone = false;
        mui.toast("手机号不能为空！");
        return false;
      } else if(!reg.test(vueScope.telPhone)) {
        vueScope.resultPhone = false;
        mui.toast("手机号输入错误！");
        return false;
      } else {
        vueScope.resultPhone = true;
      }
    },
    // 获取验证码
    getCodePort(type) {
      var vueScope = this;
      vueScope.checkPhone()
      if(vueScope.resultPhone == false) {
        mui.toast("请输入正确的手机号！");
        return false;
      }
      vueScope.$api.post('members/PhoneValidate?', {
        'phoneNum': vueScope.telPhone,
        'type': type,
        'plat': 1
      }, r => {
        switch(r.result) {
          case '0000':
            vueScope.codeSend = true;
            mui.toast("发送成功");
            vueScope.backTime(60);
            break;
          case '9999':
            mui.toast("发送成功");
            vueScope.getCodeClick = true;
            break;
          case '9998':
            mui.toast("系统异常");
            vueScope.getCodeClick = true;
            break;
          case '1001':
            mui.toast("手机号无效");
            vueScope.getCodeClick = true;
            break;
          case '1002':
            mui.toast("手机号已经被注册");
            vueScope.getCodeClick = true;
            break;
          case '1005':
            mui.toast("用户不存在");
            vueScope.getCodeClick = true;
            break;
          default:
            mui.toast(r.message);
            vueScope.getCodeClick = true;
            break;
        }
      }, err => {
        console.log("请求失败")
      });

    },
    //显示秒
    backTime(timeout) {
      var vueScope = this;
      vueScope.msText = timeout + "秒后重发";
      var timeController = setInterval(function() {
        timeout--;
        vueScope.msText = timeout + "秒后重发";
        if(timeout <= 0) {
          clearInterval(timeController);
          vueScope.msText = "重新发送";
          //按钮变为可用状态
          vueScope.getCodeClick = true;
        }
      }, 1000);
    },
    //登录
    submintLogin() {
      var vueScope = this;
      if(!vueScope.isReadDeal) {
        mui.toast('必须接受用户协议');
        return;
      }
      if(!vueScope.telPhone || !vueScope.userCode) {
        mui.toast('手机号和验证码是必填的');
        return;
      }
      if(vueScope.getCodeClick){
        mui.toast('请先获取验证码');
        return;  
      }

      var regmobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
      if(!(regmobile.test(vueScope.telPhone))) {
        mui.toast("手机号格式不正确");
        return;
      }
      if(!(new RegExp(/^\d{6}$/)).test(vueScope.userCode)) {
        mui.toast("6位数字验证码格式不对");
        return;
      }

      vueScope.$api.post('members/registOrLogin?', {
        'phoneNum': vueScope.telPhone,
        'code': vueScope.userCode,
        'from': '3'
      }, r => {
        //验证码发送状态弹窗显示
        mui.toast(r.message);
        console.log(r.pType);
        switch(r.result) {
          case '0000':
            localStorage.setItem("fqh_token", r.token);
            localStorage.setItem("accountStatus", r.accountStatus);
            localStorage.setItem("status", r.status);
            localStorage.setItem("mNickName", r.mNickName);
            vueScope.flag = r.flag;

            if(r.status == '1' || vueScope.flag == '1') {
              setTimeout(function() {
                mui.toast("登录成功！正在跳转……");

                history.go(-1);
              }, 100)
            }
            break;
        }
      }, err => {
          mui.toast(err.message);
        console.log("请求失败")
      });

    },
    //去逛逛
    gotoScan(){
        var vueScope=this;
         vueScope.$router.push({
            path: '/'
          }); 
    },
    //去协议
    readDealC(){
        var vueScope=this;
         vueScope.$router.push({
            path: '/registration_protocol'
          });
    }

  }

}</script>

<style>
.login_content {width: 100%;height: 100%;overflow: hidden;overflow: scroll;background: #fff;}
.login_get_code,
.login_iconfont {color: #FFF;z-index: 999;}
.login_user_phone {padding: 0.4rem 0 0.28rem;margin: 0 0.66rem;border-bottom: 1px solid #E1E1E1;}
.login_user_code {padding: 0.28rem 0 0.28rem;margin: 0 0.66rem;border-bottom: 1px solid #E1E1E1;}
.login_get_code {width: 2rem;height: 0.6rem;line-height: 0.6rem;text-align: center;background: url(../images/button_background.png);-webkit-background-size: 100% 100%;background-size: 100% 100%;border-radius: 1rem;-webkit-border-radius:1rem;-moz-border-radius:1rem;}
#login_code_state,
.login_register_shelter {right: 0;left: 0;position: fixed}
#login_code_state,
#login_code_state>span,
.login_submit,
.register-in,
.register-out {text-align: center}
.login_background {width: 100%;height: 6rem;background:url(../images/login_background1.png);-webkit-background-size: 100% 100%;background-size: 100% 100%;}
.login_container {background-color: #FFFFFF;}
#login_code_state {display: none;}
#verification_code{color:#fff;}
.login_form input{margin:0;padding:0;width:auto;height:auto;border:none}
.login_tel_input {float: left;border: none;background-color: transparent;font-size:0.3rem;}
::-webkit-input-placeholder {color: #FFF;font-size: .3rem;}
.login_close_btn {float: right;}
.login_register_agree {margin: 0.26rem 0.66rem 0.4rem; font-size:0.28rem;}
#login_register_only.login_register_agree.register-same>i {color: #DB6D35;font-size: .32rem}
.login_register_agree>i {margin-right: .08rem}
#login_register_only>a {color: #888888}
.login_register_agree a {color: #b6a8ab}
.read-deal { color: gray!important}
.login_submit {margin: 0 0.84rem; margin-top: 0.8rem;padding: 0 0.6rem;height: 0.88rem;line-height: 0.88rem;font-size: 0.3rem;color: #FFFFFF;border-radius: 3px; background: url(../images/button_background.png);-webkit-background-size: 100% 100%;background-size: 100% 100%;}
.line_font {font-size: 0.6rem}
#register-button>a {display: block;height: 1rem;font-size: .36rem;line-height: 1rem;border-radius: 3px}
#register-button {position: fixed;bottom: 0;left: 0;background: #fff;z-index: 100;width: 100%}
.register-in a {color: #fff;background: -webkit-linear-gradient(left, #fed841, #fecc66);background: linear-gradient(to right, #fed841, #fecc66)}
.register-in {margin: 0.48rem 0.56rem .5rem}
.register-out {border: 1px solid;margin: 0 0.56rem .32rem;}
.register-out a {color: #00b19d;-webkit-border-image: -webkit-linear-gradient(red, #00f) 30 30;border-image: -webkit-linear-gradient(red, #00f) 30 30;border-image: linear-gradient(red, #00f) 30 30}
.register-container>div input {-webkit-box-flex: 1;-ms-flex: 1;flex: 1;font-size: .26rem;border: none;outline: 0}
.login_register_shelter {top: 0;bottom: 0;background: rgba(112, 112, 112, .5);z-index: 50;display: none}
#register-button a {display: block;height: 1rem;font-size: .36rem;line-height: 1rem;text-align: center;border-radius: 3px;color: #a55f5a}
#login_code_state {bottom: 20%;margin: auto;z-index: 2000;height: 0.6rem;margin-top:-1.6rem;line-height: 0.6rem}
#login_code_state>span {border: 1px solid #ccc;display: inline-block;padding: 0 0.4rem; height: 100%;line-height: inherit;color: #fff;font-size: .24rem;border-radius: 3px; background: rgba(0, 0, 0, .7)}
input::-webkit-input-placeholder {color: #777!important;font-size:0.3rem!important;}
.login_get_code>span {font-size: 0.24rem!important;}
.buttonbgcolor{background: url(../images/button_background.png);background-size:100% 100%;-webkit-background-size:100% 100%;color:#fff;}
</style>