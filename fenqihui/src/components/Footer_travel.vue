<template>
    <footer class="footer-travel">
        <nav class="mui-bar mui-bar-tab footer-contain">
            <router-link class="mui-tab-item mui-active" to="/homepage" v-if="ptypeSelectHome">
                <div v-if="homeSelect">
                    <span class="mui-icon">
                    <img src="../images/foot/fenqihuiyou/nav_home_.png" style="width:100%"/> 
                </span>
                    <span class="mui-tab-label">推荐</span>
                </div>
                <div v-else>
                    <span class="mui-icon">
                    <img src="../images/foot/fenqihuiyou/nav_home_true.png" style="width:100%"/> 
                </span>
                    <span class="mui-tab-label color-orange">推荐</span>
                </div>
            </router-link>
            <router-link class="mui-tab-item mui-active" to="/homepage" v-else>
                <div v-if="homeSelect">
                    <span class="mui-icon">
                    <img src="../images/foot/fenqihui/nav_home_.png" style="width:100%"/> 
                </span>
                    <span class="mui-tab-label">推荐</span>
                </div>
                <div v-else>
                    <span class="mui-icon">
                    <img src="../images/foot/fenqihui/nav_home_true.png" style="width:100%"/> 
                </span>
                    <span class="mui-tab-label color-orange">推荐</span>
                </div>
            </router-link>

            <router-link to="/productpage" class="mui-tab-item" v-if="ptypeSelectDest">
                <div v-if="destSelect">
                    <span class="mui-icon">
                    <img src="../images/foot/fenqihuiyou/nav_dest_.png" style="width:100%"/> 
                </span>
                    <span class="mui-tab-label">目的地</span>
                </div>
                <div v-else>
                    <span class="mui-icon">
                    <img src="../images/foot/fenqihuiyou/nav_dest_true.png" style="width:100%"/> 
                </span>
                    <span class="mui-tab-label color-orange">目的地</span>
                </div>
            </router-link>
            <router-link to="/productpage" class="mui-tab-item" v-else>
                <div v-if="destSelect">
                    <span class="mui-icon">
                    <img src="../images/foot/fenqihui/nav_dest_.png" style="width:100%"/> 
                </span>
                    <span class="mui-tab-label">品类</span>
                </div>
                <div v-else>
                    <span class="mui-icon">
                    <img src="../images/foot/fenqihui/nav_dest_true.png" style="width:100%"/> 
                </span>
                    <span class="mui-tab-label color-orange">品类</span>
                </div>
            </router-link>

            <router-link class="mui-tab-item" to="/mypage" v-if="ptypeSelectMine">
                <div v-if="mineSelect">
                    <span class="mui-icon">
                    <img src="../images/foot/fenqihuiyou/nav_mine_.png" style="width:100%"/> 
                </span>
                    <span class="mui-tab-label">我的</span>
                </div>
                <div v-else>
                    <span class="mui-icon">
                    <img src="../images/foot/fenqihuiyou/nav_mine_true.png" style="width:100%"/> 
                </span>
                    <span class="mui-tab-label color-orange">我的</span>
                </div>
            </router-link>
            <router-link class="mui-tab-item" to="/mypage" v-else>
                <div v-if="mineSelect">
                    <span class="mui-icon">
                    <img src="../images/foot/fenqihui/nav_mine_.png" style="width:100%"/> 
                </span>
                    <span class="mui-tab-label">我的</span>
                </div>
                <div v-else>
                    <span class="mui-icon">
                    <img src="../images/foot/fenqihui/nav_mine_true.png" style="width:100%"/> 
                </span>
                    <span class="mui-tab-label color-orange">我的</span>
                </div>
            </router-link>

        </nav>
    </footer>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        props: ['homeSelect', "destSelect", "mineSelect", "ptypeSelectHome", "ptypeSelectDest", "ptypeSelectMine"],

        created() {

        },
        mouted() {
            this.$nextTick(function() {})
        },

        methods: {
            toogleFooter() {

            },
        }
    }
</script>