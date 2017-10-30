<template>
    <div id="realName">
        <CommonHeader titles="身份认证" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
        <p class="realName-title">完成实名认证享受高额度分期服务，提升账户安全!</p>
       
        <div class="realName-content">
           <div class="realName-card">
               <a class="process-rate"><img src="../images/realName/process_success1.png"/></a>
               <p class="realName-card-title">上传身份证</p>
               <div class="realName-card-content clearfix">
                   <div class="realName-card-camera leftFloat">
                       <img class="verification-card-success verification-state" src="../images/realName/camera_success.png"/>
                       <img class="verification-card-fail verification-state" src="../images/realName/camera_fail.png"/>
                       <img class="verification-card-show verification-img-show" src="" alt="身份证图片"/>
                       <input type="file" value="上传身份证" class="realName-card-input" name="file" capture="camera" accept="image/*"  @change="previewImg($event,1)"/>
                       <p class="realName-card-inputImg"></p>
                   </div>
                   <div class="realName-card-btngroup rightFloat">
                       <button class="realName-card-rephotograph" :disabled="cardResult?false:true" @click="trigger('realName-card-input')">重拍</button>
                       <button class="realName-card-upload" :disabled="cardResult?false:true" :class="{btnColor:cardResult}" @click="identityCard()">上传</button>
                   </div>
               </div>
           </div>
           <div class="realName-face">
               <a class="process-rate">
                   <img src="../images/realName/process2.png" v-if="!cardResults"/>
                   <img src="../images/realName/process_success2.png" v-else/>
                   
               </a>
               <p class="realName-face-title">人脸识别</p>
               <div class="realName-face-content clearfix">
                   <div class="realName-face-camera leftFloat" @click="faceCamera()">
                       <img class="verification-face-success verification-state" src="../images/realName/camera_success.png"/>
                       <img class="verification-face-fail verification-state" src="../images/realName/camera_fail.png"/>
                       <img class="verification-face-show  verification-img-show" src="" alt="人脸识别图片"/>
                       <!--<input type="file" value="人脸识别" class="realName-face-input" name="file" capture="camera" accept="image/*" @change="previewImg($event,2)"/>-->
                       <p class="realName-face-inputImg"></p>
                   </div>
                   <div class="realName-face-btngroup leftFloat">
                       <button class="realName-face-rephotograph" :disabled="faceResult?false:true" @click="trigger('realName-face-input')">重拍</button>
                       <button class="realName-face-upload" :disabled="faceResult?false:true" :class="{btnColor:faceResult}" @click="uploadFace()">上传</button>
                   </div>
               </div>

           </div>
           <div class="realName-success">
               <a class="process-rate">
                   <img src="../images/realName/process3.png" v-if="!bindCard"/>
                   <img src="../images/realName/process_success3.png" v-else/>
                   
               </a>
               <p class="realName-success-title">认证成功</p>
               
           </div>
           
           <div class="realName-operation clearfix">
               <button class="btn-exit" @click="goback()">退出</button>
               <button class="bind-card" :disabled="bindCard?false:true" :class="{btnColor:bindCard}" @click="bindBank()">绑卡</button>
               
           </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from './Common_header.vue'
