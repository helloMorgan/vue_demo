   var queryStr = "d1cc32b0-9cdf-11e7-83d4-c37e36075fea";
   var qimoAccessId = queryStr; //平台提供的接入号accessId  

   //先加载sdk的js  
   loadQimoSDK(qimoAccessId, function() {
     // TODO 加载sdk完毕,可以弹出点击咨询的按钮了  

     var peers = QimoSDK.getPeers();
     //表情初始化  
     QimoSDK.initEmojiFaceSendBtn({
       "containerId": "face-con", //必传，接收表情列表，回传<ul><li></li></ul>形式  
       "textareaId": "chatbox_input", //必传  
       "faceClickFun": "", //选填  
     }, function(data) {
       if(data.errcode == 0) {
         //todo 点击按钮，弹出containerId所在层  
       } else {
         console.info(data.errmsg);
       }
     });

     //点击咨询按钮后初始化多技能组,  
     $(".consultBtn").on("click", function() {

       //默认样式处理 ,  获取所有技能组方法:QimoSDK.getPeers(), 在点击技能组后,回传技能组号: QimoSDK.setPeer(id);  
       QimoSDK.initDefaultConsultShow(function(result) {
         //如果有多个技能组,则先展示技能组  
         if(result) {
           // TODO 将技能组列表展示出来  

         } else {
           //只设置一个技能组的情况,直接  
           initChat();
         }
       });
       // todo 初始化聊天框信息  

     });

     function initChat() {
       //建立连接，第二个参数目前固定可以传fromUrl【来源页面】，seoSource【搜索来源】, seoKeywords【搜索关键字】  
       QimoSDK.init(qimoAccessId, {
         fromUrl: window.location.href
       }, function(initData) {
         $(".chatcontainer").show(); //展示聊天框  
         //todo 初始化后的业务处理  
         if(initData.errcode == 0) {
           console.info("连接成功");
           /** 
            * 消息的监听，这个必须写在回调里头 
            */
           QimoSDK.onMessage(function(data) {
             console.log(data);
             if(data.errcode == 0) {
               //todo 新消息过来的处理，数组  
               if(data.type == "newMsg") {
                 var msgArr = data.data;
                 for(var i = 0; i < msgArr.length; i++) {
                   var msg = msgArr[i];
                   if(msg.contentType == "text") {
                     //todo 文本消息  {agentName:msg.agentName, content:msg.content}  
                     pageUtils.appendServiceChatMsg();
                   } else if(msg.contentType == "image") {
                     //todo 图片消息 缩图 QimoSDK.getThumbnailImg(url, width);  

                   }
                 }

               }
               //todo 系统通知的处理  
               else if(data.type == "systemNotice") {
                 var notice = data.data;
                 //座席在线，弹出会话框  
                 if(notice.type == "online") {
                   // todo 客服在线  
                   alert('客服在线');
                 }
                 //座席不在线，转留言  
                 else if(notice.type == "offline") {
                   // todo 客服不在线  
                   alert('客服不在线');
                   if(QimoSDK.globalSet.isLeaveMsg == "1") {
                     // todo 客服不在线，请留言给我们  
                       
                   } else {
                     //系统直接在聊天框中展示不在线的消息{agentName:QimoSDK.companyName, content:QimoSDK.globalSet.msg || ""}  

                     QimoSDK.closeChat(function() {});
                   }

                 }
                 //座席响应会话  
                 else if(notice.type == "claim") {
                   // todo 客服 notice.kefu 受理了该会话  

                   //  QimoSDK.sendTextMsg({content: "会话来源于<a target='_blank' href='"+ window.location.href+"'>"+ window.location.href+"</a>", showHtml:true, notShow: true});  
                   alert("会话中")
                 }
                 //会话被座席结束，前端要有个响应  
                 else if(notice.type == "finish") {
                   // todo 会话被系统终结  
                   QimoSDK.closeChat(function() {});
                 }
                 //客服转接,即将由另外一位客服服务  
                 else if(notice.type == "redirect") {
                   // todo 会话转由另外一个座席处理  

                 }

                 //机器人服务  
                 else if(notice.type == "robot" && notice.kefu) {
                   // todo 机器人服务, 出现转人工的按钮  

                 }
                 //展示 当前有多少人排队  
                 else if(notice.type == "queueNum" && notice.queueNum && notice.queueNum > 0) {
                   //TODO 展示 当前有多少人排队  
                 }
               } else if(data.type == "investigate") {
                 //TODO 座席端主动推送满意度评价过来  评价项获取:QimoSDK.getCsrConfig(function(csrConfig){});  

               }
             } else {
               console.info(data.errmsg);
             }
           });

           //发起会话请求  
           QimoSDK.startChat(function(chatData) {
             //断开前提醒  
//           showWarmTip();

             // 获取初始化返回的数据{companyLogo:'xxxxxxxxxx', companyName:'xxxxxxxxxxxxxx'}  
             var companyLogo = chatData.data.companyLogo;
             var companyName = chatData.data.companyName;
             //todo 开启会话，获取基本信息  

             //历史消息  
             QimoSDK.getHistoryMsg(function(data) {
               if(data.errcode == 0) {
                 var msgs = data.data;
                 if(!msgs) {
                   msgs = []
                 }
                 for(var i = 0; i < msgs.length; i++) {
                   var msg = msgs[i];
                   if(msg.contentType == "image") {
                     //todo 图片处理  
                     msg.content = '<a target="_blank" href="' + msg.content + '"><img src="' + QimoSDK.getThumbnailImg(msg.content, 100) + '"></a>';
                   }
                   if(msg.type == "out") {
                     //座席消息  
                   } else if(msg.type == "in") {
                     //用户消息  
                   }
                 }
               }
             });

           });
         } else if(initData.errcode == 1) {
           console.info("连接认证失败");
         }

       });
     }
   });

   //              //发送消息接口
   //              //发送文本消息 showHtml:是否支持html， notShow:用户端是否展示这条信息    
   QimoSDK.sendTextMsg({
     content: content,
     showHtml: false,
     notShow: false
   }, function(data) {
     if(data.errcode == 0) {
       //todo 成功    
     } else if(data.errcode == 1) {
       console.info("消息不能为空");
     } else if(data.errcode == 2) {
       console.info("会话已被关闭，不能回复");
     } else if(data.errcode == 3) {
       console.info("消息发送失败");
     } else if(data.errcode == -1) {
       console.info("请求失败");
     }
   });

   //转人工接口
   QimoSDK.convertToManual(function(convertData) {
     if(convertData.errcode == 0) {
       console.info("转人工成功");
     } else if(convertData.errcode == 1) {
       console.info("已转人工");
     } else if(convertData.errcode == 2) {
       console.info("客服不在线");
       if(QimoSDK.globalSet.isLeaveMsg == "1") {
         //todo 留言,跳到留言页面  
       } else {
         //TODO 直接系统消息告知, 系统消息:QimoSDK.globalSet.msg  
         QimoSDK.closeChat(function() {});
       }
     } else if(convertData.errcode == -1) {
       console.info("请求失败");
     }
   });

   //

   //提交满意度评价
   //评价项获取:QimoSDK.getCsrConfig(function(null,csrConfig){});    
   var investigateData = {
     way: "", //值为 in或者out  out代表的是用户响应座席主动推过来的评价请求, in代表用户主动发起的评价    
     key: "", //值为评价项的key值,    
     value: "", //值为评价项的value值    
     proposal: "", //建议,用户主动发起才可能有    
     label: [] //标签项,用户主动发起才可能有    
   }

   QimoSDK.submitInvestigate(investigate, function(data) {
     if(data.errcode == 0) {
       //     todo 提交问卷调查成功
     } else {
       // todo 失败    
     }
   });

   //提交留言
   QimoSDK.submitLeaveMsg({
     content: "",
     phone: "",
     email: ""
   }, function(data) {
     if(data.errcode == 0) {
       //todo 留言成功    
     } else {
       //     todo 留言失败
     }
   });

   //断开连接前提示
   //断开前提醒, 在QimoSDK.startChat的回调里调用showWarmTip();  
   var showBreakTips = false;
   var chatTimer = 0;
   window.showWarmTip = function() {
     var nowTime = chatUtils.getTimestamp();
     if(QimoSDK.globalSet.break_tips_len >= 0 && QimoSDK.lastTimeForSendMsg && nowTime - QimoSDK.lastTimeForSendMsg > ((QimoSDK.globalSet.break_len - QimoSDK.globalSet.break_tips_len) * 60000) && QimoSDK.kefu && QimoSDK.kefu != QimoSDK.companyName) {
       if(!showBreakTips) {
         pageUtils.appendGreySystemMsg(pageUtils.getCurrentDateTime());
         pageUtils.appendServiceChatMsg({
           agentName: QimoSDK.kefu,
           content: QimoSDK.globalSet.break_tips || "【系统消息】由于很久没有收到您的消息，系统已自动关闭会话。如有需要，请再联系我们。"
         });
         showBreakTips = true;
       }
       if(QimoSDK.globalSet.break_len && nowTime - QimoSDK.lastTimeForSendMsg >= (QimoSDK.globalSet.break_len * 60000)) {
         QimoSDK.closeChat(function() {});
         $(".footer").prepend("<div class='chat-finish'>会话结束了</div>");
         QimoSDK.chatFinish = true;
         clearTimeout(chatTimer);
       }
     } else {
       showBreakTips = false;
     }

     chatTimer = setTimeout('showWarmTip()', 5000);
   };