import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/page/homepage'
import productpage from '@/page/productpage'
import mypage from '@/page/mypage'
import kf from '@/components/Kf'
import choose_ptype from '@/components/choose_ptype'
import travel_detail_info from '@/page/product/travel_detail_info'
import travel_choose_product from '@/page/product/travel_choose_product'
import travel_product_list from '@/page/product/travel_product_list'
import order_detail from '@/page/order/order_detail'
import travel_upload_contract from '@/page/uploadData/travel_upload_contract'
import bindingBank from '@/components/bindingBank'
import personalCenter from '@/page/personalCenter/personalCenter'
import aboutUs from '@/page/personalCenter/aboutUs'
import changeUserName from '@/page/personalCenter/changeUserName'
import connonProblems from '@/page/personalCenter/connonProblems'
import loginIn from '@/components/loginIn'
import realName from '@/components/realName'
import aggreement from '@/page/order/aggreement'
import registration_protocol from '@/page/order/registration_protocol'
import orderOverDetail from '@/page/order/order_over_detail'
import orderPaymentAdvance from '@/page/order/order_payment_advance.vue'
import orderPayment from '@/page/order/order_payment.vue'
import travel_view_contract from '@/page/uploadData/travel_view_contract'
import systemMaintenance from '@/components/systemMaintenance'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: homepage
    },
    {
      path: '/homepage',
      component: homepage
    },
        {
       path:'/choose_ptype',
      component:choose_ptype

    },
    {
      path: '/productpage',
      component: productpage
    },
    {
      path: '/mypage',
      component: mypage
    },{
    	path:'/travel_detail_info',
    	component:travel_detail_info
    },{
    	path:'/travel_choose_product',
    	component:travel_choose_product
    },{
    	path:'/kf',
    	component:kf
    },{
      path:'/travel_product_list',
      component:travel_product_list

    },{
      path:'/order_detail',
      component:order_detail
    },{
    	path:'/travel_upload_contract',
      component:travel_upload_contract
    },{
    	path:'/bindingBank',
      component:bindingBank
    },{
    	path:'/personalCenter',
      component:personalCenter
    },{
    	path:'/aboutUs',
      component:aboutUs
    },{
    	path:'/changeUserName',
      component:changeUserName
    },{
    	path:'/connonProblems',
      component:connonProblems
    },{
    	path:'/aggreement',
      component:aggreement
    }
    ,{
        path:'/realName',
        component:realName 
    },{
       path:'/loginIn',
        component:loginIn 
    },{
      path:'/registration_protocol',
      component:registration_protocol
    },{
      path:'/orderOverDetail',
      component:orderOverDetail
    },{
      path:'/orderPaymentAdvance',
      component:orderPaymentAdvance
    },{
      path:'/orderPayment',
      component:orderPayment
    },{
      path:'/travel_view_contract',
      component:travel_view_contract
    },{
      path:'/systemMaintenance',
      component:systemMaintenance
    }

  ]
})
