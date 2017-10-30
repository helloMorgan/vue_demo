<template>
    <div id="choosePtype">
        <div class="chooseProduct">
            <div class="chooseProductTitle">
                <div class="chooseTitle">
                    <div>选择分期产品类型</div>
                </div>
                <div class="chooseTravel" @click="chooseProduct(1)">
                    <img src="../images/choosePtype/chooseTravel.png"/>
                </div>
                <div class="chooseWedding" @click="chooseProduct(2)">
                    <img src="../images/choosePtype/chooseWedding.png"/> 
                </div>
            </div>
            <div class="chooseFooter">
                <img src="../images/choosePtype/chooseFooter.png"/>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        created() {
            
        },
        methods: {
            chooseProduct(n) {
                    var chooseIndex=n;
                    if(chooseIndex == 1) {
                        localStorage.setItem('ProductType', '1');
                    } else if(chooseIndex == 2) {
                        localStorage.setItem('ProductType', '2');
                    }
		  		    this.$router.push({path: '/homepage',query: {ptype: n}});
            },
        }
    }
</script>
<style>
    /*引导页和产品选择页*/ 
    .chooseProduct {width: 100%;height: 100%;position: fixed;left: 0;top: 0;}
    /*产品选择页*/ 
    .chooseProduct {z-index: 99;background-color: #fff;color: #fff;text-align: center;}
    .chooseTravel,.chooseWedding {width: 3.04rem;height: 3.04rem;margin: 0 auto;} 
    .chooseTravel {margin-top: 0.85rem;}
    .chooseWedding { margin-top: 0.7rem;/*margin-bottom:1.2rem;*/}
    .chooseTravel>img,.chooseWedding>img {width: 100%;}
    .chooseFooter {width: 100%;height: 2.2rem;}
    .chooseFooter>img {width: 100%;}
    .chooseProductTitle {width: 100%;padding-top: 0.8rem;padding-bottom: 1.2rem;background: url(../images/choosePtype/chooseBg.png);background-size: 100% 100%;-webkit-background-size: 100% 100%;}
    .chooseTitle {width: 100%;position: absolute;text-align: center;font-size: 0.36rem;} 
    .chooseTitle div {color: #fff;}
    /*CSS伪类用法*/
    .chooseTitle div:after,.chooseTitle div:before {background: #FFFFFF;content: "";height: 1px;position: absolute;top: 40%;width: 0.74rem;}
    /*调整背景横线的左右距离*/
    .chooseTitle div:before {left: 1.3rem;}
    .chooseTitle div:after {right: 1.3rem;}
</style>