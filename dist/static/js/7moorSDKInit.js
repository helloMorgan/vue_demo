/**
 * Created by yaxi on 2015-12-18.
 */
var qiniuDomain = "fs-im-kefu.7moor.com";
var qiniuKmDomain = "fs-km.7moor.com";
var chatUtils = {
    emojiFaces: [
        ['smile', 'smiley', 'laughing', 'blush'],
        ['heart_eyes', 'smirk', 'flushed', 'kissing_heart'],
        ['grin', 'wink', 'stuck_out_tongue_winking_eye', 'stuck_out_tongue_closed eyes'],
        ['sleeping', 'worried', 'expressionless', 'sweat_smile'],
        ['joy', 'cold_sweat', 'sob', 'angry'],
        ['mask', 'scream', 'sunglasses', 'heart'],
        ['broken_heart', 'star', 'anger', 'exclamation'],
        ['question', 'zzz', 'thumbsup', 'thumbsdown'],
        ['ok_hand', 'punch', 'yeah', 'clap'],
        ['muscle', 'pray', 'skull', 'trollface']
    ],

    initFace: function () {
        $("#face-con ul").html("");
        var x = 25, y = 25;
        for (var i = 0; i < chatUtils.emojiFaces.length; i++) {
            for (var j = 0; j < chatUtils.emojiFaces[i].length; j++) {
                var li = '<li title="' + chatUtils.emojiFaces[i][j] + '"><span onclick="window.getEmojiCode(\'' + chatUtils.emojiFaces[i][j] + '\')" title="' + chatUtils.emojiFaces[i][j] + '" class="emoji-face" style="background-position: ' + (-(x * j)) + 'px ' + (-(y * i)) + 'px;"></span></li>';
                $("#face-con ul").append(li);
            }
        }
    },
    regExpEmoji: function (message) {
        var convert = true;
        if ("string" == typeof message) {
            convert = true;
        } else {
            convert = message.showHtml ? false : true;
            message = message.content;
        }
        if (convert) {
            message = message.replace(/</g, "&lt;");
            message = message.replace(/>/g, "&gt;");
        }
        message = message.replace(/\r\n/g, "</br>");
        message = message.replace(/\r/g, "</br>");
        message = message.replace(/\n/g, "</br>");
        message = chatUtils.replaceImQiniuDomain(message);
        var x = 25, y = 25;
        for (var i = 0; i < chatUtils.emojiFaces.length; i++) {
            for (var j = 0; j < chatUtils.emojiFaces[i].length; j++) {
                var span = '<span class="emoji-face" style="background-position: ' + (-(x * j)) + 'px ' + (-(y * i)) + 'px;"></span>';
                var pattern = new RegExp(":" + chatUtils.emojiFaces[i][j] + ":", "g")
                if (message == undefined || message == null || message == "") return;
                message = message.replace(pattern, span);
            }
        }
        return message;
    },

    isFromMobile: function () {
        var agent = navigator.userAgent.toLowerCase();
        var ipad = agent.match(/(ipad).*os\s([\d_]+)/),
            isIphone = !ipad && agent.match(/(iphone\sos)\s([\d_]+)/),
            isAndroid = agent.match(/(android)\s+([\d.]+)/),
            isWinPhone = agent.match(/(windows mobile)\s+([\d.]+)/),
            isMobile = ipad || isIphone || isAndroid || isWinPhone;
        if (isMobile) {
            return true;
        }
        return false;
    },

    getTimestamp: function () {
        return new Date().getTime();
    },

    getCurrentDate: function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        month = month + 1 > 9 ? month + 1 : '0' + (month + 1);
        day = day > 9 ? day : '0' + day;
        return year + "-" + month + "-" + day;
    },

    getCurrentDateTime: function () {
        var date = new Date();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        hour = hour > 9 ? hour : '0' + hour;
        minutes = minutes > 9 ? minutes : '0' + minutes;
        seconds = seconds > 9 ? seconds : '0' + seconds;
        return hour + ":" + minutes + ":" + seconds;
    },

    validateImageType: function (imageType) {
        return imageType.indexOf("jpg") == -1 && imageType.indexOf("png") == -1
            && imageType.indexOf("bmp") == -1 && imageType.indexOf("jpeg") == -1
            && imageType.indexOf("gif") == -1
    },
    getCookie: function (key) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (arr[0] == key)
                return arr[1];
        }
        return "";
    },

    setCookie: function (obj, value, exp, domain) {
        var cookieTime = 24 * 60 * 60 * 1000;
        if (exp) {
            cookieTime = cookieTime * exp;
        }
        var d = new Date();
        d.setTime(d.getTime() + cookieTime);
        var cookieExpires = "; expires=" + d.toGMTString();
        var domainStr = "";
        if (domain && domain != undefined) {
            domainStr = "; domain=" + domain;
        }
        if ("string" == typeof obj) {
            document.cookie = obj + "=" + encodeURIComponent(value) + cookieExpires + domainStr + "; path=/";
        } else {
            for (var key in obj) {
                document.cookie = key + "=" + encodeURIComponent(obj[key]) + cookieExpires + domainStr + "; path=/";
            }
        }

    },

    parseQuerystring: function () {
        var href = window.location.href;
        var queryStr = href.substr(href.indexOf("?") + 1);
        if ("string" != typeof queryStr)return {};
        var queryStr = queryStr.trim();
        if ("" === queryStr)return {};

        var json = {};
        try {
            for (var pairs = queryStr.split("&"), i = 0; i < pairs.length; i++) {
                var kv = pairs[i].split("=");
                kv[0] && kv[1] && (json[kv[0]] = decodeURIComponent(kv[1]))
            }
        } catch (e) {

        }
        return json;
    },

    ajaxJsonPRequest: function (url, method, timeout, data, successCallback, errorCallback) {

        var ajaxParam = {
            type: method,
            url: url,
            timeout: timeout,
            cache: false,
            dataType: "jsonp",
            jsonp: "callback",
            success: successCallback,
            error: errorCallback,
        };
        if (data) {
            ajaxParam.data = data;
        }
        $.ajax(ajaxParam);
    },

    ajaxRequest: function (url, method, timeout, data, successCallback, errorCallback) {
        var ajaxParam = {
            type: method,
            url: url,
            timeout: timeout,
            cache: false,
            success: successCallback,
            error: errorCallback
        };
        if (data) {
            ajaxParam.data = data;
        }
        $.ajax(ajaxParam);
    },

    generateShortUuid : function(uuid){
        var arry =  [ "a", "b", "c", "d", "e", "f",
            "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
            "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",
            "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I",
            "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
            "W", "X", "Y", "Z" ];
        uuid = uuid.replace(/-/g, "");
        var shortBuffer = '';
        for (var i = 0; i < 8; i++) {
            var str = uuid.substring(i * 4, i * 4 + 4);
            var x = parseInt(str, 16);
            shortBuffer += (arry[x % 0x3E]);
        }
        return shortBuffer;
    },
    replaceImQiniuDomain: function (filePath) {
        var regex = /(http:\/\/7xntwc(.*)clouddn.com\/)|(http:\/\/7xntwc(.*)qiniucdn.com\/)/;
        var newFilePath = filePath.replace(regex, "//"+qiniuDomain+"/");
        newFilePath = newFilePath.replace("http://"+qiniuDomain+"/", "//"+qiniuDomain+"/");
        var regex2 = new RegExp("http://"+qiniuKmDomain+"/","g");
        newFilePath = newFilePath.replace(regex2, "//"+qiniuKmDomain+"/");
        return newFilePath;
    }

};

