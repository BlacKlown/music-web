<template>
    <el-container class="wrapper">
        <el-header height="50px">
            <div class="my-header">
                <div class="title">音乐网站</div>
                <div class="login">
                    <div v-if="!isLogin">
                        <el-button class="login-btn" type="text" @click="handleLogin" key="login-btn">登录</el-button>
                    </div>
                    <div class="login" v-else>
                        <router-link class="avatar" to="/">{{userInfo.nickname}}</router-link>
                        <el-button class="logout-btn" type="text" @click="handleLogout" key="logout-btn">退出登录</el-button>
                    </div>
                </div>
            </div>
        </el-header>
        <el-main>
            <el-container class="main-content">
                <el-main>
                    <ul class="my-nav">
                        <router-link tag="li" :class="{ active: item.to == $router.history.current.name }" v-for="item of navList" :key="item.title" :to="item.to">{{item.title}}</router-link>
                    </ul>
                    <router-view class="view"/>
                </el-main>
                <el-aside>
                    <div>123123</div>
                </el-aside>
            </el-container>
        </el-main>
        <el-footer>
            <my-player></my-player>
            <div class="bg" :style="{ 'background-image': 'url(' + picUrl + ')' }"></div>
            <div class="mask"></div>
        </el-footer>
    </el-container>
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
            navList: [{
                title: '播放列表',
                to: 'playList'
            }, {
                title: '推荐',
                to: 'recommend'
            }, {
                title: '排行榜',
                to: 'rankList'
            }, {
                title: '搜索',
                to: 'TopPlayList'
            }, {
                title: '历史纪录',
                to: 'myMusic'
            }],
            picUrl: 'http://cdn.mtnhao.com/music/bg.jpg'
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
@import '../assets/var.styl'

.wrapper
    height 100%
    overflow hidden

    .el-header,
    .el-footer,
    > .el-main
        padding 0

.my-header

    .title
        text-align center
        line-height 50px
        color $lightColor
        font-size 26px
        letter-spacing 4px

    .login
        position absolute
        right 0
        top 0
        width 100px

.main-content
    height 100%

    .my-nav
        overflow hidden
        background-color rgba(0, 0, 0, 0)
        border none

        li
            float left
            height 18px
            padding 10px 24px
            border 1px solid $normalColor
            border-radius 4px
            margin 0 8px 0 0
            font-size 14px
            color $normalColor
            background-color rgba(0, 0, 0, 0)
            cursor pointer

            &.active,
            &:hover
                color $lightColor
                border-color $lightColor
    .view
        height calc(100% - 40px)

.bg,
.mask
    position fixed
    top 0
    height 100%
    width 100%

.bg
    z-index -2
    background-position center center
    filter blur(12px)
    opacity .7

.mask
    z-index -1
    background-color rgba(0, 0, 0, .4)
</style>

<style lang="stylus">
</style>