import Vue from 'vue'
export default {
//var vm=new Vue({
  components: {
    CommonHeader
  },
  data() {
    return {
      //身份证识别结果
      cardResult: false,
      //人脸识别结果
      faceResult: false,
      //身份证图片
      cardimgUrl: "",
      cardNum: "",
      cardName: "",
      //人脸图片
      faceimgUrl: "",
      //是否能点击
      icClickcard:false,
      icClickface:false,
      bindCard:false,
      //设备
      ua:navigator.userAgent,
      //
      cardResults:false,
      faceResults:false,

    }
  },
  mounted: function() {
    this.$nextTick(function() {
//    showhide($("#realName"),"show");
//    setTimeout(function(){
//        showhide($("#realName"),"hide");
//    },2000)
    window.h5FaceRecognitionCallBack=this.h5FaceRecognitionCallBack;

    })
  },

  methods: {
      
      faceCamera(){
          if(!this.cardResult){
//           $('.realName-face-input').hide();
             mui.toast("请先完成第一步操作");
             return false; 
          }else{
              if(this.ua=="UASETTING"){
                   fenqihui.web_faceRecognition();
              }else{
                  return false;
              }            
          }
      },
      h5FaceRecognitionCallBack(str) {
        var vueScope = this;  
        vueScope.ajaxload(str, dateTime + ".jpg", "2");
      },
    // 上传图片预览
    previewImg(fileObj, num) {
      var fileObj = fileObj.target;
      var file = fileObj.files['0'];
      var vueScope = this;
      if(file) {
        var oReader = new FileReader();
        oReader.onload = function(e) {
          var file = fileObj.value;
          var index = file.lastIndexOf("\\");
          var filename = file.substr(index + 1, file.length);
          console.log("文件名字：" + filename);
          var image = new Image();
          image.src = e.target.result;
          image.onload = function() {
            console.log(image.length);
            var data = compress(image);
            console.warn('image data size:' + data.length);
            if(data.length > 1800000) {
              alert("image too large,pls retry");
              return;
            }
            console.warn('image data size:' + data.length);
            var imgfile = data;
            console.log(imgfile.length);
            console.log("压缩后上传");
            vueScope.ajaxload(imgfile, filename, num);
          };
        };
        oReader.readAsDataURL(file);
      }

    },
    //图片上传..............
    ajaxload(imgfilestring, fileName, imgLabelType) {
      var vueScope = this;
      var data=$.param({
           "imgType": "3",
          "imgLabelType": imgLabelType,
          "imgfile": fileName,
          "base64str": imgfilestring,
          "token": getToken()
       });
      
       $.ajax({
        type: "POST",
        url:BaseUrl+'fqh_upload/imgupload/upload',
        data:data,
        dataType: "json",
        beforeSend: function () {
//          $("#submit").attr("disabled", "disabled");
        showhide($("#realName"),"show");
        },
        success: function(r) {
                if(r.result == "0000") {
                var finalImgUrl = r.finalImgUrl;
                vueScope.cardimgUrl = r.imgUrl;
                if(imgLabelType == 1) {
                  vueScope.cardResult = true;
                  $(".verification-card-show").attr("src", finalImgUrl);
                } else if(imgLabelType == "2") {
                  vueScope.faceResult = true;
                  $(".verification-face-show").attr("src", finalImgUrl);
                }
              } else if((r.result == "4004")||(r.result == "1004")) {
                vueScope.$router.push({
                  path: '/loginIn'
                })
              } else {
                if(imgLabelType == 1) {
                  vueScope.cardResult = false;
                } else if(imgLabelType == 2) {
                  vueScope.faceResult = false;
                }
                mui.toast(res.message);
              }
           },
           complete:function(){
            showhide($("#realName"),"hide");
           },
           err:function(){
               var vueScope=this;
               if((err.result == "4004")||(err.result == "1004")) {
                vueScope.$router.push({
                  path: '/loginIn'
                })
              console.log("请求失败") 
             }
           }
        });

    },
    //触发input点击事件
    trigger(el) {
      $("." + el).trigger("click");
      $("." + el).parent().find(".verification-state").hide();
      $("." + el).parent().find(".verification-img-show").attr("src","");
    },
    //身份证上传
    identityCard() {
      var vueScope = this;
      showhide($("#realName"),"show");
      vueScope.icClickcard=true;
      if(vueScope.icClickcard==true){
          vueScope.$api.post('ocr/ocrInfoWx', {
          imgUrl: vueScope.cardimgUrl,
          token: getToken()
        }, r => {
          showhide($("#realName"),"hide");
          if(r.result == "0000") {
            vueScope.cardNum = r.idCard;
            vueScope.cardName = r.name;
            if(r.idCard && r.name) {
              mui.toast("身份证识别成功, 请继续下一步人脸识别");
              $(".verification-card-success").show();
              $(".realName-card-inputImg").hide();
              $(".realName-card").addClass("realName-line-success");
              vueScope.cardResults=true;
              if(vueScope.ua == "UASETTING") {
                  console.log("在APP打开")
                } else {
                  var inputCamera = '<input type="file" value="人脸识别" class="realName-face-input" name="file" capture="camera" accept="image/*"/>';
                  $(".realName-face-camera").append(inputCamera);
                  $(".realName-face-input").change(function(event){
                      vueScope.previewImg(event,"2")
                  })
                }
            }
          } else if(r.result == "7002") {
            $(".verification-card-fail").show();
            mui.toast("请拍摄清晰身份证照片!");
          } else {
            $(".verification-card-fail").show();
          }

        },
        err => {
          showhide($("#realName"),"hide");  
          $(".verification-card-fail").show();
          console.log("请求失败")
          if (err.result=="4004") {
			this.$router.push({path: '/loginIn'})
			} 
        });
        vueScope.icClickcard=false;
      }
    },
    //上传人脸
    uploadFace() {
      var vueScope = this;
      showhide($("#realName"),"show");
      vueScope.$api.post('ocr/verifyInfoWx', {
          imgUrl: vueScope.cardimgUrl,
          token: getToken(),
          idCard: vueScope.cardNum,
          name: vueScope.cardName
        },
        r => {
          if(r.result == "0000") {
            vueScope.verification();
          } else {
            mui.toast('人脸识别失败,请重试! ' + r.message);
          }

        },
        err => {
          console.log("请求失败");
           mui.toast('人脸识别失败,请重试! ' + r.message);
           if (err.result="4004") {
				this.$router.push({path: '/loginIn'})
			} 
        });
    },
    //验证
    verification() {
      var vueScope = this;
      vueScope.$api.post('members/realNameCertificationForWx', {
          imageId: "wu",
          token: getToken(),
          idCard: vueScope.cardNum,
          realName: vueScope.cardName
        },
        r => {
          showhide($("#realName"),"hide");
          if(r.result === "0000") {
            mui.toast('人脸识别成功,请继续下一步');
            $(".verification-face-success").show();
            $(".realName-face-inputImg").hide();
            $(".realName-face").addClass("realName-line-success");
            vueScope.bindCard=true;
          } else if(r.result === "1203") {
            mui.toast('身份证已被绑定,不能重复绑定,请联系客服找回账号');
          } else if(r.result === "1201") {
            mui.toast('身份证号格式不正确');
          } else {
            mui.toast('实名认证失败');

          }
        },
        err => {
          $(".realName-face-inputImg").hide();
          mui.toast('实名认证失败');
          console.log("请求失败")
          if (err.result="4004") {
				this.$router.push({path: '/loginIn'})
			} 
        });
    },
    goback(){
       window.history.go(-1);
//test();
    },
    //去绑卡
    bindBank(){
        var vueScope=this;
         vueScope.$router.push({
                  path: '/bindingBank'
         })
    },
   
  }
}
//})
//function h5FaceRecognitionCallBack(){
//vm.h5FaceRecognitionCallBack();      
//}

