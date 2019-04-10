<template>
    <div>
        <div class="myHeader">
            <img src="@/assets/images/logo.png" class="logo">
            <el-menu default-active="1" mode="horizontal" class="top-el-menu">
                <el-menu-item index="1">发现音乐</el-menu-item>
                <el-menu-item index="2">我的音乐</el-menu-item>
                <el-menu-item index="3">朋友动态</el-menu-item>
            </el-menu>
            <el-input v-model="input" prefix-icon="el-icon-search" placeholder="音乐/专辑/歌单"></el-input>
            <div class="login" v-if="!isLogin">
                <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
            </div>
            <div class="login" v-else>
                <span>Hi~! {{userInfo.nickname}}</span>
                <router-link class="avatar" to="/"><img :src="userInfo.avatarUrl"></router-link>
                <el-button class="logout-btn" type="text" @click="handleLogout">退出登录</el-button>
            </div>
        </div>
        <div class="header-nav">
            <el-menu mode="horizontal" default-active="0">
                <el-menu-item @click="handleAlert" v-for="(item, index) in navList" :key="item" :index="index + ''">{{item}}</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'myHeader',
    data () {
        return {
            input: '',
            isLogin: false,
            navList: ['首页', '排行榜', '歌单']
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
            })
        },
        handleLogout () {
            this.$axios({
                url: '/logout'
            }).then(res => {
                this.setUserInfo()
                this.isLogin = false
            })
        },
        handleAlert () {
            // alert(123)
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
.myHeader
    position relative
    width 1200px
    height 90px
    margin 0 auto
    font-size 0

    > *
        display inline-block

    .logo
        height 70px
        margin 10px 0 10px 20px

    .el-input
        position absolute
        top 28px
        left 660px
        width 220px

    .login
        position absolute
        top 0
        left 910px
        height 100%
        width 300px
        font-size 14px

        .login-btn
            position absolute
            top 50%
            border none
            transform translateY(-42%)

        span
            line-height 90px

        .avatar
            display inline-block
            position relative
            top 16px
            left 10px
            height 44px
            width 44px
            border-radius 22px

            img
                width 100%

        .logout-btn
            position absolute
            top 50%
            left 60%
            border none
            transform translateY(-50%)

.header-nav
    overflow hidden
    height 40px
    background-color #409EFF
</style>

<style lang="stylus">
.el-menu.top-el-menu
    width 360px
    height 90px
    margin 0 20px
    border-bottom-width 0

    .el-menu-item
        width 120px
        height 90px
        font-size 20px
        color #333
        line-height 90px
        text-align center
        border none

    .el-menu-item:not(.is-disabled):hover
        color #409EFF

    .el-menu-item.is-active:hover,
    .el-menu-item.is-active
        color #fff
        background-color #409EFF

.header-nav

    .el-menu
        height 30px
        width 692px
        border none
        margin 5px auto
        background-color #409EFF

        .el-menu-item
            height 100%
            border none
            border-radius 15px
            margin 0 10px
            line-height 30px
            color #fff

        .el-menu-item:hover,
        .el-menu-item:focus,
        .el-menu-item.is-active
            color #333
            background-color #fff
</style>
