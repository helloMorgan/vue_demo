<template>
    <div id="kf">
        <div class="kf-contain">
            <CommonHeader titles="消息中心" :imgChangeFlags="true" :backFlags="false" :backClose="true"></CommonHeader>
            <ul class="mui-table-view mui-table-ul">
                <li class="mui-table-view-cell mui-media">
                    <a href="javascript:;">
                        <img class="mui-media-object mui-pull-left" src="../images/bj.png">
                        <div class="mui-media-body fontSize26 color-black mui-ellipsis">
                            [品质尊享]德+法意瑞13天
                            <p class="mui-ellipsis color-green fontSize20">首付<span class="color-green">3000</span>起</p>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="kf-leavemsg">
            <div class="kf-notips">
                <span class="fontSize26  color-darkgrey">对不起,客服暂时不在线</span>
                <p class="fontSize20  color-darkgrey">如有问题请留言,我们会及时回复,谢谢!</p>
            </div>

                <form class="mui-input-group kf-form">
                    <div class="mui-input-row">
                        <label><i>*</i>姓名:</label>
                        <input type="text">
                    </div>
                    <div class="mui-input-row">
                        <label><i>*&nbsp;</i>QQ:</label>
                        <input type="text">
                    </div>
                    <div class="mui-input-row">
                        <label><i>&nbsp;</i>电话:</label>
                        <input type="text">
                    </div>
                    <div class="mui-input-row">
                        <label><i>*</i>问题:</label>
                    <textarea id="textarea" rows="3"></textarea>
                        
                    </div>
                   
                   
                    <div class="mui-button-row">
                        <button type="button" class="mui-btn mui-btn-primary btn-color" onclick="return false;">提交</button>&nbsp;&nbsp;

                    </div>
                </form>
       
   
            </div>
            <div class="kf-chat">
                <div class="chat-content"></div>
                <!--<div id="image-btn"></div>-->
                <!--<div id="file-btn"></div>-->
                
                <div class="send-msg">
                    <div class="clearfix">
                       <input type="text" class="leftFloat"/>
                       <div class="rightFloat">
                           <img src="../images/smile.png" @click="smileShowtoggle()"/>
                           <!--<span>发送</span>-->
                       </div>
                    </div>
                    <div id="face-con" v-show="smileShow"></div>
                </div>

                
            </div>
        </div>
    </div>
</template>
<script>
    import CommonHeader from './Common_header.vue'
    export default {
        components: {
            CommonHeader
        },
        data(){
             return {
               initSrc:"images/travel/bj.png",
               smileShow:false
            }

        },
        methods:{
            smileShowtoggle () {
                  this.smileShow = !this.smileShow;
                }
        }
    }
</script>
<style>
.kf-contain {position: absolute;height: 100%;width: 100%;background-color: #F5F5F5;z-index: 999;}
.mui-table-ul{width:6rem;height:1.3rem;margin:0 auto;border-radius:0.05rem;margin-top:1.3rem;}
.kf-contain .mui-table-view .mui-media-object {line-height:0.7rem;width:0.7rem;height:0.7rem;}
/*.kf-contain .mui-table-view-cell>a:not(.mui-btn) {margin:-15px;}*/
.kf-contain .mui-table-view:before,.kf-contain .mui-table-view:after{height:0}
.kf-leavemsg .kf-notips{width:6rem;margin:0 auto;text-align: center;margin-top:0.2rem}
.kf-form{width:6.9rem;height:6.7rem;margin:0.2rem auto;background-color: #fff;padding-top:0.06rem;}
.kf-form .mui-button-row button{width:2.5rem;height:0.88rem;border:none;text-align:center;}
.kf-form .mui-button-row{height:initial;clear:both;padding:0.3rem 0}
.kf-form:before,.kf-form:after,.kf-form .mui-input-row:after,.kf-form .mui-input-row:before{height:0}
.kf-form .mui-input-row {height: 40px;margin: 10px 15px;margin-left:5px;overflow:initial;}
.kf-form .mui-input-row label{width:20%;text-align: center;padding:11px 0}
.kf-form .mui-input-row label i{margin-right:10px;color:#EA884F}
.kf-form .mui-input-row label~input,.kf-form .mui-input-row label~textarea{width:80%;border:1px solid #e1e1e1;border-radius: 0.1rem;margin:0.02rem 0}
/*聊天*/
.kf-chat .send-msg{width:100%;position:fixed;left:0;bottom:0;background:#EEEEEE;}
.kf-chat .send-msg>div{padding:15px 0;height:0.7rem;}
.kf-chat .send-msg>div input{width:80%;height:0.7rem;margin-left:0.3rem;}
.kf-chat .send-msg>div div{width:10%;margin-left:3px}
.kf-chat .send-msg>div div>img{width:0.44rem;height:0.44rem;margin-top:0.1rem}
.kf-chat #face-con{width:100%;height: auto;margin: 0 auto;margin-top: 20px;}
.kf-chat #face-con ul li{float:left;}
</style>