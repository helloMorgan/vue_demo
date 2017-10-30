<template>
    <div id="travel-product-choose">
        <CommonHeader titles="产品选购" :imgChangeFlags="true" :backFlags="false"></CommonHeader>

        <section class="travel-content-wrap">
            <div class="travel-choose-head">
                <p class="travel-choose-data-info color-black fontSize30">选择日期</p>
            </div>
            <div class="travel-choose-data">
                <div class="swiper-container swiper-yearcontainer">
                    <div class="swiper-wrapper swiperDate">
                        <div class="swiper-slide chooseData" v-for="(item,index) in yearMonthList">
                            <p class="travel-slide-content travel_slide" @click="selectDate(item.mYearMonth,index)" :class="{dateSelected: index==selectedRow}"><span>{{item.mYearMonth}}</span></p>
                        </div>

                    </div>
                </div>
            </div>
            <section class="travel-pick-wrap" id="travel_pick_wrap">
                <nav class="travel-pick-head">
                    <ul class="travel-pick-title clearfix">
                        <li>日</li>
                        <li>一</li>
                        <li>二</li>
                        <li>三</li>
                        <li>四</li>
                        <li>五</li>
                        <li>六</li>
                    </ul>
                </nav>
            </section>
        </section>

        <section class="purchase-Msg">
            <div class="purchase-box">
                <div class="purchase-title fontSize30">
                    购买数量
                </div>

                <ul class="mui-table-view mui-grid-view mui-grid-9 purchase-number">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <div>
                            <span class="">成人</span>
                            <div class="mui-media-body">
                                <div class="add-subtract-input clearfix">
                                    <span class="leftFloat" @click="inputNumberReduce(1)">-</span>
                                    <input class="leftFloat input-number" type="number" v-model="adultinputNumber" readonly="true" />
                                    <span class="leftFloat" @click="inputNumberAdd(1)">+</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <div>
                            <span class="">老人</span>
                            <div class="mui-media-body">
                                <div class="add-subtract-input clearfix">
                                    <span class="leftFloat" @click="inputNumberReduce(2)">-</span>
                                    <input class="leftFloat" type="number" v-model="oldinputNumber" readonly="true" />
                                    <span class="leftFloat" @click="inputNumberAdd(2)">+</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <div>
                            <span class="">儿童</span>
                            <div class="mui-media-body">
                                <div class="add-subtract-input clearfix">
                                    <span class="leftFloat" @click="inputNumberReduce(3)">-</span>
                                    <input class="leftFloat" type="number" v-model="childinputNumber" readonly="true" />
                                    <span class="leftFloat" @click="inputNumberAdd(3)">+</span>
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>

            <div class="fangcha">

                <div class="mui-row">
                    <div class="mui-col-sm-12 mui-col-xs-12 clearfix fangchac">

                        <label class="leftFloat">单房差</label>
                        <span class="leftFloat fangcha-icon mui-icon mui-icon-help-filled color-orange" @click="dfcTips()"></span>
                        <div class="add-subtract-input clearfix leftFloat">
                            <span class="leftFloat" @click="dfcReduce()">-</span>
                            <input class="leftFloat input-number" type="number" v-model="aloneroomNumber" readonly="true" />
                            <span class="leftFloat" @click="dfcAdd()">+</span>
                        </div>
                        <span class="rightFloat fangcha-price fontSize24 color-orange">￥<i class="fontSize30 color-orange">{{aloneFc}}</i></span>

                    </div>

                </div>
                <div class="change-price">
                    <ul>
                        <li class="total-price clearfix">
                            <span class="leftFloat">总价</span>
                            <div class="rightFloat price-content">
                                <span>￥</span>
                                <input type="tel" maxlength="6" v-model="totalPrice" />
                            </div>
                        </li>
                        <li class="first-price clearfix">
                            <span class="leftFloat">首付<i class="fontSize24">(最低首付:￥{{basefirstPrice}})</i></span>
                            <div class="rightFloat price-content">
                                <span>￥</span>
                                <input type="tel" maxlength="6" v-model="firstPrice" />
                            </div>
                        </li>
                        <li class="clearfix stages-total-price">
                            <span class="leftFloat">分期总额</span>
                            <div class="rightFloat price-content">
                                <span class="colorBlack">￥</span>
                                <input class="colorBlack" readonly="true" type="tel" maxlength="6" v-model="stagesTotalPrice" />
                            </div>
                        </li>

                        <li class="clearfix">
                            <span class="leftFloat">备注</span>
                            <div class="rightFloat price-content remakDiv">
                                <input class="colorBlack" type="text" v-model="remark" />
                            </div>
                        </li>

                    </ul>
                </div>

                <div class="stage-choose">
                    <p class="stage-title">分期选择
                        <span class="fangcha-icon mui-icon mui-icon-help-filled color-orange stageTips" @click="stageTips()"></span>
                    </p>
                    <ul class="stage-content clearfix">
                        <li class="sq" v-for="(item,index) in installmentItems" @click="selectInstallment(item,index)" :class="{travelDevideNumSelect:index==installmentSelectedRow}">
                            <span :bind="'￥'+item.price+'×'">{{'￥'+item.price+'×'}}</span>
                            <span :bind="item.fq+'期'">{{item.fq+'期'}}</span>
                        </li>
                    </ul>
                </div>

            </div>

        </section>
        <nav class="mui-bar mui-bar-tab choose-product-footer">
            <div class="clearfix">
                <div class="leftFloat choose-product-footer-p">
                    <p class="color-orange">首付(￥)：<span class="color-orange">{{firstPrice}}</span></p>
                    <p>月付：<span class="monthShow">{{'￥'+monthShowprice+'×'+monthShowfq+'期'}}</span></p>
                </div>
                <button class="rightFloat buy-now btn-color" @click="buyNow()">立即购买</button>
            </div>
        </nav>
        <div id="popup" style="display:none"></div>
        <div class="popup" v-show="popflag"></div>
        <!--登录-->
        <div class="islogin">
            <div class="login btn-color" @click="confirmLogin()">立即登录</div>
            <div class="cancelLogin" @click="cancelLogin()">取消</div>
        </div>
        <div class="stagesOrder" style="display: none;">
            <p id="stagesOrderClose" @click="closeStage()">
            </p>
        </div>
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
                popflag: false,
                //年月数据
                yearMonthList: [],
                //日期请求的数据
                dataList: [],
                //费率
                feeData: [],
                //分期数组
                installmentItems: JSON.parse(query.installmentArr),
                fDurationList: query.fDurationList,