var socket = undefined;

var QimoSDK = {
    socketUrl: config.socketUrl,
    proxyMsgUrl: config.proxyMsgUrl,
    chatCK: "QIMO_CHAT_SID_",
    accessId: "",
    nickName: "",
    cookie_sid: undefined,
    lastSocketId: undefined,
    isSelfDefine: false,
    fromUrl: "",
    urlTitle:"",
    kefu : undefined,               // 记录聊天框中展示的客服人员名称
    lastTimeForSendMsg: undefined,  // 上一次用户发送消息时的时间戳
    companyName: undefined,
    companyLogo: undefined,
    isShowHistory: true,
    retryCount: 0,
    since: undefined,  // 记录上一条客服人员消息记录的时间戳
    show_kefu: true,  // 是否展示了由哪个客服服务的系统消息
    lastTime : undefined,           // 记录当次历史消息记录中最早的一条消息记录的时间戳
    lastMsgId : undefined,          // 记录上一条客服人员消息记录的messageId
    chatFinish : false,             // 终结的标志
    token : "",                     // token,用来校验信息的合法性
    tokenTime : "",                 // tokenTime,用来校验信息的合法性
    tokenTimer: undefined,
    convertManual: false,           //是否转人工
    haveInit: false,
    imageInputId: "qimo_picture",
    toPeer: '',
    op:{},
    webIMCsrDic:undefined,
    investigatable: true, //是否可以进行评价
    chatWithKefu : false,
    isRobot : true,                 // 是不是机器人
    defaultInvestigateStyle :"",
    evaluateDo: true,
    globalSet : {},//全局性设置,是否展示留言等
    qaCatalogList : [],
    sdkEmbed: true,
    initConfig: false,
    seoSource:"",
    seoKeywords:"",
    chatbox_input_isFinish:true,
    typeNoticeNum : 0,
    fileuploadToken:null,
    otherParams:undefined,
    noRobot : false,

    /**
     * 设置tokenTimer
     */
    setTokenTimer: function(){
        tokenTimer = setInterval(function(){
            if(socket && QimoSDK.cookie_sid){
                socket.emit("token", QimoSDK.cookie_sid);
            }
        }, 300000);
    },

    setPeer: function(id){
        QimoSDK.toPeer = id;
    },

    getPeers: function(){
        return configData.peers;
    },

    getGlobalSet: function(){
        return QimoSDK.globalSet;
    },

    /**
     * 获取满意度配置
     */
    getCsrConfig: function(callback){
        if(QimoSDK.initConfig){
            callback(null,QimoSDK.webIMCsrDic);
        }else{
            QimoSDK.getGlobalConfig(QimoSDK.proxyMsgUrl + "/chat", function(data){
                if(data){
                    callback(null ,data.csrDic);
                }else{
                    callback("not found degree of satifaction config");
                }
            })
        }
    },

    /**
     * 获取常见问题分类列表
     */
    getQaConfig: function(callback){
        if(QimoSDK.initConfig){
            callback(null,QimoSDK.qaCatalogList);
        }else{
            QimoSDK.getGlobalConfig(QimoSDK.proxyMsgUrl + "/chat", function(data){
                if(data){
                    callback(null ,data.catalogList);
                }else{
                    callback("not found QA config");
                }
            })
        }

    },

    setQaPage: function(pageNum){
        QimoSDK.questionPage = pageNum;
    },

    initDefaultConsultShow: function(callback){
        var peers = QimoSDK.getPeers();
        var html = "";
        if(peers && peers.length >1 ){
            var item = '<li ds_data="__id">__name</li>';
            for(var i =0; i< peers.length; i++){
                html+=item.replace(new RegExp("__id",'g'),peers[i].id).replace(new RegExp("__name",'g'),peers[i].name);
            }
            callback(html);
        }else{
            callback(null);
        }
    },
    /**
     *
     * @param accessId 接入号,必填参数
     * @param options 可选  参数列表{fromUrl:'xxxxxxx',userId:'xxxxxxxxxx', nickName:'xxx'} 其中userId必须唯一，companyKey必填，公司简称
     * @param callback 回调函数{errcode:0, errmsg:"初始化成功", data:{companyLogo:'', companyName:''}}
     * @constructor
     */
    init: function (accessId, options, callback) {
        QimoSDK.accessId = accessId;
        if(configData.peers.length == 1){
            QimoSDK.toPeer = configData.peers[0].id;
        }
        //获取全局设置
        chatUtils.ajaxJsonPRequest(QimoSDK.proxyMsgUrl + "/chat", "POST",3000,{data:JSON.stringify({action:'getWebchatGlobleConfig',accessId:QimoSDK.accessId})}, function(data){
            if(data && data.success){
                QimoSDK.globalSet = data.globalSet;
            }
        });

        if (typeof options == 'object') {
            if (options.userId && options.companyKey) {
                QimoSDK.isSelfDefine = true;
                QimoSDK.cookie_sid = options.userId +"@"+ chatUtils.generateShortUuid(QimoSDK.accessId);
                if (options.nickName) {
                    QimoSDK.nickName = options.nickName;
                }
                QimoSDK.otherParams = {};
                if(options.userId){
                    QimoSDK.otherParams.userId = options.userId;
                }
                if(options.nickName){
                    QimoSDK.otherParams.nickName = options.nickName;
                }
            }
            if(options.agent && !QimoSDK.noVipAgent){
                if(!QimoSDK.otherParams){
                    QimoSDK.otherParams = {};
                }
                QimoSDK.otherParams.agent = options.agent;
            }
            if(QimoSDK.noVipAgent){
                QimoSDK.noVipAgent = false;
            }
            if (options.fromUrl) {
                QimoSDK.fromUrl = options.fromUrl;
            }
            if (options.urlTitle) {
                QimoSDK.urlTitle = options.urlTitle;
            }
            if(options.seoSource){
                QimoSDK.seoSource = options.seoSource;
            }
            if(options.seoKeywords){
                QimoSDK.seoKeywords = options.seoKeywords;
            }
        }

        if (!QimoSDK.cookie_sid) {
            QimoSDK.cookie_sid = chatUtils.getCookie(QimoSDK.chatCK + QimoSDK.accessId) || undefined;
        }
        socket = io.connect(QimoSDK.socketUrl, {
            "force new connection": true,
            reconnectionDelay: 2000,
            timeout: 5000,
            query: {accessId: QimoSDK.accessId}
        });

        //认证成功
        socket.on("connect", function () {
            QimoSDK.setTokenTimer();
            if(QimoSDK.haveInit){
                return;
            }
            callback({errcode: 0, errmsg: "socket连接认证成功"});
        });

        //认证失败
        socket.on("error", function () {
            callback({errcode: 1, errmsg: "socket连接认证失败"});
            return;
        });

        socket.on("token", function (tokenData) {
            QimoSDK.token = tokenData.token;
            QimoSDK.tokenTime = tokenData.tokenTime;
        });
    },

    setEvaluteDo:function(value){
        QimoSDK.evaluateDo = value;
    },
    getEvaluteDo:function(){
        return QimoSDK.evaluateDo;
    },
    startChat: function(callback){
        socket.on("socketId", function (socketData) {
            var data = {
                action: "newChat",
                accessId: QimoSDK.accessId,
                socketId: socketData.socketId,
                key: socketData.key,
                sid: QimoSDK.cookie_sid,
                isSelfDefine: QimoSDK.isSelfDefine,
                fromUrl: QimoSDK.fromUrl,
                urlTitle: encodeURIComponent(QimoSDK.urlTitle),
                platform: chatUtils.isFromMobile() ? "wap" : "pc",
                toPeer: QimoSDK.toPeer,
                otherParams: JSON.stringify(QimoSDK.otherParams),
                lastSocketId: QimoSDK.lastSocketId || "",
                seoSource: QimoSDK.seoSource,
                seoKeywords: QimoSDK.seoKeywords,
                noRobot : QimoSDK.noRobot
            };
            var newchatUrl = QimoSDK.proxyMsgUrl + "/chat";

            chatUtils.ajaxJsonPRequest(newchatUrl, "POST", 5000, {data: JSON.stringify(data)}, function (chatData) {
                if (!chatData.success) {
                    callback({errcode: 1, errmsg: "连接服务失败"});
                    socket.disconnect();
                    QimoSDK.retryCount = 4;
                    return;
                };
                socket.emit("token", chatData.sid);
                QimoSDK.lastTimeForSendToken = chatUtils.getTimestamp();

                QimoSDK.companyName = chatData.companyName;
                QimoSDK.companyLogo = chatData.companyLogo || "//fs-test.7moor.com/N00000000264/webchatConfig/2015-08-21/1440149238506/d15a14a0-47e6-11e5-99ce-53231b224927.png";
                QimoSDK.companyLogo = chatUtils.replaceImQiniuDomain(QimoSDK.companyLogo);
                if (QimoSDK.cookie_sid == undefined || QimoSDK.cookie_sid == "undefined") {
                    QimoSDK.show_kefu = false;
                }
                QimoSDK.lastSocketId = socketData.socketId;

                if (!QimoSDK.isSelfDefine && (QimoSDK.cookie_sid == undefined || QimoSDK.cookie_sid != chatData.sid)) {
                    var key = QimoSDK.chatCK + QimoSDK.accessId;
                    chatUtils.setCookie(key, chatData.sid, 7);
                }
                QimoSDK.cookie_sid = chatData.sid;
                QimoSDK.evaluateDo = true;
                if(QimoSDK.haveInit){
                    return;
                }
                callback({
                    errcode: 0,
                    errmsg: "初始化成功",
                    data: {companyName: QimoSDK.companyName, companyLogo: QimoSDK.companyLogo}
                });
                QimoSDK.haveInit = true;

            }, function (xhr, status, error) {
                callback({errcode: -1, errmsg: '请求失败或网络问题,' + status || error});
            });

            //获取全局配置
            QimoSDK.getGlobalConfig(newchatUrl);
        });
    },

    getGlobalConfig: function(newchatUrl, callback){
        var dataCSR = {
            action: "getImCsrConfig",
            accessId: QimoSDK.accessId,
            page: 1
        };
        chatUtils.ajaxJsonPRequest(newchatUrl, "POST", 3000, {data: JSON.stringify(dataCSR)}, function (globalConfig) {
            if(callback){
                QimoSDK.initConfig = true;
                QimoSDK.qaCatalogList = globalConfig.catalogList;
                QimoSDK.webIMCsrDic = globalConfig.csrDic;
                callback(globalConfig);
            }else{
                //常见问题
                QimoSDK.qaCatalogList = globalConfig.catalogList;
                QimoSDK.initConfig = true;
                //满意度调查
                if (globalConfig && globalConfig.csrDic) {
                    QimoSDK.webIMCsrDic = globalConfig.csrDic;
                    var tmpl = '<style type="text/css">.esc_mask{display: none;z-index: 10;width: 349px;height: 100%;position: absolute;top: 0px;background: rgba(0, 0, 0, .4);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#66000000,endColorstr=#66000000);}</style>' +
                        '<form action="" class="esc_form_easy"><div class="esc_mask"></div><div style="font-size: 12px;margin-bottom: 6px;">感谢您使用我们的服务，请为此次服务进行评价</div>';
                    var esc_path = "";
                    var reason_path = "";
                    for (var i = 0; i < QimoSDK.webIMCsrDic.length; i++) {
                        var value = QimoSDK.webIMCsrDic[i];
                        tmpl += '<label><input type="radio" name="satisfaction" value="' + value.name + '" key="' + value.key + '"/>' + value.name + '</label>';

                        esc_path += '<label><input type="radio" name="name[]" value="' + value.name + '" index="' + value.index + '"key="' + value.key + '" />' + value.name + '</label>';
                        var reasons = [];
                        reasons = value.reason;
                        var sum = '';
                        for (var j = 0; j < reasons.length; j++) {
                            sum += '<li><label><input type="radio" name="reason[]" index="' + j + '" value="' + reasons[j] + '">' + reasons[j] + '</label></li>';
                        }
                        reason_path += '<ul class="reasons" index="' + value.index + '">' + sum + '</ul>';
                    }
                    tmpl += "</form>";
                    QimoSDK.defaultInvestigateStyle = tmpl;
                    QimoSDK.defaultCloseInvestigateStyle = '<div class="close_box"><dl><dd>' +
                        '<a href="javascript:void(0);" class="chatCloseBtn">立即结束</a>' +
                        '<a href="javascript:void(0);" class="chatCancelBtn">取消</a>' +
                        '</dd><dt>即将结束本次对话</dt></dl><h3>感谢您使用我们的服务,请为此次服务进行评价</h3>' +
                        '<form id="esc_form" class="esc_form">' +
                        '<ol class="evaluates"><li>' + esc_path + '</li></ol><div class="esc_form_reson">' + reason_path + '</div>' +
                        '<textarea class="proposal" onfocus="if(value==\'欢迎为我们的服务提建议\'){value=\'\';style.color=\'#000\'}" rows="4"' +
                        'onblur="if (value ==\'\'){value=\'欢迎为我们的服务提建议\';style.color=\'#a7a7a7\'}">欢迎为我们的服务提建议</textarea>' +
                        '<input id="appraise" class="submit_evaluate" type="button" value="提交评价" way="in"></form></div>';
                }
            }

        });
    },

    sedQuestion :function(options, callback){
        if(!options.cid){
            return;
        }
        var newquwsUrl = QimoSDK.proxyMsgUrl + "/chat";
        var dataqstFirst = {
            accessId: QimoSDK.accessId,
            cid     : options.cid,
            action  : "pullQAMsg",
            qaType  : "queryItemListInf",
            limit   : 30
        };
        if(options.page){
            dataqstFirst.page = options.page;
        }
        chatUtils.ajaxJsonPRequest(newquwsUrl, "POST", 3000, {data: JSON.stringify(dataqstFirst)}, function(questData1){
            var temp= [];
            callback(questData1);
        })

    },

    submitQuestion: function(options, callback){
        var msg = {
            sid: QimoSDK.cookie_sid,
            accessId: QimoSDK.accessId,
            content: encodeURIComponent(options.question),
            contentType: "text",
            action: "pullQAMsg",
            token: QimoSDK.token,
            tokenTime:QimoSDK.tokenTime,
            qaType : "getKmDetailInf",
            qaItemInfoId:options._id
        };
        QimoSDK.sendMsgWithAjax(msg, callback);
    },

    /**
     * 获取历史消息,最多获取1000条
     * @param callback
     *
     *  [{
        "_id": "ce5cd9c0-a797-11e5-8248-0b075f932c08",
          "sid": "1316c330-a461-11e5-b898-8f6dffaff36c",
          "when": 1450670614876,
          "dateTime": "2015-12-21 12:03:34",
          "content": "你好",
          "contentType": "text",
          "type": "out",
          "showHtml": false,
          "agentName":"6000"
        },
     {
       "_id": "7fbc0aa0-a78f-11e5-8777-8bf6fc65617e",
       "sid": "1316c330-a461-11e5-b898-8f6dffaff36c",
       "when": 1450667046986,
       "dateTime": "2015-12-21 11:04:06",
       "content": "http://7xntwc.com2.z0.glb.qiniucdn.com/im/2015-12-21%2010:29:40/1450664980201/afd5ad90-a78a-11e5-80c0-b7a85b140c7d.jpg",
       "contentType": "image",
       "type": "in",
       "showHtml": "false"
     }]
     *
     * 倒序方式
     */
    getHistoryMsg: function (callback) {
        var req = {
            action: "getMsg",
            accessId: QimoSDK.accessId,
            sid: QimoSDK.cookie_sid,
            pageSize: 1000,
            history: true,
            companyName: QimoSDK.companyName,
            _t: chatUtils.getTimestamp(),
            platform: chatUtils.isFromMobile() ? "wap" : "pc"
            //robot: chatData.robot
        };
        var getMsgUrl = QimoSDK.proxyMsgUrl + "/chat?data=" + JSON.stringify(req);
        chatUtils.ajaxJsonPRequest(getMsgUrl, "GET", 5000, null, function (data) {
            var msgArr = data.data;
            var resultArr = [];
            if ("undefined" == typeof msgArr || null == msgArr || msgArr == "null" || msgArr == undefined)
                msgArr = [];
            var his_since = undefined;
            var his_lastMsgId = undefined;
            if (msgArr.length > 0) {
                QimoSDK.lastTime = msgArr[msgArr.length - 1].when;
            }

            if (msgArr.length > 0) {
                QimoSDK.since = msgArr[0].when;
                QimoSDK.lastMsgId = msgArr[0]._id;
            }

            for (var i = 0; i < msgArr.length; i++) {
                var type = msgArr[i].type;
                msgArr[i].content = chatUtils.regExpEmoji({content: msgArr[i].content, showHtml:msgArr[i].showHtml});
                if (type == "out") {
                    if (his_since && msgArr[i].when > his_since && his_lastMsgId == msgArr[i]._id) {
                        continue;
                    }
                    msgArr[i].agentName = QimoSDK.companyName;
                    resultArr.push(msgArr[i]);
                    his_lastMsgId = msgArr[i]._id;
                    his_since = msgArr[i].when;
                } else if (type == "in") {
                    if(msgArr[i].notShow == true || msgArr[i].notShow == "true"){
                        continue;
                    }
                    resultArr.push(msgArr[i]);
                }
            }
            callback({errcode: 0, errmsg: "获取历史消息成功", data: resultArr});
        }, function (xhr, status, error) {
            callback({errcode: -1, errmsg: "请求超时或网络问题,获取消息失败"});
        });
    },

    /**
     * 按宽获取缩略图
     * sourceImg: 原图url
     * width: 缩略后的宽
     */
    getThumbnailImg: function (sourceImg, width) {
        return sourceImg+"?imageView2/2/w/"+ width;
    },

    onMessage: function(callback){
        socket.on("getMsg", function (data) {
            if (data == 100) {

                var req = {
                    action: "getMsg",
                    accessId: QimoSDK.accessId,
                    sid: QimoSDK.cookie_sid,
                    type: "out",
                    status: "undeal",
                    _t: chatUtils.getTimestamp(),
                    platform: chatUtils.isFromMobile() ? "wap" : "pc"
                };
                if (!QimoSDK.networkFlag) {
                    req.since = QimoSDK.since;
                }
                QimoSDK.getMsg(req, callback);
                //window.parent && window.parent.postMessage && (window.parent.postMessage("newMsg", "*"));
            } else if (data.sig == 101) {
                var tmp = QimoSDK.kefu;
                QimoSDK.kefu = data.su;
                if ("string" != typeof data.su || data.su == "undefined" || data.su == "") {
                    QimoSDK.kefu = QimoSDK.companyName;
                }
                if(data.type == "finish"){
                    QimoSDK.chatFinish = true;
                }
                if(data.type == "claim"){
                    QimoSDK.isRobot = false;
                }
                if(data.type == "robot"){
                    if(data.kefu){
                        QimoSDK.isRobot = true;
                    }
                }
                if(data.type == "queueNum"){
                    // 不展示
                    if(!QimoSDK.globalSet.queueNumSwitch){
                        data.queueNum = -1;
                    }
                }
                callback({errcode: 0, errmsg: "成功", type:"systemNotice", data:{type: data.type, kefu: QimoSDK.kefu, queueNum: data.queueNum || 0}});
            }else if(data.sig == 102){
                callback({errcode: 0, errmsg: "成功", type:"systemNotice",data:{type: data.type}});
                if(data.type == "vipAssignFail"){
                    //关闭此会话
                    if(socket){
                        socket.disconnect();
                    }
                }
            }else if(data == 200){
                callback({errcode:0, errmsg:"成功", type:"investigate"});
            }else if(data.sig == 201){
                QimoSDK.investigatable = data.isInvestigate;
            }
        });
    },

    getMsg: function (req, callback) {
        var getMsgUrl = QimoSDK.proxyMsgUrl + "/chat?data=" + JSON.stringify(req);
        chatUtils.ajaxJsonPRequest(getMsgUrl, "GET", 5000,null, function (data) {
            var msgArr = data.data;
            var resultArr = [];
            if ("undefined" == typeof msgArr || null == msgArr || msgArr == "null" || msgArr == undefined)
                msgArr = [];

            if ("string" != typeof QimoSDK.kefu || QimoSDK.kefu == "undefined" || QimoSDK.kefu == "") {
                QimoSDK.kefu = QimoSDK.companyName;
            }

            if(!QimoSDK.isRobot && msgArr.length>0 && msgArr[0].user != "system" && msgArr[0].showHtml == false){
                QimoSDK.chatWithKefu = true;
            }

            for (var i = 0; i < msgArr.length; i++) {
                if (msgArr[i].when < QimoSDK.since && QimoSDK.lastMsgId == msgArr[i]._id) {
                    continue;
                }
                if(msgArr[i].user == "system"){
                    msgArr[i].agentName = QimoSDK.companyName;
                }else{
                    msgArr[i].agentName = QimoSDK.kefu;
                }
                msgArr[i].content = chatUtils.regExpEmoji({content: msgArr[i].content, showHtml:msgArr[i].showHtml});
                resultArr.push(msgArr[i]);
                QimoSDK.lastMsgId = msgArr[i]._id;
                QimoSDK.since = msgArr[i].when;
                QimoSDK.networkFlag = true;
            }
            QimoSDK.lastTimeForSendMsg = chatUtils.getTimestamp();
            callback({errcode: 0, errmsg: "请求成功",type:"newMsg", data: resultArr});

        }, function (xhr, status, error) {
            QimoSDK.networkFlag = false;
            callback({errcode: -1, errmsg: "请求超时或网络问题，获取消息失败"});
        });
    },

    sendTextMsg: function(options, callback){
        if($.trim(options.content) == ""){
            if(callback){
                callback({errcode: 1, errmsg: "消息不能为空"});
            }

            return;
        }

        if (QimoSDK.chatFinish) {
            if(callback){
                callback({errcode: 2, errmsg: "会话已结束，请重新打开会话窗口再进行咨询"});
            }
            return;
        }
        var msg = {
            sid: QimoSDK.cookie_sid,
            accessId: QimoSDK.accessId,
            content: encodeURIComponent(options.content),
            contentType: "text",
            action: "newMsg",
            showHtml: options.showHtml || false,
            notShow: options.notShow || false,
            token: QimoSDK.token,
            tokenTime:QimoSDK.tokenTime
        };

        QimoSDK.sendMsgWithAjax(msg, callback);
    },

    initTypeNotice: function(options, callback){
        var textareaId = options.textareaId;
        if(!textareaId || $.trim(textareaId) == ""){
            if(callback && $.trim(textareaId) == ""){
                callback({errcode: 0, errmsg: "textareaId 不能为空"});
            }else if(callback && $("#"+textareaId).length==0){
                callback({errcode: 1, errmsg: "找不到textareaId对应的输入框"});
            }
            return;
        }

        /**
         * 预知聊天内容
         */
        function typeNotice(checkTime){
            var content = $("#"+textareaId).val();
            var content_old = $("#"+textareaId).attr("content_old");
            var timestamp = new Date().getTime();
            var timestamp_old = $("#"+textareaId).attr("timestamp_old");

            if(content!=content_old && !QimoSDK.chatbox_input_isFinish){
                if((timestamp-timestamp_old)>=checkTime  || !timestamp_old){
                    $("#"+textareaId).attr("content_old",content);
                    $("#"+textareaId).attr("timestamp_old",timestamp);
                    var msg={
                        action:"typeNotice",
                        _id: QimoSDK.cookie_sid,
                        content: encodeURIComponent(content)
                    };
                    QimoSDK.sendMsgWithAjax(msg, null);
                }
            }
        }
        $("#"+textareaId).keyup(function(e){
            if(e.keyCode!=13){
                if($("#"+textareaId).val()!=""){
                    QimoSDK.chatbox_input_isFinish = false;
                }
                typeNotice(3000);
                setTimeout(function(){
                    typeNotice(3000);
                },2800);
            }
        });
    },

    initFileUpload: function(op){
        if(window.FormData) {
            if (!op.btnId) {
                op.uploadFailed({errcode: 3, errmsg: "没有上传上传文件按钮的btnId"});
                return false;
            }
            var btnId = op.btnId;
            var image = op.btnImage || "../images/file-icon.png";
            var width = op.btnWidth || "22px";
            var height = op.btnHeight || "20px";
            $("#" + btnId).css("position", "relative").html("<img src='" + image + "' width='" + width + "' height='" + height + "'>");

        }


        /**
         * 加载七牛上传组件
         * @param url
         * @param callback
         */
        function loadQNJs(url, callback) {
            var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.onload = script.onreadystatechange = function () { //Attach handlers for all browsers
                if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                    this.onload = this.onreadystatechange = null;
                    this.parentNode.removeChild(this);
                    if (typeof(callback) == "function") callback();
                }
            };
            script.setAttribute("src", url);
            HEAD.appendChild(script);
        }

        var initupload = function(){
            var fileInput = $("#"+op.btnId);
            var progressId = 'file_upload';
            uploader = QiniuWebchat.uploader({
                runtimes: 'html5,flash,html4',
                browse_button: op.btnId,
                multi_selection: false,
                max_file_size: '20mb',
                flash_swf_url: QimoSDK.proxyMsgUrl+'/javascripts/qiniu/plupload/Moxie.swf',
                dragdrop: false,
                uptoken_url: QimoSDK.proxyMsgUrl+'/chat?data={"action":"qiniu.getUptokenFromCustomer"}',
                domain: "http://fs-im-kefu.7moor.com/",
                unique_names: false,
                save_key: false,
                auto_start: true,
                get_new_uptoken: true,
                filters: {},
                init: {
                    'FilesAdded': function (up, files) {
                        if(op.FilesAdded){
                            op.FilesAdded(up, files);
                        }
                    },
                    'BeforeUpload': function (up, file) {
                        var progress = new FileProgress(file, progressId);
                        var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                        if (up.runtime === 'html5' && chunk_size) {
                            progress.setChunkProgess(chunk_size);
                        }
                    },
                    'UploadProgress': function (up, file) {
                        if(op.UploadProgress){
                            op.UploadProgress(up, file);
                        }
                    },
                    'UploadComplete': function () {
                        if(op.UploadComplete){
                            op.UploadComplete(up, files);
                        }
                    },
                    'FileUploaded': function (up, file, info) {

                        var time = chatUtils.getTimestamp();
                        var domain = up.getOption('domain');
                        var res = JSON.parse(info);
                        var sourceLink = domain + res.key; //获取上传成功后的文件的Url

                        function bytesToSize(bytes) {
                            if (bytes === 0) return '0 B';
                            var k = 1024, // or 1024
                                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                                i = Math.floor(Math.log(bytes) / Math.log(k));
                            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
                        }
                        var fileSize = bytesToSize(file.size);
                        var sendData = {
                            sid: QimoSDK.cookie_sid,
                            accessId: QimoSDK.accessId,
                            contentType: 'file',
                            action: 'newMsg',
                            timestamp: time,
                            token: QimoSDK.token,
                            tokenTime: QimoSDK.tokenTime,
                            content:sourceLink+"?fileName="+file.name+"?fileSize="+fileSize
                        }
                        var moreUrl = QimoSDK.proxyMsgUrl+"/chat";
                        var submitData = {data: JSON.stringify(sendData)};
                        chatUtils.ajaxJsonPRequest(moreUrl, "POST", 5000,submitData, function (result) {
                            //todo lla
                            if(op.FileUploaded){
                                var params =result.content.split("?fileName=");
                                var url = params[0];
                                var fileName = "文件";
                                var fileSize = "";
                                if(params[1]){
                                    var params2 = params[1].split("?fileSize=");
                                    fileName = params2[0];
                                    fileSize = params2[1];
                                }
                                if (result.success) {
                                    op.FileUploaded({errcode: 0, errmsg: "upload success", data: {fileUrl: url,fileName:fileName}});
                                } else {
                                    op.FileUploaded({errcode: 2, errmsg: result.message, data: {fileUrl: url,fileName:fileName}});
                                }
                            }
                        });
                        lastTimeForSendMsg = chatUtils.getTimestamp();


                    },
                    'Error': function (up,file, err, errTip) {
                        if(op.Error){
                            op.Error(up, file, errTip);
                        }
                    },
                    'Key': function (up, file) {
                        var date =  chatUtils.getCurrentDate();
                        var today = new Date();
                        var time = today.getTime();
                        var fileName = file.name;
                        var fileSuffix = "";
                        if (fileName) {
                            fileSuffix = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
                        }
                        var key = "im/" + QimoSDK.accessId + "/" + date + "/" + time + "/" + file.name;
                        return key;
                    }
                }
            });
        }
        loadQNJs(QimoSDK.proxyMsgUrl+"/javascripts/qiniu/plupload/plupload.full.min.js", function () {
            loadQNJs(QimoSDK.proxyMsgUrl+"/javascripts/qiniu/plupload/i18n/zh_CN.js", function () {
                loadQNJs(QimoSDK.proxyMsgUrl+"/javascripts/qiniu/ui.js", function () {
                    loadQNJs(QimoSDK.proxyMsgUrl+"/javascripts/qiniu/highlight/highlight.js", function () {
                        loadQNJs(QimoSDK.proxyMsgUrl+"/javascripts/qiniu/qiniu.js", function () {
                            initupload();
                        });
                    });
                });
            });
        });
    },

    initClipboardImgUpload:function(op,callback){
        var textareaId = op.textareaId;
        if (!op.textareaId) {
            callback({errcode: 1, errmsg: "没有上传图片按钮textareaId"});
            return false;
        }

        var getUpTokenByJsonP = function(callback){
            if (!QimoSDK.fileuploadToken && chatUtils.ajaxJsonPRequest) {
                chatUtils.ajaxJsonPRequest( QimoSDK.proxyMsgUrl+'/chat?data={"action":"qiniu.getUptokenFromCustomer"}', "GET", 3000, {}, function (result) {
                    if (result.success) {
                        QimoSDK.fileuploadToken = result.uptoken;
                        callback();
                    }
                });
            }else{
                callback();
            }
        }

        function uploadClipboardFile(e) {
            var clipboardData = e.clipboardData || e.originalEvent.clipboardData;
            if(clipboardData.items){
                var ele = e.clipboardData.items;
                for (var i = 0; i < ele.length; ++i) {
                    if ( ele[i].kind == 'file' && ele[i].type.indexOf('image/') !== -1 ) {
                        var blob1 = ele[i].getAsFile();
                        blob1.name="clipboard"+new Date().getTime()+".png";
                        blob1.fileName="clipboard"+new Date().getTime()+".png";

                        var xhr = {};
                        if (window.XMLHttpRequest) {
                            xhr = new XMLHttpRequest();
                        } else {
                            xhr = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        var xhr = new XMLHttpRequest();
                        var fd = new FormData();
                        var time = chatUtils.getTimestamp();
                        fd.append("name", blob1.name);
                        function getKey (file){
                            var date =  chatUtils.getCurrentDate();
                            var today = new Date();
                            var time = today.getTime();
                            var fileName = file.name;
                            var fileSuffix = "";
                            if (fileName) {
                                fileSuffix = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
                            }
                            var key = "im/" + QimoSDK.accessId + "/" + date + "/" + time + "/" + file.name;
                            return key;
                        }
                        fd.append("key", getKey(blob1));

                        fd.append("file", blob1);


                        /* event listners */
                        xhr.upload.addEventListener("progress", function (e) {
                            op.uploadProgress(e);
                        }, false);
                        xhr.addEventListener("load", function (evt) {
                            if (evt.target.status == 200) {
                                var res = JSON.parse(evt.target.responseText);
                                var domain = "http://fs-im-kefu.7moor.com/";
                                var sourceLink = domain + res.key; //获取上传成功后的文件的Url
                                if (QimoSDK.chatFinish) {
                                    op.uploadFailed({errcode: 1, errmsg: "会话已结束，请重新打开一个新的会话进行咨询"});
                                    return false;
                                }
                                var time = chatUtils.getTimestamp();
                                var sendData = {
                                    sid: QimoSDK.cookie_sid,
                                    accessId: QimoSDK.accessId,
                                    contentType: 'image',
                                    action: 'newMsg',
                                    timestamp: time,
                                    token: QimoSDK.token,
                                    tokenTime: QimoSDK.tokenTime,
                                    content: sourceLink
                                }
                                var moreUrl = QimoSDK.proxyMsgUrl + "/chat";
                                var submitData = {data: JSON.stringify(sendData)};
                                chatUtils.ajaxJsonPRequest(moreUrl, "POST", 5000, submitData, function (result) {
                                    QimoSDK.lastTimeForSendMsg = chatUtils.getTimestamp();
                                    op.uploadComplete({errcode: 0, errmsg: res.message, data: {imageUrl: sourceLink}});
                                });
                            } else {
                                op.uploadError({errcode: -1, errmsg: "service is go wrong"});
                            }

                        }, false);
                        xhr.addEventListener("error", function (evt) {
                            postResultMessage({type:'uploadQimoImage',errcode: -1, errmsg: evt.target.responseText})
                        }, false);
                        xhr.addEventListener("abort", function () {
                        }, false);
                        /* Be sure to change the url below to the url of your upload server side script */
                        getUpTokenByJsonP(function(){
                            xhr.open("POST", "https://up.qbox.me");
                            fd.append("token", QimoSDK.fileuploadToken);
                            xhr.send(fd);
                        });
                        lastTimeForSendMsg = chatUtils.getTimestamp();
                        break;
                    }
                }
            }
        }

        $("#"+textareaId)[0].onpaste=function(e){
            uploadClipboardFile(e);
        };

        callback({errcode: 0});
    },


    sendMsgWithAjax: function(data, callback){
        var submitUrl = QimoSDK.proxyMsgUrl + "/chat";
        var submitData = {data: JSON.stringify(data)};
        chatUtils.ajaxJsonPRequest(submitUrl, "POST", 3000, submitData, function (data) {
            if (!data.success) {
                if(callback){
                    callback({errcode: 3, errmsg:"消息发送失败", content: decodeURIComponent(data.content)});
                }
                return;
            }
            QimoSDK.lastTimeForSendMsg = chatUtils.getTimestamp();
            if(callback){
                callback({errcode: 0, errmsg: "发送成功", content: chatUtils.regExpEmoji(decodeURIComponent(data.content))});
            }
            if(!QimoSDK.isRobot && !data.showHtml){
                QimoSDK.chatWithKefu = true;
            }

        }, function () {
            if(callback){
                callback({errcode: -1, errmsg:"网络问题或导致发送失败", content: decodeURIComponent(data.content)});
            }

        });
    },

    submitInvestigate: function(investigateData, callback){
        var msg = {
            sid          : QimoSDK.cookie_sid,
            accessId     : QimoSDK.accessId,
            way          : investigateData.way,
            satisfaction : encodeURIComponent(investigateData.value),
            proposal     : encodeURIComponent(investigateData.proposal),
            label        : investigateData.label,
            appraiseKey  : investigateData.key,
            action       : "sendWebCSRMsg",
            token        : QimoSDK.token,
            tokenTime    : QimoSDK.tokenTime
        };
        var submitUrl = QimoSDK.proxyMsgUrl + "/chat";
        var submitData = {data: JSON.stringify(msg)};
        chatUtils.ajaxJsonPRequest(submitUrl, "POST", 3000, submitData, function (data) {
            if (!data.success) {
                if(callback){
                    callback({errcode: 1, errmsg:"评价失败"});
                }
                return;
            }

            if(callback){
                callback({errcode: 0, errmsg: "评价成功"});
            }
            QimoSDK.investigatable = false;

        }, function () {
            if(callback){
                callback({errcode: -1, errmsg:"网络问题或导致发送失败"});
            }

        });

    },

    initImageSendBtn: function(op){
        QimoSDK.op = op;
        if(window.FormData){
            if(!op.btnId){
                op.uploadFailed({errcode: 3, errmsg:"没传上传图片按钮id"});
                return false;
            }
            var btnId = op.btnId;
            var image = op.btnImage || "../images/image-icon.png";
            var width = op.btnWidth || "22px";
            var height = op.btnHeight || "20px";
            $("#"+btnId).css("position","relative").html("<img src='"+image+"' width='"+width+"' height='"+height+"'><iframe id='qimo_upload' src='"+QimoSDK.proxyMsgUrl+"/view/upload.html' style='width:"+width+";height:"+height+";position:absolute;left:0;top:0;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;border:0;cursor:pointer'></iframe>");
            $("#"+btnId).live("click", function(){
                if(QimoSDK.chatFinish){
                    op.uploadFailed({errcode:1, errmsg:"会话已结束，请重新打开一个新的会话进行咨询"});
                    return false;
                }
                var time = chatUtils.getTimestamp();
                var sendData = {
                    sid: QimoSDK.cookie_sid,
                    accessId:QimoSDK.accessId,
                    contentType:'image',
                    action:'newMsg',
                    timestamp: time,
                    token:QimoSDK.token,
                    tokenTime:QimoSDK.tokenTime
                };
                document.getElementById("qimo_upload").contentWindow.postMessage(JSON.stringify(sendData), "*");
                QimoSDK.lastTimeForSendMsg = chatUtils.getTimestamp();

            });
        }else{
            return false;
        }
    },


    closeChat: function(callback){
        if(socket){
            socket.disconnect();
        }
        QimoSDK.cookie_sid = undefined, QimoSDK.isShowHistory = true, QimoSDK.since = undefined,
            QimoSDK.lastMsgId = undefined, QimoSDK.lastSocketId = undefined, QimoSDK.kefu = undefined, QimoSDK.companyName = undefined,
            QimoSDK.lastTime = undefined, QimoSDK.show_kefu = true, QimoSDK.chatFinish = false, QimoSDK.retryCount = 0,
        QimoSDK.lastTimeForSendMsg = undefined, QimoSDK.networkFlag = true,QimoSDK.convertManual=false, QimoSDK.toPeer = "",QimoSDK.isRobot = true, QimoSDK.webIMCsrDic = undefined, QimoSDK.chatWithKefu=false,QimoSDK.noRobot=false,QimoSDK.otherParams=undefined,QimoSDK.haveInit=false;
        clearInterval(QimoSDK.tokenTimer);
        if(callback){
            callback();
        }
    },

    vipAssigncloseChat: function(callback){
        if(socket){
            socket.disconnect();
        }
        QimoSDK.cookie_sid = undefined, QimoSDK.isShowHistory = true, QimoSDK.since = undefined,
            QimoSDK.lastMsgId = undefined, QimoSDK.lastSocketId = undefined,
            QimoSDK.lastTime = undefined, QimoSDK.show_kefu = true, QimoSDK.chatFinish = false, QimoSDK.retryCount = 0,
        QimoSDK.lastTimeForSendMsg = undefined, QimoSDK.networkFlag = true,QimoSDK.convertManual=false,QimoSDK.isRobot = true, QimoSDK.webIMCsrDic = undefined, QimoSDK.chatWithKefu=false,QimoSDK.noRobot=true,QimoSDK.otherParams=undefined,QimoSDK.haveInit=false,QimoSDK.noVipAgent=true;
        clearInterval(QimoSDK.tokenTimer);
        if(callback){
            callback();
        }
    },

    closeChatBySystem: function(callback){
        QimoSDK.closeChat(callback);
    },

    submitLeaveMsg: function(param, callback){
        var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var phoneReg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;

        var leavemsg_content = $.trim(param.content);
        var leavemsg_phone = $.trim(param.phone);
        var leavemsg_email = $.trim(param.email);
        if(leavemsg_content == ""){
            callback({errcode: -1, errmsg:"留言内容不能为空"});
            return;
        }
        if(leavemsg_phone == "" && leavemsg_email == ""){
            callback({errcode: -1, errmsg:"请务必留下您的任意一个联系方式"});
            return;
        }

        if(leavemsg_phone != "" && !phoneReg.test(leavemsg_phone)){
            callback({errcode: -1, errmsg:"电话格式不正确"});
            return;
        }
        if(leavemsg_email != "" && !emailReg.test(leavemsg_email)){
            callback({errcode: -1, errmsg:"邮箱格式不正确"});
            return;
        }
        var msg = {
            action:"leaveMsg",
            message:leavemsg_content,
            phone:leavemsg_phone,
            email:leavemsg_email,
            platform:chatUtils.isFromMobile()? "wap" : "pc",
            accessId:QimoSDK.accessId,
            fromUrl:QimoSDK.fromUrl.replace("&", "###"),
            urlTitle:encodeURIComponent(QimoSDK.urlTitle),
            sid:QimoSDK.cookie_sid,
            toPeer: QimoSDK.toPeer
        };
        chatUtils.ajaxJsonPRequest(QimoSDK.proxyMsgUrl + "/chat", "POST", 5000, {data: JSON.stringify(msg)}, function (data) {
            if (!data.success) {
                callback({errcode: 100, errmsg: '留言失败'});
                return;
            }
            callback({errcode: 0, errmsg: '留言成功'});
        },function () {
            callback({errcode: -1, errmsg: '请求失败或网络问题导致留言失败'});
        });

    },

    /**
     * 转人工
     * @param callback
     */
    convertToManual: function(callback){
        if(QimoSDK.convertManual){
            callback({errcode: 1, errmsg:"已转接人工"});
            return;
        }
        var msg ={
            sid: QimoSDK.cookie_sid,
            action:"convertManual"
        };
        var convertUrl = QimoSDK.proxyMsgUrl + "/chat";
        var convertData = {data: JSON.stringify(msg)};
        chatUtils.ajaxJsonPRequest(convertUrl, "POST", 3000, convertData, function (data) {
            if (!data.success) {
                callback({errcode: 2, errmsg:"客服不在线"});
                return;
            }
            QimoSDK.isRobot = false;
            QimoSDK.convertManual = true;
            callback({errcode:0, errmsg:"转人工成功"});
        }, function () {
            callback({errcode: -1, errmsg:"请求失败"});
        });
    },

    /**
     * 获取表情数组,配置我们提供的一组图
     */
    getEmojiFaces: function(){
        return chatUtils.getEmojiFaces();
    },

    initEmojiFaceSendBtn: function(op, cb){
        if(!op.containerId){
            cb({errcode:1, errmsg:"没设置containerId"});
            return false;
        }
        var faceClickFun = "window.getEmojiCode";
        if(op.faceClickFun){
            faceClickFun = op.faceClickFun;
        }
        var containerId = op.containerId;
        QimoSDK.textareaId = op.textareaId;
        $("#"+containerId).html('<style type="text/css">.emoji-face{ width: 25px; height: 25px; background-repeat: no-repeat; display: inline-block; cursor: pointer; background-image: url("http://webchat.7moor.com/images/emoji.png");}</style>');
        var liHtml = "";
        var x = 25, y = 25;
        for (var i = 0; i < chatUtils.emojiFaces.length; i++) {
            for (var j = 0; j < chatUtils.emojiFaces[i].length; j++) {
                var li = '<li title="' + chatUtils.emojiFaces[i][j] + '"><span class="emoji-face" onclick="' + faceClickFun + '(\':' + chatUtils.emojiFaces[i][j] + ':\')" title="' + chatUtils.emojiFaces[i][j] + '" style="background-position: ' + (-(x * j)) + 'px ' + (-(y * i)) + 'px;"></span></li>';
                liHtml += li;
            }
        }
        $("#"+containerId).append("<ul>"+liHtml+"</ul>");
        cb({errcode: 0, errmsg: "初始化成功"});
    },
    getDataFromChild: function(data){
        if(data.errcode == 0){
            QimoSDK.op.uploadComplete(data);
        }else{
            QimoSDK.op.uploadFailed(data);
        }
    },
    acceptOtherAgent:function(callback){
        var data = {
            action: "acceptOtherAgent",
            sid: QimoSDK.cookie_sid,
            accessId:QimoSDK.accessId
        };
        var newchatUrl = QimoSDK.proxyMsgUrl + "/chat";
        chatUtils.ajaxJsonPRequest(newchatUrl, "POST", 3000, {data: JSON.stringify(data)}, function(result){
            if(result.success){
                noRobot=true;
                callback({errcode:0, errmsg:"接受其他坐席成功"});
            }else{
                callback({errcode:1, errmsg:"接受其他坐席失败"});
                /*$(".tips").html("非常抱歉！系统或网络问题导致接入其他坐席失败，请刷新页面重新接入").show().delay(1500).fadeOut(500);*/
            }
        })
    }
}

window.getEmojiCode =  function(code){
    $("#"+ QimoSDK.textareaId).val($("#"+QimoSDK.textareaId).val() +  code );
}

if (window.addEventListener) {
    window.addEventListener("message", function(e){
        if(e.data=="clickBtn"){
            $("#qimo_upload").parent().click();
        }else{
            var data = JSON.parse(e.data);
            if(data.type == "uploadQimoImage"){
                QimoSDK.getDataFromChild(data);
            }
        }
    });
} else {
    window.attachEvent("onmessage", function(e){
        if(e.data=="clickBtn"){
            $("#qimo_upload").parent().click();
        }else {
            var data = JSON.parse(e.data);
            if (data.type == "uploadQimoImage") {
                QimoSDK.getDataFromChild(data);
            }
        }
    });
}