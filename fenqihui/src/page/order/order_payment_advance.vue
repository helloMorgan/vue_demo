<template>
	<div id="orderPaymentAdvace">
		<CommonHeader titles="付款详情" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
		<section>
			<div class="mui-card box-shadow opa-con marginTop30">
				<div class="mui-row opa-list-title">
					<div class="mui-col-sm-3 mui-col-xs-3 color-white">
						付款项目
					</div>
					<div class="mui-col-sm-3 mui-col-xs-3 color-white">
						付款时间
					</div>
					<div class="mui-col-sm-3 mui-col-xs-3 color-white">
						付款总额(￥)
					</div>
					<div class="mui-col-sm-3 mui-col-xs-3 color-white">
						付款状态
					</div>
				</div>
				<ul class="opa-list-ul">
					<li class="mui-row opa-list" v-for="(item,index) in payMentList" :class="{'bgwhite':item.displayColor=='1','bggray':item.displayColor=='0'}">
						<div class="mui-col-sm-3 mui-col-xs-3">
							{{index==0?item.payTypeDesc:item.volume}}
						</div>
						<div class="mui-col-sm-3 mui-col-xs-3">
							{{item.payTime}}
						</div>
						<div class="mui-col-sm-3 mui-col-xs-3">
							{{item.payMoney}}
						</div>
						<div class="mui-col-sm-3 mui-col-xs-3">
							{{item.payStatusDesc}}
							
						</div>
						<span class="fontSize24 lineheight24 color-darkgrey containFees">
                                {{index==0?"":"包含利息(￥):"+item.containFee}}
                            </span>
					</li>

				</ul>
			</div>
			
		<div class="prepaymentShow" v-if="prepaymentFlag1">
            <p class="overdueTimep">逾期<i class="overdueTime">{{payMentLists.dueDays?payMentLists.dueDays:0}}</i>天,罚息<i class="interestPenalty">{{payMentLists.dueInterest?parseFloat(payMentLists.dueInterest).toFixed(2):0}}</i>元</p>
            <p class="color-black">本月待付金额(￥):<span class="currentMonthShouldPay color-red">{{parseFloat(payMentLists.currentMonthShouldPay).toFixed(2)}}</span></p>
               
            <div class="prepaymentButton togoPay" @click="goPay('1')">
                <span class="btn-color">去支付</span>
            </div>
            <p style="text-decoration: underline;" class="onePayButton color-black" @click="onePay()">一次付清</p>
        </div>
        <div class="prepaymentShow onePays" v-if="prepaymentFlag2">
                    <p class="color-black">利息(￥):<span class="totalInterest">{{payMentLists.interest?parseFloat(payMentLists.interest).toFixed(2):0}}</span></p>
                    <p class="color-red">逾期<i class="overdueTime color-red">{{payMentLists.dueDays?payMentLists.dueDays:0}}</i>天,罚息<i class="interestPenalty color-red">{{payMentLists.dueInterest?parseFloat(payMentLists.dueInterest).toFixed(2):0}}</i>元</li>
                    <p class="color-black">还款总额(￥):<span class="payTotalMoney" style="color:red;">{{payMentLists.payTotalMoney?parseFloat(payMentLists.payTotalMoney).toFixed(2):0}}</span></p>
            <div class="prepaymentButton  paymentFull btn-color" @click="goPay('2')">
                <span>确认一次付清</span>
            </div>
        </div>
		</section>
	</div>
</template>
<script>
import CommonHeader from '../../components/Common_header.vue'
export default {
  components: {
    CommonHeader
  },
  data() {
    var query = this.$route.query;
    return {
      token: getToken(),
      oId: query.oId,
      platformId: query.businessType,
      payMentList: [],
      payMentLists: [],
      prepaymentFlag1: true,
      prepaymentFlag2: false,
      rId: "",
      rIds: "",

    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getpayMentList();
    })
  },
  methods: {
    //一次还清
    onePay() {
      this.prepaymentFlag1 = false;
      this.prepaymentFlag2 = true;
      $(".opa-list-ul li").removeClass("bggray").addClass("bgwhite");
    },
    //去支付
    goPay(n) {
      this.$router.push({
        path: '/orderPayment',
        query: {
          "rIds": this.rIds,
          "rId": this.rId,
          "oId": this.oId,
          "platformId": this.platformId,
          "choosePayments":n
        }
      });
    },
    getpayMentList() {
      var vueScope = this;
      vueScope.$api.post('fqhrepayment/getFqhRepaymentPlanList', {
          token: vueScope.token,
          oId: vueScope.oId,
          platformId: vueScope.platformId
        },
        r => {
          if(r.result == "0000") {
            vueScope.payMentList = r.data;
            vueScope.payMentLists = r;
            vueScope.rId = r.rId;
            vueScope.rIds = r.rIds;
            var hasMonthInfo = r.hasMonthInfo;
            var isAllPayed = r.isAllPayed;
            var isAllDue = r.isAllDue;
            if(hasMonthInfo == "1") {
              if(isAllDue == "0") {
                vueScope.prepaymentFlag1 = true;
              } else {
                vueScope.prepaymentFlag1 = false;
              }
            } else {
              vueScope.prepaymentFlag1 = false;
            }
            if(isAllPayed == "0") {
              vueScope.prepaymentFlag1 = true;
            } else if(isAllPayed == "1") {
              vueScope.prepaymentFlag1 = false;
            }

          }
        },
        err => {
          console.log("请求失败")
          if (err.result="4004") {
				_this.$router.push({path: '/loginIn'})
			} 
        });

    }
  },

}
</script>

<style>
	.opa-list-title{width: 100%;height: 0.6rem; background: #30cfb6;font-size: 0.3rem;display: table; text-align: center;line-height: 0.6rem;overflow: hidden;}
	.opa-list-ul{width: 100%;text-align: center;}	
	.opa-list-ul li{height: 1.06rem;line-height:1.06rem;font-size: 0.3rem;color: #333333;border-bottom:1px solid #ededed ;position: relative}
	.opa-list-ul li span{display: block;white-space: nowrap;}
	.opa-list-ul li>div:last-child{text-align:center;}
	.opa-list-ul li:last-child{border: none;}
	.opa-list-ul li>div:first-child{text-align: left;padding-left: 0.3rem;}
	.opa-list-ul li>div{font-size:0.26rem}
	.opa-show-info{background: none;margin-bottom: 0.2rem;}
	.opa-show-info p{width: 100%;font-size: 0.24rem;color: #333333;text-align: right;}
	.opa-btn-pay{margin: auto;}
	.paymentList{border-top:1px solid #e1e1e1}
	.prepaymentShow{width:6.9rem;margin:0.8rem auto;text-align: center;}
	.overdueTimep,.overdueTimep i{color:red;}
	.overdueTimep{margin-bottom:0.2rem}
	.prepaymentButton {width: 5.8rem;margin: 0 auto;height: 1rem;line-height: 1rem;font-size:0.4rem;text-align: center;margin-top: 0.5rem;}
	.prepaymentButton span {display: block;width: 5.8rem;text-align: center;color: #FFFFFF;border-radius:5px;font-size: 0.3rem;}
    .onePayButton{margin-top:0.3rem}
    .paymentFull{border-radius: 5px;}
    .onePays p{margin-bottom:0.2rem}
    .bgwhite{background-color: #fff;}
    .bggray{background:gainsboro;}
    .containFees{position: absolute;right:0;bottom:0.1rem;margin-right:0.2rem}
</style>
