<template>
    <div>
        <el-header>
            <div class="myHeader">
                <div class="title">音乐网站</div>
                <div class="login">
                    <div v-if="!isLogin">
                        <el-button class="login-btn" type="primary" @click="handleLogin" key="login-btn">登录</el-button>
                    </div>
                    <div class="login" v-else>
                        <router-link class="avatar" to="/">{{userInfo.nickname}}</router-link>
                        <el-button class="logout-btn" type="text" @click="handleLogout" key="logout-btn">退出登录</el-button>
                    </div>
                </div>
            </div>
        </el-header>
        <el-main>
            <el-menu :default-active="'推荐'" mode="horizontal">
                <el-menu-item v-for="item of list" :key="item"></el-menu-item>
            </el-menu>
            <router-view class="main-content" :isLogin="isLogin"/>
        </el-main>
        <el-footer>
            <my-player></my-player>
        </el-footer>
    </div>
</template>

<script>
import myPlayer from '@/components/player'

import { mapState, mapActions } from 'vuex'

export default {
    name: 'index',
    components: {
        'my-player': myPlayer
    },
    data () {
        return {
            isLogin: false,
            list: ['播放列表', '推荐', '排行榜', '搜索', '历史纪录']
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapActions(['setUserInfo']),
        handleLogin () {
            this.$axios({
                url: '/login/cellphone',
                params: {
                    phone: 18670297024,
                    password: 'hb06290525'
                }
            }).then(res => {
                var userInfo = res.data.profile
                this.setUserInfo(userInfo)
                this.isLogin = true
                this.$emit('login')
            })
        },
        handleLogout () {
            this.$axios({
                url: '/logout'
            }).then(res => {
                this.setUserInfo()
                this.isLogin = false
                this.$emit('logout')
            })
        },
        handleGoto (path) {
            this.$router.push(path)
        }
    },
    mounted () {
        if (this.userInfo) {
            this.isLogin = true
        } else {
            this.isLogin = false
        }
    }
}
</script>

<style lang="stylus" scoped>
.el-header,
.el-footer
    padding 0

.title
    text-align center

.login
    position absolute
    right 0

.nav
    height 44px
    margin-left 40px

    li
        float left
        height 26px
        padding 8px 16px
        margin 0 6px
        border 1px solid grey
        border-radius 2px
        font-size 14px
        line-height 26px
        cursor pointer
</style>

<style lang="stylus">
</style>
