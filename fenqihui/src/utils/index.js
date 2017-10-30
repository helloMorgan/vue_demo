var ENCRYPT_CODE = '333';
//判断不同平台
function getTypeNative() {
// alert(ua);
  if(/iphone|ipad|ipod/.test(ua) && /fenqihui/.test(ua)) {
    return 'ios';
  } else if(/android/.test(ua) && /fenqihui/.test(ua)) {
    return 'android';
  } else if(isOpenInWeixin()) {
    return 'weixin'
  } else {
    return false;
  }
}
//get url param
//function GetQueryString(name) {
//var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//var r = window.location.search.substr(1).match(reg);
//console.log( window.location.search)
//if(r != null) {
//  if(getTypeNative()) {
//    return decodeURI(r[2]);
//  }
//  return Decrypt(decodeURI(r[2]), ENCRYPT_CODE);
//}
//return null;
//}

export default {
GetQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
console.log( window.location)
if(r != null) {
    if(getTypeNative()) {
      return decodeURI(r[2]);
    }
    return Decrypt(decodeURI(r[2]), ENCRYPT_CODE);
}
return null;
}
}
