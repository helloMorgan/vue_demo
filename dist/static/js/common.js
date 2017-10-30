/**
 * Created by wuzhicheng on 2017/9/13.
 */
//rem
;
//var BaseUrl = 'http://fqh.fenqihui.com/';
var BaseUrl = 'http://ceshi1.fenqihui.com/';
var dates = new Date();
var dateTime = dates.getFullYear() + "-" + (dates.getMonth() + 1) + "-" + dates.getDate();
(function(win, lib) {
  var doc = win.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var flexibleEl = doc.querySelector('meta[name="flexible"]');
  var dpr = 0;
  var scale = 0;
  var tid;
  var flexible = lib.flexible || (lib.flexible = {});

  if(metaEl) {
    console.warn('将根据已有的meta标签来设置缩放比例');
    var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
    if(match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale);
    }
  } else if(flexibleEl) {
    var content = flexibleEl.getAttribute('content');
    if(content) {
      var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
      var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
      if(initialDpr) {
        dpr = parseFloat(initialDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
      if(maximumDpr) {
        dpr = parseFloat(maximumDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
    }
  }

  if(!dpr && !scale) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if(isIPhone) {
      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if(devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if(devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1;
    }
    scale = 1 / dpr;
  }

  docEl.setAttribute('data-dpr', dpr);
  if(!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if(docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      var wrap = doc.createElement('div');
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
  }

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    if(width / dpr > 540) {
      width = 540 * dpr;
    }
    var rem = width / 7.5;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
  }

  win.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', function(e) {
    if(e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if(doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px';
  } else {
    doc.addEventListener('DOMContentLoaded', function(e) {
      doc.body.style.fontSize = 12 * dpr + 'px';
    }, false);
  }

  refreshRem();

  flexible.dpr = win.dpr = dpr;
  flexible.refreshRem = refreshRem;
  flexible.rem2px = function(d) {
    var val = parseFloat(d) * this.rem;
    if(typeof d === 'string' && d.match(/rem$/)) {
      val += 'px';
    }
    return val;
  }
  flexible.px2rem = function(d) {
    var val = parseFloat(d) / this.rem;
    if(typeof d === 'string' && d.match(/px$/)) {
      val += 'rem';
    }
    return val;
  }

})(window, window['lib'] || (window['lib'] = {}));

//数组
Array.prototype.indexOf = function(val) {
  for(var i = 0; i < this.length; i++) {
    if(this[i] == val) return i;
  }
  return -1;
};
Array.prototype.rM = function(val) {
  var index = this.indexOf(val);
  if(index > -1) {
    this.splice(index, 1);
  }
};
//数组字符串类型转为浮点数
 function parseFloatArr(arr) {
  var newArr = [];
  for(var i = 0; i < arr.length; i++) {
    newArr[i] = parseFloat(arr[i]);
  }      
  return newArr;
};
    // 自动添加千位符
function formatNum(str) {
    var newStr = "";
    var count = 0;
    str = str.toString();
    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr + ".00"; //自动补小数点后两位
    } else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
    }
    return str;
};
//    使用canvas对大图片进行压缩
function compress(img) {
  var MAX_ID_CARD_W = 1000;
  var MAX_ID_CARD_H = 1000;

  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  var _w = img.width,
    _h = img.height;
  var _asp = img.width / img.height;
  //计算等比缩小后图片宽高
  if(_asp > 1) {
    cvs.width = MAX_ID_CARD_W;
    cvs.height = MAX_ID_CARD_W / _asp;
  } else {
    cvs.width = MAX_ID_CARD_H * _asp;
    cvs.height = MAX_ID_CARD_H;
  }
  ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
  var fileType = 'image/jpeg';
  var newImageData = cvs.toDataURL(fileType, 1);
  var sendData = newImageData.replace("data:" + fileType + ";base64,", '');
  console.warn("sendData size:" + sendData.length);
  var ndata = sendData;
  return ndata;
}
function commonObj(parentDiv,imgSrc,hideShow){
 if(imgSrc==null){
   imgSrc="static/image/loadgif.gif";
 }
 this.imgSrc=imgSrc;
 this.hideShow=hideShow;
 this.parentDiv=parentDiv;
}
commonObj.prototype.showpopup=function(){
   var loadingdivs=$('<div id="loadingdiv"><img src="'+this.imgSrc+'"></div>');
   if(this.hideShow=="show"){
     this.parentDiv.append(loadingdivs);
   }else if(this.hideShow=="hide"){
     $("#loadingdiv").remove()
   }
}
function showhide(parentDiv,hideshow){  
 var box=new commonObj(parentDiv,null,hideshow);  
 box.showpopup();  
}  


//检测android ios 手机版本 当版本大于 ** 时  开启动画效果
$.fn.animateCss = function(animationName) {
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  $(this).addClass('animated ' + animationName).one(animationEnd, function() {
    $(this).removeClass('animated ' + animationName);
  });
};

//click toggle style
$.fn.select_css = function(className) {
  $(this).addClass(className);
  $(this).siblings().removeClass(className);
};
//支付提交的公共方法
function StandardPost(e, t) {

    var n = $("<form id='StandardPostForm' method='post' accept-charset='utf-8'></form>");
    n.attr({
        action: e
    });
    for (var i in t) {
        var r = $("<input type='hidden'>");
        r.attr({
            name: i
        }), r.val(t[i]), n.append(r)
    }
    $(document.body).append(n);
    $('#StandardPostForm').submit();
}
//转整数
function getAsInt(o) {
  if(isNaN(parseInt(o))) {
    return 0;
  } else {
    return parseInt(o);
  }
}
//新增status方法
function getOrderElementIsAllow(typeKey, statusValue) {
  //107,108,303,304,104,203,202,503,601,602
  //资料可见:  108 - 602
  //资料可编辑: 108|303
  //还款计划可见:  203 - 602
  var status = {};
  status.assetAllowStatus = [108, 303, 304, 104, 203, 202, 503, 601, 602];
  status.assetEditableAllowStatus = [108, 303];
  status.payPlanAllowStatus = [203, 202, 503, 601, 602];

  var sts = status[typeKey];
  if(sts) {
    for(var i = 0; i < sts.length; i++) {
      if(sts[i] == statusValue) {
        return true;
        break;
      }
    }
    return false;
  } else {
    return false;
  }
}
//取token
function getToken() {
  var tk = localStorage.getItem('fqh_token');
  return tk ? tk : false;
}
//判断浏览器类型
var browser = {
  versions: function() {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return { //移动终端浏览器版本信息  
      trident: u.indexOf('Trident') > -1, //IE内核  
      presto: u.indexOf('Presto') > -1, //opera内核  
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器  
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器  
      iPad: u.indexOf('iPad') > -1, //是否iPad  
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
var browserType;
(function getbrowserType() {
  if(browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面  
    var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象  
    if(ua.match(/MicroMessenger/i) == "micromessenger") {
      //在微信中打开  

      //  setInterval(WeixinJSBridge.call('closeWindow'), 2000);
      browserType = "browserW";
      return false;
    }
    if(ua.match(/WeiBo/i) == "weibo") {
      //在新浪微博客户端打开  
    }
    if(ua.match(/QQ/i) == "qq") {
      //在QQ空间打开  
    }
    if(browser.versions.ios) {
      //是否在IOS浏览器打开 
      console.log("ios浏览器");
      browserType = "browserI";
      $(".FooterTravel").hide();
      $(".FooterWedding").hide();
      $(".chooseWedding").css("margin-top","0.5rem");
      $(".chooseProductTitle").css("padding-bottom","0.8rem");
      return false;

    }
    if(browser.versions.android) {
      //是否在安卓浏览器打开  
      console.log("安卓浏览器");
      browserType = "browserA";
      $(".FooterTravel").hide();
      $(".FooterWedding").hide();
      $(".chooseWedding").css("margin-top","0.3rem");
      $(".chooseProductTitle").css("padding-bottom","0.5rem");
      return false;
    }

  } else {
    //否则就是PC浏览器打开  
    //window.close();  
  }

})()