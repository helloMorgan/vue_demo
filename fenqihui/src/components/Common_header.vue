<template>
  <header id="coomon-header"  class="mui-bar mui-bar-nav" :class="{'hide':headShow}">
    <img class="img-change" src="../images/switch.png" :class="{'hide':imgChangeFlags}" @click="switchProtype"/>
    <span class="back mui-icon mui-icon-arrowleft" :class="{'hide':backFlags}" onclick="window.history.go(-1)"></span>
    <h1 class="mui-title">{{titles}}</h1>

    <!--消息图标-->
    <!--<div class="mui-pull-right info-con">
        <span class="warning-radius"></span>
        <img class="img-info" src="../images/message.png"/>
    </div>-->

  </header>
</template>
<script>
  export default{
    name:"header",
    data(){
        return{
            
        }
    },
    props:['titles','imgChangeFlags','backFlags','headShow'],
    methods: {
      switchProtype: function () {
//     $(".chooseProduct").show();
//     $(".view-content,.FooterTravel,.FooterWedding").hide();

                this.$router.push({path: '/choose_ptype'});

      }
    }
  }
</script>
<style>
    #coomon-header{height: 0.88rem;position: inherit;background: #fff;}
    #coomon-header .mui-title{height: 0.88rem;line-height:0.88rem ;font-size: 0.36rem;}
    .img-change{height: 0.3rem;margin: 0.29rem 0;}
    /*.info-con{position: relative;width: 0.4rem; height: 0.4rem;margin: 0.22rem 0;}
    .warning-radius{position: absolute;top: 0;right: 0; width: 0.12rem;height: 0.12rem;border-radius: 50%;background: #f42d2d;}
    .img-info{width: 100%}*/
</style>