//              productMsg: JSON.parse(JSON.stringify(query.productMsg)),//地址栏传的
                productMsg:JSON.parse(localStorage.getItem("productMsg")),
                pId: query.pId,
                pFirstPayRate: query.pFirstPayRate,
                adultinputNumber: 1,
                oldinputNumber: 0,
                childinputNumber: 0,
                adultPrice: "",
                oldPrice: "",
                childPrice: "",
                aloneroomNumber: "0",
                aloneFc: "0",
                totalPrice: "",
                firstPrice: "",
                basefirstPrice: "",
                stagesTotalPrice: "",
                //选择的日月下标
                selectedRow: 0,
                //选择的分期下标
                installmentSelectedRow: 0,
                //余票
                ticketsLeft: "5",
                //单房差 价格
                DfcPrice: "",
                //序号oMealsId
                oMealsId: "",
                //余票
                AdultRemainTicket: "",
                ChildRemainTicket: "",
                OldRemainTicket: "",
                //月付显示
                monthShowprice: "",
                monthShowfq: "",
                adultChange: 0,
                oldChange: 0,
                childChange: 0,
                //备注
                remark: "",
                //日期
                mDate: "",
                poundages: [],
                //
                firstPricesuccess: true,
                totalPricesuccess: true,
            }
        },
        　watch: {
            totalPrice: function() {
                this.totalPriceChange()
            },
            firstPrice: function() {
                //不能有空字符串
               var aa=this.firstPrice.toString().indexOf(" ")>=0;
                if(this.firstPrice == null || this.firstPrice === "" || this.firstPrice == undefined||aa) {
                    mui.toast("*首付不能为空或者空格");
                    return false;
                } else {
                    if(isNaN(this.firstPrice)) {
                        mui.toast("*首付请输入数字");
                        return false;
                    };
                    if(parseFloat(this.firstPrice) < parseFloat(this.basefirstPrice)) {
                        var aa = this.firstPrice.toString().indexOf("0");
                        var bb = (this.firstPrice.toString().indexOf(".") <= -1) || (this.firstPrice.toString().indexOf(".") != 1);
                        var cc = this.firstPrice.length > 1;
                        if((parseFloat(aa) == 0 && bb && cc)) {
                            mui.toast("*首付请输入正确金额");
                            this.firstPricesuccess = false;
                        } else {
                            mui.toast("*不能小于最低首付:" + this.basefirstPrice);
      
                        }
                        return false;
                    } else {
                        if(parseFloat(this.firstPrice) > parseFloat(this.totalPrice)) {
                            mui.toast("*首付不能超过总价:" + this.totalPrice);
                            return false;
                        }
                    }

                }

            }
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getmonthList();
                console.log(this.productMsg.pFeature);
                console.log(this.installmentItems);
            })
        },
        methods: {
            //总价改变的时候的计算
            totalPriceChange() {
                if(isNaN(this.totalPrice)) {
                    mui.toast("*总价请输入数字");
                    return false;
                };
                var aa = this.totalPrice.toString().indexOf("0");
                var bb = (this.totalPrice.toString().indexOf(".") <= -1) || (this.totalPrice.toString().indexOf(".") != 1);
                var cc = this.totalPrice.length > 1;
                if((parseFloat(aa) == 0 && bb && cc)) {
                    mui.toast("*总价请输入正确金额");
                    this.totalPricesuccess = false;
                    return false;
                }
                 //不能有空字符串
               var tt=this.totalPrice.toString().indexOf(" ")>=0;

                if(this.totalPrice == null || this.totalPrice == "" || this.totalPrice == undefined||tt) {
                    mui.toast("*总价不能为空或者空格");
                    return false;
                }
                var vueScope = this;
                vueScope.firstPrice = vueScope.basefirstPrice = parseFloat(vueScope.totalPrice * vueScope.pFirstPayRate).toFixed(2);
                vueScope.stagesTotalPrice = parseFloat(vueScope.totalPrice - vueScope.firstPrice).toFixed(2);
                vueScope.calculateInstallment();
                return;
            },
            //计算
            calculateInstallment() {
                var vueScope = this;
                vueScope.installmentItems = [];
                var fFeeArr = parseFloatArr(vueScope.feeData.fFee.split(","));
                var fqArr = parseFloatArr(vueScope.fDurationList.split(","));
                for(var i = 0; i < fFeeArr.length; i++) {
                    var item = {};
                    var installmentAllMoney = vueScope.totalPrice - vueScope.firstPrice;
                    item.price = (installmentAllMoney / fqArr[i] + vueScope.poundages[i]).toFixed(2);
                    item.fq = fqArr[i];
                    item.pFirstFee = vueScope.pFirstFee;
                    item.poundage = vueScope.poundages[i] / item.fq;
                    item.fFee = fFeeArr[i];
                    item.initFee = fFeeArr[i] * 100;
                    vueScope.installmentItems.push(item);
                }
                vueScope.monthShowprice = vueScope.installmentItems[vueScope.installmentSelectedRow].price;
                vueScope.monthShowfq = vueScope.installmentItems[vueScope.installmentSelectedRow].fq;
            },
            //登录
            confirmLogin() {
                var vueScope = this;
                vueScope.popflag = false;
                this.$router.push({
                    path: '/loginIn'
                })
            },
            //取消
            cancelLogin() {
                var vueScope = this;
                vueScope.popflag = false;
                $(".islogin").hide();
            },
            inputNumberAdd(n) {
                var vueScope = this;
                var nums = vueScope.adultinputNumber + vueScope.oldinputNumber + vueScope.childinputNumber;
                if(nums > vueScope.ticketsLeft - 1) {
                    mui.toast("*不能大于余票哦");
                } else {
                    if(n == "1") {
                        vueScope.adultinputNumber++;
                    } else if(n == "2") {
                        vueScope.oldinputNumber++;
                    } else if(n == "3") {
                        vueScope.childinputNumber++;
                    }
                    vueScope.changePrice()
                }
            },

            inputNumberReduce(num) {
                var vueScope = this;
                if(num == "1") {
                    //                    vueScope.adultinputNumber<1?return:vueScope.adultinputNumber--;
                    if(vueScope.adultinputNumber < 1) {
                        mui.toast("*人数不能小于0哦");
                        return false;
                    } else {
                        vueScope.adultinputNumber--;
                    }
                } else if(num == "2") {
                    if(vueScope.oldinputNumber < 1) {
                        mui.toast("*人数不能小于0哦");
                        return false;
                    } else {
                        vueScope.oldinputNumber--;
                    }
                } else if(num == "3") {
                    //vueScope.childinputNumber<1?return:vueScope.childinputNumber--;
                    if(vueScope.childinputNumber < 1) {
                        mui.toast("*人数不能小于0哦");
                        return false;
                    } else {
                        vueScope.childinputNumber--;
                    }
                }
                vueScope.changePrice()
            },
            changePrice() {
                var vueScope = this;
                vueScope.adultChange = (vueScope.adultPrice) * (vueScope.adultinputNumber);
                vueScope.oldChange = (vueScope.oldPrice) * (vueScope.oldinputNumber);
                vueScope.childChange = (vueScope.childPrice) * (vueScope.childinputNumber);
                vueScope.totalPrice = parseFloat(vueScope.adultChange + vueScope.oldChange + vueScope.childChange + vueScope.aloneFc).toFixed(2);
                vueScope.stagesTotalPrice = parseFloat(vueScope.totalPrice - vueScope.firstPrice).toFixed(2);
            },
            //获取年月日
            getmonthList() {
                this.$api.post('product1/searchMealsYearMonthList', {
                    pId: this.pId
                }, r => {
                    this.yearMonthList = r.data;
                    this.selectedRow = 0;
                    if(r.result == this.resultSuccess) {
                        if(!r.data) {
                            $(".buy-now").attr("disabled", "disabled");
                            mui.toast("*没有发现有效产品");
                            setTimeout(function() {
                                history.go(-1);
                            }, 1800)
                            return;
                        }
                        setTimeout(function() {
                            var Swiper2 = new Swiper('.swiper-yearcontainer', {
                                slidesPerView: 'auto',
                                slidesPerGroup: 1,
                            })
                        }, 500);

                        this.getDayInfo(r.data[0].mYearMonth)
                    }

                }, r => {
                    console.log("请求失败")
                });
            },
            //获取日期
            getDayInfo(dateInfo) {
                var vueScope = this;
                vueScope.$api.post('product1/searchMealsDetailList', {
                    pId: vueScope.pId,
                    mYearMonth: dateInfo,
                }, r => {
                    vueScope.dataList = r.data;
                    if(r.result == vueScope.resultSuccess) {
                        if(!r.data) {

                            return;
                        }
                        vueScope.dataList = r.data;
                        vueScope.feeData = r.feeData;
                        //初始化余票,默认第一个
                        vueScope.ticketsLeft = r.data[0].mStock;

                        vueScope.totalPrice = r.data[0].mCostPrice.toFixed(2);
                        //        vueScope.pFirstPayRate?vueScope.pFirstPayRate:0.2;
                        vueScope.firstPrice = parseFloat(r.data[0].pFirstFee).toFixed(2);
                        //        vueScope.firstPrice=parseFloat(vueScope.totalPrice)*(vueScope.pFirstPayRate).toFixed(2);
                        vueScope.stagesTotalPrice = (parseFloat(vueScope.totalPrice) - parseFloat(vueScope.firstPrice)).toFixed(2);
                        vueScope.adultPrice = r.data[0].mOutPriceYoung;
                        vueScope.childPrice = r.data[0].mOutPriceChildren;
                        vueScope.oldPrice = r.data[0].mOutPriceOld;
                        vueScope.DfcPrice = r.data[0].mOutDfc;
                        vueScope.mDate = r.data[0].mDate;
                        vueScope.oMealsId = r.data[0].mId;
                        vueScope.adultChange = 1 * (vueScope.adultPrice);
                        var dateinfo = dateInfo.split('-');
                        var year = dateinfo[0];
                        var month = dateinfo[1];
                        var days = vueScope.getDays(year, month);
                        //         vueScope.monthShowprice=vueScope.installmentItems[0].price;
                        //         vueScope.monthShowfq=vueScope.installmentItems[0].fq
                        console.log(days);
                        var offset = new Date(year, month - 1, 1).getDay();
                        var filling = new Date(year, month, 1).getDay();
                        console.log(offset + "," + filling);
                        //           移除并渲染新的组件
                        $('#dynamic-ul').length > 0 && $('#dynamic-ul').remove();
                        vueScope.renderDate(days, r.data, offset, month, year);
                        //        $(".monthShow").html('￥' + vueScope.installmentItems[0].price + '×' + vueScope.installmentItems[0].fq + '期');
                    }
                    vueScope.stageData();
                }, r => {
                    console.log("请求失败")
                });
            },
            //默认选中第一个
            selectDate(date, $index) {
                $index = $index;
                //        this.selectedRow = $index;
                $('.swiper-slide').eq($index).animateCss('pulse');
                this.getDayInfo(date);
            },
            //分期选择
            selectInstallment(item, index) {
                var vueScope = this;
                vueScope.monthShowprice = item.price;
                vueScope.monthShowfq = item.fq;
                vueScope.installmentSelectedRow = index;
                //              $(".monthShow").html('￥' + vueScope.monthShowprice + '×' + vueScope.monthShowfq + '期')
            },

            //获取每月多少天
            getDays(year, month) {
                //定义当月的天数；
                var days;
                //当月份为二月时，根据闰年还是非闰年判断天数
                if(month == 2) {
                    days = year % 4 == 0 ? 29 : 28;
                } else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                    //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
                    days = 31;
                } else {
                    //其他月份，天数为：30.
                    days = 30;
                }
                //输出天数
                return days;
            },

            //渲染日期组件
            renderDate(days, combo, offset, month, year) {
                var vueScope = this;
                var ul = document.createElement('ul');
                ul.setAttribute('id', 'dynamic-ul');
                for(var _i2 = 0; _i2 < offset; _i2++) {
                    var li = document.createElement('li');
                    $(li).addClass('date-li');
                    ul.appendChild(li);
                }
                for(var i = 0; i < days; i++) {
                    var li = document.createElement('li');
                    $(li).addClass('date-li');
                    li.innerHTML = i + 1;
                    ul.appendChild(li);
                }

                var tempDate = vueScope.getFirstAndLastMonthDay(year, month);
                var date = new Date(tempDate);
                var tempDay = date.getDay();
                var temp = 6 - tempDay;
                for(var _i3 = 0; _i3 < temp; _i3++) {
                    var li = document.createElement('li');
                    $(li).addClass('date-li');
                    ul.appendChild(li);
                }
                // ul.firstElementChild.style.marginLeft = offset * 14.28 + '%';
                var di = document.createElement('div');
                di.style.cssText = 'clear:both';
                ul.appendChild(di);
                document.getElementById('travel_pick_wrap').appendChild(ul);
                $(ul).animateCss('fadeInRight');
                //为当前选日期下选中产品添加价格样式
                // thisscope.$apply();
                var tag = true;
                for(var _i4 = 0; _i4 < combo.length; _i4++) {
                    //取日的信息
                    var position = combo[_i4].mDate.split('-')[2] - 1 + offset;
                    var liEle = $('#dynamic-ul').children().eq(position);
                    //使用 自定义参数 dataSet 为li 存值
                    //此处显示价格的div 每一次都要动态生成一次
                    var div_price_tag = document.createElement('div');
                    var div_price_show = document.createElement('span');
                    var div_price_left = document.createElement('span');
                    div_price_tag.appendChild(div_price_show);
                    div_price_tag.appendChild(div_price_left);
                    // div_price_show.innerHTML = '￥' + combo[i].mOutPriceYoung.toFixed(0);
                    div_price_show.innerHTML = '￥' + combo[_i4].mOutPrice.toFixed(0);
                    div_price_show.setAttribute("mOutPrice", combo[_i4].mOutPrice.toFixed(0));
                    div_price_left.innerHTML = '余' + combo[_i4].mStock;
                    div_price_show.className = 'travel-price-tag';
                    div_price_left.className = 'travel-price-tag';

                    liEle.children('div').children('span').css('color', '#ea530c!important');
                    liEle.select_css('no_click');
                    liEle.addClass('no_click');
                    liEle.addClass('click_li');
                    liEle.append(div_price_tag);
                    //将数据位置与li进行绑定  x --> 绑定的应该是 位置不是日期
                    //    thisscope.dialog = false;
                    liEle.data('pos', _i4 + 1);
                    if(tag) {
                        liEle.addClass('grad');
                        liEle.addClass('click_li');
                        liEle.removeClass('no_click');
                        liEle.children('div').children('span').addClass('gead_font');
                        tag = false;
                    }
                    liEle.attr('id', combo[_i4].mDate);
                }
                $('.click_li').on('click', function() {

                    var i = $(this).data('pos') - 1;

                    //选中之后 进行判断是否为有日期标志 ： 若是有 取到  对应 单房差等价格                    if($(this).children('div').children('span').html()) {
                    //取值计算价格,用于单房差选择计算
                    $('.click_li').addClass('no_click');
                    $(this).removeClass('no_click');
                    $(this).siblings().children('div').children('span').removeClass('gead_font');
                    $(this).children('div').children('span').removeClass('travel-price-tag').addClass('gead_font');
                    $(this).select_css('grad');
                    $(this).children('div').children('span').css('color', '#fffff');
                    $(this).children('div').children('span').addClass('travel-price-tag');
                    //         绑定单房差选择时  价格等信息
                    //将数据放到 li里边  点击的时候 显示出来
                    console.log(combo[i]);
                    vueScope.adultPrice = combo[i].mOutPriceYoung;
                    vueScope.childPrice = combo[i].mOutPriceChildren;
                    vueScope.oldPrice = combo[i].mOutPriceOld;
                    vueScope.DfcPrice = combo[i].mOutDfc;
                    vueScope.oMealsId = combo[i].mId;
                    vueScope.AdultRemainTicket = combo[i].mStock;
                    vueScope.ChildRemainTicket = combo[i].mStockChilren;
                    vueScope.OldRemainTicket = combo[i].mStockOld;
                    vueScope.ticketsLeft = combo[i].mStock;
                    vueScope.totalPrice = combo[i].mCostPrice;
                    vueScope.mDate = combo[i].mDate;
                    vueScope.firstPrice = parseFloat(combo[i].pFirstFee).toFixed(2);
                    vueScope.adultChange = 1 * (vueScope.adultPrice);
                    vueScope.stagesTotalPrice = (parseFloat(vueScope.totalPrice) - parseFloat(vueScope.firstPrice)).toFixed(2);
                });
            },
            //获取当月最后一天日期
            getFirstAndLastMonthDay(year, month) {
                console.error('getFirstAndLastMonthDay');
                var firstdate = year + '-' + month + '-01';
                var day = new Date(year, month, 0);
                var lastdate = year + '-' + month + '-' + day.getDate();
                return lastdate;
            },
            //单房差减小
            dfcReduce() {
                var vueScope = this;
                if(this.adultinputNumber + this.childinputNumber + this.oldinputNumber === 0) {
                    this.aloneroomNumber > 1 && this.aloneroomNumber--;
                } else {
                    this.aloneroomNumber > 0 && this.aloneroomNumber--;
                }
                vueScope.dfccalculate();
            },
            //单房差增加

            dfcAdd() {
                var vueScope = this;

                var num = vueScope.adultinputNumber + vueScope.oldinputNumber + vueScope.childinputNumber;
                vueScope.aloneroomNumber < num && vueScope.aloneroomNumber++;
                vueScope.dfccalculate();
            },
            //单房差计算
            dfccalculate() {
                var vueScope = this;
                vueScope.aloneFc = (vueScope.DfcPrice) * (vueScope.aloneroomNumber);
                vueScope.totalPrice = parseFloat(vueScope.adultChange + vueScope.oldChange + vueScope.childChange + vueScope.aloneFc).toFixed(2);
                vueScope.stagesTotalPrice = parseFloat(vueScope.totalPrice - vueScope.firstPrice).toFixed(2);
            },
            //立即购买
            buyNow() {
                var vueScope = this;
                var token = getToken();
                if(token) {
                    if(isNaN(vueScope.firstPrice) || isNaN(vueScope.totalPrice)) {
                        mui.toast("*首付.总价请输入数字");
                        return false;
                    }

                    if(vueScope.adultinputNumber + vueScope.childinputNumber + vueScope.oldinputNumber === 0) {
                        mui.toast("*请选择至少一个出行人");
                        return false;
                    };

                    if(!vueScope.totalPrice || !vueScope.firstPrice||(vueScope.totalPrice.toString().indexOf(" ")>=0)||(vueScope.firstPrice.toString().indexOf(" ")>=0)) {
                        mui.toast("*首付和总价金额必须填写且不能有空格");
                        return false;
                    };
                    //           
                    var aa = parseFloat(vueScope.firstPrice) < parseFloat(vueScope.basefirstPrice);
                    var bb = parseFloat(vueScope.firstPrice) >= parseFloat(vueScope.totalPrice)
                    var ifInvalid = aa || bb;
                    if(ifInvalid) {
                        if((vueScope.totalPricesuccess)&&(vueScope.firstPricesuccess)) {
                            mui.toast('*首付金额需要高于最低首付,低于总价');
                        } else {
                            if(!vueScope.totalPricesuccess){
                               mui.toast("*总价请输入正确的金额");
                            }
                            if(!vueScope.firstPricesuccess){
                               mui.toast("*首付请输入正确的金额");
                            }

                        }
                        return false;
                    }
                    //单房差判断
                    var Nums = vueScope.adultinputNumber + vueScope.childinputNumber + vueScope.oldinputNumber;
                    //奇数时单房差必选
                    if(Nums % 2 !== 0) {
                        if(vueScope.aloneroomNumber == 0) {
                            mui.toast("*根据您选择的人数请选择单房差");
                            return false;
                        }
                    }
                    console.log(vueScope.productMsg.pTitle);
                    var chooseProduct = {
                        //标题
                        title: vueScope.productMsg.pTitle,
                        //子标题
                        subTitle: vueScope.productMsg.subTitle,
                        //首付
                        firstPrice: vueScope.firstPrice,
                        //出发日期
                        departureDate: vueScope.mDate,
                        //购买数量 成人、老人、儿童、
                        shopNum: vueScope.adultinputNumber + vueScope.oldinputNumber + vueScope.childinputNumber,
                        //商户名称
                        sName: vueScope.productMsg.sName,
                        //套餐id
                        oMealsId: vueScope.oMealsId,
                        //老人购买数量
                        oldNum: vueScope.oldinputNumber,
                        //购买儿童数量
                        childNum: vueScope.childinputNumber,
                        //成人购买数量
                        adultNum: vueScope.adultinputNumber,
                        //分期数
                        oTotalDuration: vueScope.monthShowfq,
                        //分期价格
                        oTotalprice: vueScope.monthShowprice,
                        //商品id
                        pId: vueScope.pId,
                        //单房差价格
                        oTotalDfcMoney: vueScope.aloneFc,
                        // 总价 | 含有手续费
                        totalMoney: parseFloat(vueScope.totalPrice),
                        //计算总价 | 不含手续费
                        calTotalPrice: vueScope.totalPrice - vueScope.firstPrice,
                        //手续费价格
                        oTotalSxfMoney: vueScope.poundages[vueScope.installmentSelectedRow],
                        // 单房差数
                        dfcNum: vueScope.aloneroomNumber,
                        remark: vueScope.remark
                    };
                    //         return false;
                    vueScope.$router.push({
                        path: '/order_detail',
                        query: {
                            chooseProduct: chooseProduct
                        }
                    });
                    console.log(chooseProduct);
                    var chooseProductStr = JSON.stringify(chooseProduct);
                    console.log(chooseProductStr);
                    sessionStorage.setItem("chooseProduct", chooseProductStr);
                } else {
                    vueScope.popflag = true;
                    $(".islogin").show();
                    $('.islogin').animateCss('fadeInUp');
                }
            },
            //单房差提示
            dfcTips() {
                mui.alert('自由行产品以两人入住一间房为价格核算标准,如出现单人购买入住一间房，需要交补一人单房差。', '单房差说明', '我知道了', function() {
                    console.log("调用成功")
                });
            },
            //关闭分期
            closeStage() {
                $("#popup").hide();
                $(".stagesOrder").hide();
                $(".take_notes").remove();
            },
            //分期提示
            stageTips() {
                var vueScope = this;
                $("#popup").show();
                vueScope.$api.post('product1/searchProductDetail?', {
                    pId: vueScope.pId,
                    token: null,
                }, r => {
                    vueScope.dataList = r.data;
                    if(r.result == vueScope.resultSuccess) {
                        if(!r.data) {

                            return;
                        } else {

                            var feeList = r;
                            //获得的时间数组
                            var timeArr = feeList.data.fDuration.split(',');
                            //活得的利率数组
                            var timefFees = feeList.fDurationData.fFee.split(',');

                            var stagesOrderBorder = $('<div class="take_notes"><p class="stagesOrderheader">分期费率说明</p><a class="stagesOrdertitle clearfix"><span>期数</span><span>利息</span><span>期数</span><span>利息</span></a></div>');
                            var tips = $('<p class="stagesOrdertips">注：需额外收取分期手续费0.5%</p>');
                            $(timeArr).each(function(index, ele) {
                                console.log(ele); /*' <div class="slide stagesOrderBorder"><i>' + ele.duration + '期&nbsp;: &nbsp; </i> 首付<i> &nbsp;' + parseFloat(that.firstPrice).toFixed(2)+ '</i> &nbsp;起 &nbsp; <a>' + parseFloat(ele.mPay).toFixed(2) + '×' + ele.duration + '</a>  期</div>'*/

                                if(parseFloat(timefFees[index] - 0.005) > 0) {
                                    timefFees[index] = ((timefFees[index] - 0.005) * 100).toFixed(2);
                                    $(".stagesOrdertips").html("注：需额外收取分期手续费0.5%");

                                } else if(parseFloat(timefFees[index] - 0.005) == 0) {
                                    timefFees[index] = 0;
                                    $(".stagesOrdertips").html("注：需额外收取分期手续费0.5%");
                                } else {
                                    timefFees[index] = timefFees[index] * 100;
                                    $(".stagesOrdertips").html("注：需额外收取分期手续费0%")
                                }

                                var aa = $('<a style="width:50%;" class="stagesOrderbody clearfix"><span>' + ele + '</span><span>' + timefFees[index] + "%" + '</span></a>');

                                stagesOrderBorder.append(aa).append(tips);
                                $(".stagesOrder").append(stagesOrderBorder);
                                $(".stagesOrder").show();
                                $("#popup").show();
                            }); /*注：需额外收取分期手续费0.5%*/
                            //
                        }
                    }

                }, r => {
                    console.log("请求失败")
                });

            },

            stageData() {
                var vueScope = this;
                var fFeeArr = parseFloatArr(vueScope.feeData.fFee.split(","));
                for(var i = 0; i < fFeeArr.length; i++) {
                    var p = parseFloat(vueScope.totalPrice) - parseFloat(vueScope.firstPrice);

                    vueScope.poundages[i] = p * fFeeArr[i];
                    console.log(vueScope.poundages);
                }

            },

        }
    }
