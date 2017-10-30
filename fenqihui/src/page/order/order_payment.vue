<template>
	<div id="orderPayment">
		<CommonHeader titles="分期惠收银台" :imgChangeFlags="true" :backFlags="false"></CommonHeader>
		<section>
			<div class="op-con">
				<div class="mui-card marginTop20  mui-row">
					<div class="mui-col-sm-6 mui-col-xs-6">
						<span class="op-label">
							付款金额(¥)
						</span>
					</div>
					<div class="mui-col-sm-6 mui-col-xs-6">
						<span class="color-orange  mui-pull-right">{{oDurationMoney}}</span>
					</div>
				</div>
				<p class="color-black">支付银行卡</p>
				<div class="mui-card marginTop20  mui-row">
					<div class="mui-col-sm-8 mui-col-xs-8">
						<img class="op-banklogo" :src="bankImageUrl" alt="银行logo"/>
						 {{bankName}}
					</div>
					<div class="mui-col-sm-4 mui-col-xs-4 op-icon-con">
						<i class="mui-icon mui-icon-checkmarkempty " :class="{'opSelected':selectbankFlag}" @click="selectbankFlag=!selectbankFlag"></i>
					</div>
				</div>
				<div class="payment-submit">
        				<div class="btn-color btn-login op-btn-pay" @click="payNow()" v-if="rId?false:true">
        					立即支付
        				</div>
    				    <div class="btn-color btn-login op-btn-pay" @click="payMonth()" v-else>
                        立即支付
                    </div>
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
      oId: query.oId,
      rId: query.rId,
      rIds: query.rIds,
      platformId: query.platformId,
      selectbankFlag: true,
      getCardInfoList: [],
      choosePayments:query.choosePayments,
      bankId: "",
      oDurationMoney: "",
      bankName: "",
      bankImageUrl: "../../images/personalcenter/bank-logo.png"
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      if(this.rId) {
        this.getMonthInfo();
      } else {
        this.getCardInfo();
      }
    })
  },
  methods: {
    //获取bankId
    getCardInfo() {
      
      if(vueScope.platformId == "1") {
        this.$api.post('order/toFirstPayment', {
            'token': getToken(),
            'oId': this.oId
          },
          r => {
            if(r.result == "0000") {
              this.getCardInfoList = r;
              this.bankId = r.bankId;
              this.oDurationMoney = formatNum(r.oDurationMoney);
              this.cardLogo(this.bankId);
            } else if(response.data.result == "4001") {
              mui.toast("失败")
            }

          }, err => {
            console.log("请求失败")
            if (err.result="4004") {
				_this.$router.push({path: '/loginIn'})
			} 
          });
      } else if(vueScope.platformId == "2") {
        //               this.$api.post('fenqh/toPayment', {
        //        'token': getToken(),
        //        'oId': this.oId
        //      },
        //      r => {
        //        if(r.result == "0000") {
        //          this.getCardInfoList = r;
        //          this.bankId = r.bankId;
        //          this.oDurationMoney = formatNum(r.oDurationMoney);
        //          this.cardLogo(this.bankId);
        //        } else if(response.data.result == "4001") {
        //          mui.toast("失败")
        //        }
        //
        //      }, r => {
        //        console.log("请求失败")
        //      }); 
      }
    },
    //月付账单
    getMonthInfo() {
      var vueScope = this;
      if(vueScope.choosePayments=="1"){   
      if(vueScope.platformId == "1") {
        this.$api.post('order/toRecharge', {
            'token': getToken(),
            'oId': this.oId,
            'rId': this.rId
          },
          r => {
            if(r.result == "0000") {
              this.getCardInfoList = r;
              this.bankId = r.bankId;
              this.oDurationMoney = formatNum(r.amt);
              this.cardLogo(this.bankId);
            } else if(response.data.result == "4001") {
              mui.toast("失败")
            }

          }, err => {
            console.log("请求失败")
            if (err.result="4004") {
				_this.$router.push({path: '/loginIn'})
			} 
          });
      } else if(vueScope.platformId == "2") {
//      this.$api.post('fqhord/toRecharge', {
//          'token': getToken(),
//          'oId': this.oId,
//          'rId': this.rId
//        },
//        r => {
//          if(r.result == "0000") {
//            this.getCardInfoList = r;
//            this.bankId = r.bankId;
//            this.oDurationMoney = formatNum(r.amt);
//            this.cardLogo(this.bankId);
//          } else if(response.data.result == "4001") {
//            mui.toast("失败")
//          }
//
//        }, r => {
//          console.log("请求失败")
//        });

      }
       }else if(vueScope.choosePayments=="2"){
                this.$api.post('fqhrepayment/ToBeginPrepayment', {
            'token': getToken(),
            'oId': this.oId,
            'platformId': this.platformId
          },
          r => {
            if(r.result == "0000") {
              this.getCardInfoList = r;
              this.bankId = r.bankId;
              this.oDurationMoney = formatNum(r.amt);
              this.cardLogo(this.bankId);
            } else if(response.data.result == "4001") {
              mui.toast("失败")
            }

          }, err => {
            console.log("请求失败")
            if (err.result="4004") {
					_this.$router.push({path: '/loginIn'})
			} 
          });
           
       }
    },

    //    根据bankId获取银行卡logo 银行名称
    cardLogo(cardId) {
      this.bankImageUrl = '../../../static/image/bank_icon/' + cardId + '.png';
      switch(cardId) {
        case '0308':
          this.bankName = '招商银行';

          break;
        case '0104':
          this.bankName = '中国银行';
          break;
        case '0102':
          this.bankName = '中国工商银行';
          break;
        case '0105':
          this.bankName = '中国建设银行';
          break;
        case '0103':
          this.bankName = '中国农业银行';
          break;
        case '0403':
          this.bankName = '中国邮政储蓄银行';
          break;
        case '0310':
          this.bankName = '上海浦东发展银行';
          break;
        case '0307':
          this.bankName = '平安银行';
          break;
        case '0305':
          this.bankName = '中国民生银行';
          break;
        case '0309':
          this.bankName = '兴业银行';
          break;
        case '0304':
          this.bankName = '华夏银行';
          break;
        case '0303':
          this.bankName = '光大银行';
          break;
        case '0306':
          this.bankName = '广发银行';
          break;
        case '0302':
          this.bankName = '中信银行';
          break;
        case '0301':
          this.bankName = '交通银行';
          break;
      }
    },
    //    立即支付
    payNow() {
      var vueScope = this;
      if(!vueScope.selectbankFlag) {
        mui.toast("请勾选");
        return false;
      }
      var params = {
        'token': getToken(),
        'oId': this.oId,
        'amt': this.getCardInfoList.amt
      };

      if(vueScope.platformId == "1") {
        var url = BaseUrl + 'order/firstPayment';
        StandardPost(url, params);
      } else if(vueScope.platformId == "2") {
        //           StandardPost(BaseUrl + 'fenqh/firstPayment',params);
      }

    },

    //月付
    payMonth() {
      var vueScope = this;
      if(!vueScope.selectbankFlag) {
        mui.toast("请勾选");
        return false;
      }
      if(vueScope.choosePayments=="1"){
                if(vueScope.platformId == "1") {
        var params = {
          'token': getToken(),
          'oId': this.oId,
          'rId': this.rId,
          'rIds': this.rIds,
          'amt': this.getCardInfoList.amt
        };
        var url = BaseUrl + 'order/recharge';
        StandardPost(url, params);
      } else if(vueScope.platformId == "2") {
//      var params = {
//        'token': getToken(),
//        'oId': this.oId,
//        'rId': this.rId,
//        'rIds': this.rIds,
//        'isOverdue': this.isOverdue,
//        'amt': this.getCardInfoList.amt,
//        'rechargeType': 1
//      };
//      StandardPost(BaseUrl + 'order/recharge', params);
  }        
      }else if(vueScope.choosePayments=="2"){
           var params = {
            'token': getToken(),
            'oId': vueScope.oId,
            'platformId':vueScope.platformId,
            'amt':vueScope.getCardInfoList.amt
        };
        StandardPost(BaseUrl + 'fqhrepayment/beginPrepayment',params);
      }

    }

  },

}
</script>

<style>
	#orderPayment .mui-card{height: 1.20rem;margin: 0; padding: 0 0.3rem;box-sizing: border-box;}
	.op-con {padding: 0.3rem;}
	.op-con .mui-card span{font-size:0.3rem ;color: #333333;text-align: left;height: 0.6rem;margin: 0.3rem 0;display: block;line-height: 0.6rem;}
	.op-con .color-orange{color: #eb661e!important;}
	.op-con>p{padding:0.3rem;}
	.op-btn-pay{margin:1.14rem auto;}
	.op-banklogo{width: 0.74rem;height: 0.74rem;vertical-align: middle;margin: 0.23rem 0;}
	.op-icon-con{position: relative; height: 100%;}
	.op-con .mui-icon-checkmarkempty{position: absolute;right: 0;top: 0.41rem; width: 0.38rem;height: 0.38rem;border:1px solid #cccccc;border-radius: 50%;right: 0;top: 0.41rem;}
	.op-con .mui-icon-checkmarkempty:before {content: '\e472';width: 0.36rem;height: 0.36rem;font-size: 0.38rem; vertical-align: middle; position: absolute;line-height: 0.38rem;color: #FFFFFF;}
	.opSelected{background: #eb661e;border:1px solid #eb661e!important;}
</style>
