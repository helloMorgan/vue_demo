/**
 * Created by wuzhicheng on 2017/9/13.
 */
var indexObj = {
  ua: navigator.userAgent,
  ProductType:'',
  init: function () {
    this.guidePageShow();
    this.guideSkip();
  },
  //引导页显示隐藏
  guidePageShow: function () {
    var that=this;
    that.ua == "UASETTING" ? $(".guidePage").show() : $(".guidePage").hide();
  },
  //引导页
  guideSkip:function(){
    var t = 3;
    var time=setInterval(function refer() {
      if(t == 0) {
        $(".guidePage").hide();
        clearInterval(time);
      }
      // $("#show").html(t);
      t--;
    }, 1000);
    $(".skip").click(function(){
      $(".guidePage").hide();
    })

  }
}

$(function () {
  indexObj.init();
});