</script>
<style>
    .travel-choose-head{height:0.3rem;margin:0.28rem auto 0.3rem;padding-left:0.3rem}
    .swiper-yearcontainer .swiper-slide{width:1.6rem;height:0.9rem;line-height:0.9rem;text-align:center;border:1px solid #e1e1e1;border-radius:5px;-webkit-border-radius:5px;margin-right:0.2rem;}
    .travel-pick-wrap{margin:0.3rem auto 0;width:6.9rem;}
    .travel-pick-head{height:0.9rem;background: #30CFB6;border-top-right-radius: 5px;border-top-left-radius: 5px;}
    .travel-pick-title li {text-align: center;height:0.9rem;line-height:0.9rem;float: left;width: 14.28%;font-size: .24rem;color: #FFFFFF;}
    .dateSelected{background: #ee6e00 !important;border-radius: 5px;}
    .dateSelected>span{color:#fff!important;}
    .gead_font, .grad {color: #fff !important}
    .click_li{line-height:0.3rem!important}
    .gead_font, .travel-price-tag {display: block;}
    .grad {background: #ee6e00 !important;border-radius: 3px}
    #dynamic-ul{background-color: #ECEFF1;}
    .stageTips{font-size:0.4rem}
    #dynamic-ul .date-li{text-align: center;height:0.9rem;line-height:0.9rem;float: left;width: 14.28%;border-bottom:1px solid #fff;border-right:1px solid #fff}
    #dynamic-ul .date-li:nth-child(7n){border-right:0;}
    .purchase-Msg .mui-grid-view.mui-grid-9,.purchase-Msg .mui-grid-view.mui-grid-9 .mui-table-view-cell{border:none;text-align:left;padding:0;height:1.46rem;}
    .purchase-box{width:100%;background-color: #fff;}
    .purchase-Msg .purchase-title{margin:0 0.3rem;width:6.9rem;height:0.88rem;line-height:0.88rem;border-bottom:1px solid #e1e1e1;color:#293f46}
    .purchase-Msg .purchase-number{margin:0 0.3rem;width:6.9rem;background-color: #fff;}
    .purchase-Msg .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{font-size:0.3rem;height:0.46rem;line-height:0.46rem;overflow: initial;}
    .purchase-Msg .mui-numbox{width:1.82rem;height:0.46rem;background-color: #fff;padding:0 0.5rem}
    .purchase-Msg .mui-table-view.mui-grid-view .mui-table-view-cell>div{margin-top:0.2rem}
    .purchase-Msg .mui-table-view.mui-grid-view .mui-table-view-cell>div>span{font-size:0.3rem;color:#71888d}
    .purchase-Msg .add-subtract-input{height:0.46rem;border:1px solid #e1e1e1;width:1.82rem;border-radius: 3px;-webkit-border-radius: 3px;}
    .purchase-Msg .add-subtract-input span{display:block;width:0.46rem;height:100%;text-align: center;color:#888888;font-size:0.45rem}
    .purchase-Msg .add-subtract-input span:nth-child(1){border-right:1px solid #e1e1e1}
    .purchase-Msg .add-subtract-input span:nth-child(3){border-left:1px solid #e1e1e1}
    .purchase-Msg .add-subtract-input input{width:0.82rem;padding:0;margin:0;height:100%; border:none;text-align: center;font-size: 0.3rem;}
    .purchase-Msg .fangcha{margin-top:0.28rem;background-color: #fff;}
    .fangcha-price{margin-right:0.3rem}
    .stage-choose{padding-bottom:0.5rem}
    .travelDevideNumSelect {background: #ee6e00;color: #fff !important;}
    .travelDevideNumSelect>span{color: #fff !important;}
    .purchase-Msg .fangcha .fangchac{padding:0.4rem 0.3rem;font-size:0.3rem}
    .purchase-Msg .fangcha .fangchac .fangcha-icon{margin:0 0.3rem;font-size:0.4rem}
    .purchase-Msg .change-price{margin:0 0.3rem;border-top:1px solid #e1e1e1;border-bottom:1px solid #e1e1e1;font-size:0.3rem;padding:0.3rem 0}
    .purchase-Msg .change-price ul li{background:#EDEDED;width:6.9rem;height:0.9rem;line-height:0.9rem;padding:0 0.3rem;margin-bottom:0.2rem;border-radius: 3px;}
    .purchase-Msg .change-price ul li:nth-child(3){margin-bottom:0.2rem}
    .purchase-Msg .change-price ul li .price-content{width:3rem;height:0.7rem;background-color: #fff;margin:0.1rem 0;border-radius: 3px;}
    .purchase-Msg .change-price ul li .price-content input{height:100%;padding:0;margin:0;border:none;width:1.5rem;vertical-align:top;font-size:0.36rem;color:#eb661e;}
    .purchase-Msg .change-price ul li .price-content span{vertical-align: top;height:100%;margin-left:0.9rem;display: inline-block;font-size:0.24rem;color:#eb661e;line-height: 0.8rem;}
    .purchase-Msg .stage-title{margin:0.3rem 0;margin-left:0.3rem;font-size:0.3rem;color:#333333}
    .purchase-Msg .stage-content{/*margin:0 0.3rem*/}
    .purchase-Msg .stage-content li{float: left;width:3rem;height:1rem;line-height:1rem;font-size:0.3rem;text-align: center;border:1px solid #e1e1e1;border-radius: 5px;font-size:0.3rem;margin-left:0.5rem;margin-bottom:0.2rem}
    /*弹窗样式*/
    #stagesOrderClose{padding: 0;margin: 0;width: 0.52rem;height: 0.52rem;margin-left: 5.6rem;position: absolute;left: 0.24rem;top: -0.8rem;background: url(../../images/stager_close.png);background-size:100% 100%;}
    .stagesOrder {width:6.3rem;background: #FFF!important;position: fixed;top: 5.2rem;height:3.3rem;left: 0.58rem;margin: 0 auto;z-index: 1000;padding:0 0.4rem;border-radius:5px;font-size: .3rem;color: #777;}
   .stagesOrder i {color: #e6381a;font-weight: 800}
   .stagesOrder a {color: #000;font-weight: 800}
    #popup{ height:110%;top: 0;bottom: 0;width: 100%;background: #000;opacity: .5;z-index: 99;position: fixed;}
    .stagesOrderBorder {height: 1rem;line-height: 1rem;border-bottom: 1px solid #D8D8D8}
    .stagesOrderheader{width:100%;text-align:center;overflow: hidden;margin-top:0.3rem}
    .stagesOrdertitle>span{display: block;width:25%;height:0.6rem;line-height:0.6rem;float:left;text-align:center;border-right:1px  solid #fff;box-sizing: border-box;font-size:0.24rem;color:#fff;}
    .stagesOrdertitle>span:nth-last-child{border-right:none;}
    .stagesOrdertitle {display: block;margin-top:0.15rem;background-color: #f06e00!important;}
    .stagesOrderbody{ display: block;float:left;box-sizing: border-box;height:0.6rem;}
    .stagesOrderbody>span{display: block;width:50%;height:100%;float:left;line-height:0.6rem;border-left:1px solid #C1C1C1;text-align: center;box-sizing: border-box;border-bottom: 1px solid #C1C1C1;font-size: 0.26rem;color:#333333;}
    .stagesOrder .stagesOrderbody:nth-child(4),
    .stagesOrder .stagesOrderbody:nth-child(6),
    .stagesOrder .stagesOrderbody:nth-child(8){border-right:1px solid #C1C1C1;}
    .stagesOrdertips{text-align: right;margin-top:1.32rem;}
    .choose-product-footer{height:0.98rem}
    .choose-product-footer-p p{margin-left:0.3rem;font-size:0.24rem}
    .choose-product-footer-p p:nth-child(1){margin-top:0.2rem;font-size:0.3rem}
    .choose-product-footer .buy-now{width:2.5rem;height:100%;line-height:0.98rem;text-align: center;font-size:0.3rem;color:#fff}
    .colorBlack{color: #333333!important;}
    .travel-choose-data{margin-left:0.3rem}
    .purchase-Msg .change-price ul li .remakDiv input{width:100%}
    /*点击登录*/
    .popup{position:fixed;width:100%;height:100%;left:0;bottom:0;right:0;top:0;background: rgba(0,0,0,0.4);z-index: 999;}
    .islogin {width: 100%; padding: 0.4rem 0 0.4rem;color: #FFFFFF;background-color: #FFFFFF;position: fixed;left: 0;bottom:0;z-index: 9999;display: none;}
    .islogin .login {width:6.4rem;margin: 0 auto;height:0.88rem;line-height: 0.88rem;text-align: center;border-radius: 5px;font-size:0.3rem;}
    .islogin .cancelLogin {width:6.4rem;margin: 0 auto;height:0.88rem;margin-top: 0.4rem;line-height: 0.88rem;text-align: center;font-size:0.3rem;color: #eb661e;border-radius:5px;-webkit-border-radius: 5px;background: url(../../images/button_boder.png);background-size:100% 100%;}

</style>
