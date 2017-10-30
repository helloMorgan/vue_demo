<template>
    <div id="agreement">
        <CommonHeader titles="《分期购买服务协议》" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
           <div class="agreement-margin">
                <div class="first-sign">
                    <span class="agreement-title">分期购买服务协议</span>
                    <p class="fist_p agreement-margin-left">甲方：<span class="name_style">英泰福信息科技（北京）有限公司</span></p>
                    <p class="agreement-margin-left">乙方：<span class="name_style second_party">{{orderData.mRealName}}</span></p>
                    <p class="agreement-margin-left">丙方：<span class="name_style third_party">{{orderData.sName}}</span></p>
                </div>
                <p class="agreement-margin-left"> 本协议各方根据《中华人民共和国合同法》，经各方充分协商，依平等自愿、等价有偿的原则，达成如下协议：</p>
    
                <div class="content">
                    <h3 style="margin-top:0.74rem">一. 名词释义</h3>
                    <p><span class="name_style">1.甲方:</span>系分期惠游平台的合法运营商，依托自身平台为乙方等注册用户提供分期咨询等中介服务。</p>
                    <p><span class="name_style">2.乙方:</span>系在甲方平台注册并使用其分期服务购买丙方产品（本协议所涉及的丙方提供的“产品”之法律含义应包含丙方所提供的服务，以下统称为“产品”）的完全民事行为能力人。</p>
                    <p><span class="name_style">3.丙方:</span>系具备合法运营及产品销售提供资质的法人。</p>
                    <p><span class="name_style">4.记账日:</span>系指乙方通过甲方服务以分期付款方式购买丙方产品之订单确认之日</p>
                    <p><span class="name_style">5.<label>还款日:</label></span>指乙方每一期分期款项应支付的最晚日期（若当月无此日期则为当月最后一日）</p>
    
                </div>
    
                <div class="content">
                    <h3>二. 分期支付订单内容</h3>
                  
                    <div>
                        <ul class="name_style">
                            <li><span class="borderLeftNone">产品编号</span><span class="widthTwo"><a  class="productNo marginA">{{orderData.pNo}}</a></span></li>
                            <li><span class="borderLeftNone">产品名称</span><span class="widthTwo"><a class="productName marginA">{{orderData.pName}}</a></span></li>
                            <li><span class="borderLeftNone">用户编号</span><span><a class="userNo marginA">{{orderData.mId}}</a></span></span><span>订单生成日</span><span class="widthFour"><a class="orderCreate marginA">{{orderData.oCreateTime}}</a></span>
                            </li>
                            <li><span class="borderLeftNone">用户姓名</span><span><a class="userName marginA">{{orderData.mRealName}}</a></span><span>注册手机号</span><span class="widthFour"><a class="userPhone marginA">{{orderData.mMobile}}</a></span></li>
                            <li><span class="borderLeftNone">用户证件号</span><span class="widthTwo"><a class="userCard marginA">{{orderData.mIdCard}}</a></span></li>
                            <li><span class="borderLeftNone">订单编号</span><span class="widthTwo"><a class="orderNo marginA">{{orderData.oNo}}</a></span></li>
    
                            <li><span class="borderLeftNone">订单金额</span><span><a class="orderPay marginA">{{orderPay}}</a></span><span>首付款金额</span><span class="widthFour"><a class="firstPay marginA">{{orderData.firstPayMoney==null?"":parseFloat(orderData.firstPayMoney).toFixed(2)}}</a></span></li>
                            <li class="prepayMoneyLi" v-show="getpType=='2'"><span class="borderLeftNone">预付款金额</span><span class=" widthTwo"><a class="prepayMoney marginA">{{orderData.prepayMoney==null?"":parseFloat(orderData.prepayMoney).toFixed(2)}}</a></span></li>
    
                            <li><span class="borderLeftNone">分期期数</span><span><a class="marginA stagesTime">{{orderData.duration}}</a></span><span>分期金额</span><span class="widthFour"><a class="stagesPay marginA">{{orderData.durationTotalMoneyBj==null?"":parseFloat(orderData.durationTotalMoneyBj).toFixed(2)}}</a></span>
                            </li>
                            <li><span class="borderLeftNone">每期服务费</span><span><a class="oneServiceCharge marginA">{{orderData.eachMonthSxf==null?"":parseFloat(orderData.eachMonthSxf).toFixed(2)}}</a></span><span>每期应还金额</span><span class="widthFour"><a class="oneShouldPayMoney marginA">{{orderData.eachMonthMoneyBjAndSxf==null?"":parseFloat(orderData.eachMonthMoneyBjAndSxf).toFixed(2)}}</a></span></li>
    
                        </ul>
                    </div>
                </div>
    
               <div class="content">
                    <h3>三. 协议内容</h3>
                    <p><span>1.</span>甲方接受乙方申请为其购买上述订单对应的丙方产品提供分期付款服务，并协助乙方对接所需的贷款中介服务机构，乙方应按照该机构要求在第三方支付机构或金融机构开立资金存管账户（用于消费款项的充值、支付、提现、代收、代付、查询、还款等）并签订相关借款协议及服务协议。在此，乙方不可撤销地授权甲方和/或第三方支付机构或金融机构根据乙方的指令和/或甲方平台规则对乙方资金存管账户中的资金进行冻结、扣划等操作。同时，丙方应确保其在同一第三方支付机构或金融机构已开立资金存管账户用于收取甲方的消费首付款及分期款，处理退款以及其它相关的资金结算事宜。在此，丙方不可撤销地授权甲方和/或第三方支付机构或金融机构根据丙方的指令和/或甲方平台规则对乙方资金存管账户中的资金进行冻结、扣划等操作。
                    </p>
                    <p><span>2.</span>乙方应向贷款中介服务机构及第三方支付机构或金融机构缴纳相关费用，具体收费项目及标准以乙方与贷款中介服务机构签订的服务协议的约定以及第三方支付机构或金融机构的规则为准，乙方授权并委托甲方通过甲方平台代扣其全部相关费用并向相关机构支付。
                    </p>
                    <p><span>3.</span>丙方应向第三方支付机构或金融机构缴纳相关费用，具体收费项目及标准以第三方支付机构或金融机构的规则为准，丙方授权并委托甲方通过甲方平台代扣其全部相关费用并向相关机构支付</p>
                    <p><span>4.</span>丙方在此订单下全部应收款项的具体结算支付规则以甲、丙双方另行签订的《分期惠商户合作协议》为准。</p>
                    <p><span>5.</span>乙方购买丙方产品的具体内容、服务方式及其他约定，以双方线下另行签订的协议为准，与甲方无关。</p>
                    <p><span>6.</span>乙方选择分期付款方式购买丙方产品的，应当根据甲方平台展示的要求和相关规则在规定的时间内充值并完成首付款的支付。</p>
                    <p><span>7.</span>本协议签署后，若乙方分期贷款尚未在贷款中介服务机构开始募集，则乙方可以直接取消订单，乙方已支付的首付款会被退回，无需承担手续费用。若乙方分期贷款已在贷款中介服务机构开始募集，则乙方取消订单将承担相应的手续费用（等同于甲方分期贷款单月月供的利息数额），甲方有权自退回至乙方的首付款的资金中扣划该手续费。若乙方分期贷款在贷款中介服务机构已募集完成，乙方不可以取消订单，只能进行退款操作。退款以甲方平台公布的规则以及乙丙双方另行签订的线下协议为准。
                    </p>
                    <p><span>8.</span>在平台规则允许的范围内，乙方发起提前还款时应当将未归还的本金及剩余各分期的利息一并归还。</p>
                    <p><span>9.</span>乙方应按照本协议的约定按时足额归还每一期分期贷款本息，乙方未按约定还款的，甲方有权立即要求乙方足额归还分期贷款的全部本金、利息、罚息、违约金、管理费等，具体收取方式及标准以甲方平台公布为准。
                    </p>
                    <p><span>10.</span>丙方需保证自身具备合法资质向乙方提供合格产品及服务。若乙方因产品、服务质量等原因与丙方发生纠纷，双方应另行解决。甲方及甲方合作的贷款中介服务机构作为分期服务提供方不对丙方提供的产品及服务质量负责，乙方不得以任何产品质量、纠纷及其他原因为由拒绝偿还分期款项。若因丙方资质及产品、服务质量等原因造成甲、乙方损失，甲、乙方有权要求丙方进行赔偿。
                    </p>
    
                </div>
                <div class="content">
                    <h3>四. 本协议的附件及适用</h3>
                    <p>
                        本协议由正文、《资金划转委托书》、乙方与贷款服务机构签订的借款服务协议、分期惠平台、相关贷款服务中介机构及第三方支付机构或金融机构公示的各项规则共同组成，相关名词可互相引用参照，如有不同理解，以本协议条款为准。若各方对本协议理解和认同，即对本协议所有组成部分的内容理解并认同，一旦乙方使用甲方提供的分期服务购买丙方产品，各方即受本协议所有组成部分的约束。本协议部分内容被有管辖权的法院认定为违法或无效的，不因此影响其他内容的效力。</p>
                </div>
    
                <div class="content2">
                    <h3>五. 争议解决条款</h3>
                    <p class="text_indent">因本协议引起的或与本协议有关的任何争议，由各方友好协商解决。协商不成时，各方均有权向甲方经营所在地的人民法院提起诉讼。</p>
                </div>

                <div class="content2">
                    <h3>六. 协议生效</h3>
                    <p class="text_indent">1.乙方在分期惠平台上点击“立即预订” 、“提交订单”或其他相同功能的按钮并确认后即视为其已经充分阅读并接受本协议条款内容和受此内容之拘束，亦视为乙方作出的承诺及签署行为。甲乙丙三方认可并同意，乙方点击“立即预订” 、“提交订单”或其他相同功能的按钮并确认后，本协议生效。
                    </p>
                    <p class="text_indent">
                        2.本协议及其修改或补充均采用通过分期惠网站以电子文本形式制成，可以有一份或者多份并且每一份具有同等法律效力，并永久保存在甲方为此设立的专用服务器上备查和保管。各方均认可该形式的协议效力。</p>
                </div>

                <footer class="foot_con">
                    <div class="foot_lide">
                        <div class="foot_top">
                            <div class="foot_con1 name_style">甲方：<span class="name_style">英泰福信息科技（北京）有限公司</span></div>
                        </div>
                        <div class="foot_con3">
                            <p class="foot_date name_style">
                                日期： <span class="name_style">{{orderData.oFirstPayTime}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="foot_lide">
                        <div class="foot_top">
                            <div class="foot_con1 name_style">乙方：<span class="second_party">{{orderData.mRealName}}</span></div>
                        </div>
                        <div class="foot_con3">
                            <p class="foot_date name_style">
                                日期： <span class="name_style">{{orderData.oFirstPayTime}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="foot_lide">
                        <div class="foot_top">
                            <div class="foot_con1 name_style">丙方：<span class="third_party">{{orderData.sName}}</span></div>
                        </div>
                        <div class="foot_con3">
                            <p class="foot_date name_style">
                                日期：<span class="name_style">{{orderData.oFirstPayTime}}</span>
                            </p>
                        </div>
                    </div>
    
                </footer>
                <div class="delegation_contain">
                    <span class="delegation_title">资金划转委托授权书</span>
                    <div class="delegation_content">
                        <div class="name_style" style="margin-top: 0.3rem;">
                            <p>委托人:<span class="name_style userName">{{orderData.mRealName}}</span></p>
                            <p>身份证号:<span class="name_style userCard">{{orderData.mIdCard}}</span></p>
                        </div>
    
                        <div class="name_style" style="margin-top: 0.3rem;">
                            <p>被委托人:<span>金诺峰网络科技（北京）有限公司</span></p>
                            <p>营业执照编号:<span>911101083397215955</span></p>
                        </div>
    
                        <div style="line-height:0.8rem;margin-top: 0.3rem;">
                            <p>
                                <span class="name_style">委托授权内容:</span>
                                将委托人在被委托人运营的接待中介机构处发起贷款所募集到的资金
                                <span class="name_style totalMoney">{{orderData.durationTotalMoneyBj==null?"":parseFloat(orderData.durationTotalMoneyBj).toFixed(2)}}</span>
                                元全部划转至分期惠平台签约商户所开始户名为
                                <span class="name_style userName"></span>
                                的指定结算账户中，用以支付相关费用。
                            </p>
                        </div>
    
                        <p style="margin-top: 0.3rem;"><span class="name_style">委托时限:</span>从委托之日起至委托事宜完成止</p>
                        <div style="margin-top:0.3rem;">
                            <div class="clearfix">
                                <a class="leftFloat" style="margin-left:0.1rem;color:black">委托人签章:<span class="name_style userName">{{orderData.mRealName}}</span></a>
                                <a class="rightFloat" style="color:black">日期:<span class="name_style dateTime">{{orderData.oFirstPayTime}}</span></a>
                            </div>
                            <div class="clearfix" style="margin-top:0.3rem;">
                                <a class="leftFloat" style="margin-left:0.1rem;color:black">被委托人:<span class="name_style">金诺峰网络科技(北京)有限公司</span></a>
                                <a class="rightFloat" style="color:black">日期:<span class="name_style dateTime">{{orderData.oFirstPayTime}}</span></a>
                            </div>
    
                        </div>
    
                    </div>
    
                </div>
                <div class="user-personal">
                    <!--<p style="text-align: justify;margin-left: 0;line-height: 28px;font-size: 14px;font-family: Calibri;margin-top: 0;margin-bottom: 0;font-variant-ligatures: normal;orphans: 2;white-space: normal;widows: 2;background-color: rgb(255, 255, 255)">
                        <span style="font-size: 20px;line-height: 40px;font-family: 微软雅黑;font-weight: bold"></span>
                    </p>-->
                     <p style="text-align: justify;margin-left: 0;line-height: 21px;font-size: 14px;font-family: Calibri;margin-top: 0;margin-bottom: 0;font-variant-ligatures: normal;orphans: 2;white-space: normal;widows: 2;background-color: rgb(255, 255, 255)">
                        <span style="font-size: 16px;line-height: 28px;font-weight: bold">&nbsp;</span>
                    </p>
                    <span class="user-personal-title">个人信息查询授权书</span>
                   
                    <p style="text-align: justify;margin-left: 0;line-height: 21px;font-size: 14px;font-family: Calibri;margin-top: 0;margin-bottom: 0;font-variant-ligatures: normal;orphans: 2;white-space: normal;widows: 2;background-color: rgb(255, 255, 255)">
                        <span style="font-size: 14px;line-height: 24px;font-family: 宋体">英泰福信息科技（北京）有限公司：</span>
                    </p>
                    <p style="text-align: justify;margin-left: 0;line-height: 21px;font-size: 14px;font-family: Calibri;margin-top: 0;margin-bottom: 0;font-variant-ligatures: normal;orphans: 2;white-space: normal;widows: 2;background-color: rgb(255, 255, 255)">
                        <span style="font-size: 14px;line-height: 24px">&nbsp;&nbsp;</span>
                    </p>
                    <p style="text-align: justify;margin-left: 0;line-height: 28px;font-size: 14px;font-family: Calibri;margin-top: 0;margin-bottom: 0;font-variant-ligatures: normal;orphans: 2;white-space: normal;widows: 2;background-color: rgb(255, 255, 255)">
                        <span style="font-size: 14px;line-height: 32px">&nbsp;&nbsp;&nbsp;&nbsp;本人（姓名）<span class="name_style userName">{{orderData.mRealName}}</span>（身份证号码：<span class="name_style userCard">{{orderData.mIdCard}}</span>）同意并不可撤销的授权贵司及与贵司合作的第三方查询或核实、搜集、处理本人相关数据，并授权贵司与前述第三方共享、使用本人该数据，但法律、法规、监管政策禁止的除外。</span>
                    </p>
                    <p style="text-align: justify;margin-left: 0;line-height: 28px;font-size: 14px;font-family: Calibri;margin-top: 0;margin-bottom: 0;font-variant-ligatures: normal;orphans: 2;white-space: normal;widows: 2;background-color: rgb(255, 255, 255)">
                        <span style="font-size: 14px;line-height: 32px">&nbsp;&nbsp;&nbsp;&nbsp;本人在此声明已充分理解上述授权条款含义，知晓并自愿承担提供上述数据可能产生泄露等不良影响及法律后果；贵司已经向数据提供事宜及其风险向本人作了充分说明，本人知晓并同意。</span>
                    </p>
                    <p style="text-align: justify;margin-left: 0;line-height: 28px;font-size: 14px;font-family: Calibri;margin-top: 0;margin-bottom: 0;font-variant-ligatures: normal;orphans: 2;white-space: normal;widows: 2;background-color: rgb(255, 255, 255)">
                        <span style="font-size: 14px;line-height: 32px">&nbsp;&nbsp;&nbsp;&nbsp;本授权书一经出具即生效。</span>
                    </p>
                    <p style="text-align: justify;margin-left: 0;line-height: 21px;font-size: 14px;font-family: Calibri;margin-top: 0;margin-bottom: 0;font-variant-ligatures: normal;orphans: 2;white-space: normal;widows: 2;background-color: rgb(255, 255, 255)">
                        <span style="font-size: 14px;line-height: 24px">&nbsp;</span>
                    </p>
                    <p class="clearfix" style="text-align: justify;margin-left: 0;line-height: 28px;font-size: 14px;font-family: Calibri;margin-top: 0;margin-bottom: 0;font-variant-ligatures: normal;orphans: 2;white-space: normal;widows: 2;background-color: rgb(255, 255, 255)">
                        <span class="leftFloat" style="font-size: 14px;line-height: 32px">授权人签章:</span>
    
                        <span class="leftFloat name_style userName" style="font-size: 14px;margin-left:15px;line-height: 32px;font-family: 宋体">{{orderData.mRealName}}</span>
                    </p>
                    <p class="clearfix" style="text-align: justify;margin-left: 0;line-height: 28px;font-size: 14px;font-family: Calibri;margin-top: 0;margin-bottom: 0;font-variant-ligatures: normal;orphans: 2;white-space: normal;widows: 2;background-color: rgb(255, 255, 255)">
                        <span class="leftFloat" style="font-size: 14px;line-height: 32px">出具日期:</span>
                        <span class="leftFloat name_style dateTime" style="font-size: 14px;margin-left:15px;line-height: 32px">{{orderData.oFirstPayTime}}</span>
                    </p>
                    
                </div>
                <div class="bottom"></div>

        </div>
    </div>
</template>

<script>
	import CommonHeader from '../../components/Common_header.vue'
	export default{
		components: { CommonHeader },
		data(){
		    var query=this.$route.query;
			return{
				oId:query.oId,
				platformId:query.platformId,
				token:getToken(),
                getpType:query.ptype,
                orderData:{},
                orderPay:""
				
			}
		},
		mounted: function () {
		  var vueScope=this;
		  vueScope.$nextTick(function () {
		      vueScope.isOid();
		  })
		},
		methods:{
		    isOid(){
		       var vueScope=this;
		       if(!vueScope.oId) {
                    return false;
                } else {
                   console.log("token:"+vueScope.token+",platformId:"+vueScope.platformId+",oId:"+vueScope.oId);
                    vueScope.$api.post('agreement/generateAgreement?',
                    {
                        oId:vueScope.oId,
                        platformId:vueScope.platformId,
                        token:vueScope.token,
                    },
                    r=>{
                            if(r.result == "0000") {
                            vueScope.orderData = r.data;
                            console.log(vueScope.orderData);
                            var orderPayMony;
                            if(vueScope.platformId == "2") {
                                orderPayMony = parseFloat(vueScope.orderData.durationTotalMoneyBj) + parseFloat(vueScope.orderData.firstPayMoney) + parseFloat(vueScope.orderData.prepayMoney);
                            } else if(vueScope.platformId == "1") {
                                orderPayMony = parseFloat(vueScope.orderData.durationTotalMoneyBj) + parseFloat(vueScope.orderData.firstPayMoney);
                            }
                            vueScope.orderPay=parseFloat(orderPayMony).toFixed(2);

                        }
                        },
                    err => {
                        console.log("请求失败")
                      });
		    }
		},
	}
		}
</script>

<style>
	.agreement-margin{margin:0.3rem;background-color: #FFFFFF;}
	.agreement-margin-left{margin-left:0.3rem}
	.agreement-title,.delegation_title,.user-personal-title{display:block;font-size:0.36rem;color:#5E5E5E;height:1rem;line-height: 1rem;text-align: center;}
	#agreement a{color:#333}
	#agreement ul {width: 100%;border: 1px solid #e1e1e1;}
    #agreement ul li {width: 100%;overflow: hidden;}
    #agreement ul li span {display: block;width: 21%;float: left;height: 1.4rem;line-height: 1.4rem;text-align: left;border-top: 1px solid #e1e1e1;border-left: 1px solid #e1e1e1;word-break: break-all;font-size: 0.24rem;padding-left: 0.12rem;}                  
    #agreement ul li span a {font-size: 0.24rem;}
    .name_style {font-weight: bold;color: black;}
    .widthTwo {width: 79%!important;}
    .widthFour {width: 37%!important;}
    .foot_top{margin-left:0.1rem}
    .marginA {display: block;margin-left: 0.12rem}
    #agreement ul li:nth-child(1) span {border-top: none;}
    .borderLeftNone {border-left: none;}
    #agreement p{text-align: justify;text-justify: inter-ideograph;margin:0 0.1rem}
    #agreement h3{font-size:0.3rem;color:#8f8f94;margin:0.26rem 0;margin-left:0.1rem}
    
</style>