</script>

<style>
#realName{background:#FAFAFA;}
.realName-content{margin:0.3rem 0.46rem;}
.realName-title{font-size:0.3rem;color:#333;margin:0.3rem 0.3rem 0.38rem}
.realName-card,.realName-face,.realName-success{border:1px solid transparent;position: relative;}
.process-rate{position:absolute;width:0.36rem;height:0.35rem;left:-0.18rem;top:-0.18rem;background-color: #fff;border-radius:0.18rem;}
.process-rate>img{width:100%;}
.realName-card,.realName-face{background: url(../images/realName/process_line_fail.png) no-repeat;}
.realName-line-success{background: url(../images/realName/process_line_success.png) no-repeat;}
.realName-face-content,.realName-card-content{margin-top:0.2rem}
.realName-card-title,.realName-face-title,.realName-success-title{margin-top:-0.18rem;margin-left:0.3rem;font-size:0.24rem;color:#333}
.realName-card-camera,.realName-face-camera{position:relative;width:4rem;height:2.44rem;background-color: #fff;border-radius: 5px;margin-bottom:0.34rem;margin-left:0.42rem;}
.realName-face-camera{width:2.1rem;height:2.8rem;}
.realName-card-input,.realName-face-input{opacity:0;z-index:15;position:absolute;left:50%;top:50%;width:1.4rem;height:0.68rem;margin-left:-0.64rem;margin-top:-0.34rem;}
.realName-face-camera img[src=""] {opacity: 0}
.realName-card-camera img[src=""] {opacity: 0}
.verification-state{display: none;}
.verification-face-show,.verification-card-show{position: absolute;left:0;top:0;width:100%;height:100%;border-radius:5px;z-index: 11;}
.realName-card-inputImg,.realName-face-inputImg{z-index:9;position:absolute;left:50%;top:50%;width:0.48rem;height:0.38rem;margin-left:-0.24rem;margin-top:-0.19rem;background: url(../images/realName/camera.png); background-size:100% 100%;}
.verification-card-success,.verification-card-fail,.verification-face-success,.verification-face-fail{position: absolute;left:0;top:0;width:0.4rem;height:0.4rem;z-index: 12;}
.realName-card-btngroup,.realName-face-btngroup{margin-top:0.4rem}
.realName-card-btngroup button,.realName-face-btngroup button{display:block;width:1.8rem;height:0.7rem;line-height:0.7rem;border-radius: 5px;padding:0;border:none;font-size:0.24rem;color:#888;background-color: #EDEDED;}
.realName-face-btngroup{margin-left:0.26rem}
.realName-card-upload,.realName-face-upload{margin-top:0.44rem}
.realName-operation{margin-left:0.6rem;margin-top:0.98rem}
.realName-operation button{display: block;border:none;width:2.5rem;height:0.88rem;line-height:0.88rem;text-align: center;border-radius: 5px;padding:0;font-size:0.3rem;color:#888;background-color: #EDEDED;float:left}
.realName-operation button.bind-card{margin-left:0.8rem}
</style>