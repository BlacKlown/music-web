<template>
    <el-container class="wrapper">
        <el-header height="50px">
            <div class="my-header">
                <div class="title">音乐网站</div>
                <div class="login">
                    <div v-if="!isLogin">
                        <el-button class="login-btn" type="text" @click="handleLogin">登录</el-button>
                    </div>
                    <div v-else>
                        <p class="avatar">{{userInfo.nickname}}</p>
                        <el-button class="logout-btn" type="text" @click="handleLogout">退出</el-button>
                    </div>
                </div>
            </div>
        </el-header>
        <el-main>
            <el-container class="main-content">
                <el-main>
                    <ul class="my-nav">
                        <router-link tag="li" :class="{ active: item.to == $router.history.current.name }" v-for="item of navList" :key="item.title" :to="'/' + item.to">{{item.title}}</router-link>
                    </ul>
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive" :isLogin="isLogin" class="view"/>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive" :isLogin="isLogin" class="view"/>
                </el-main>
                <el-aside width="400px">
                    <div class="music-info">
                        <div class="cover-base">
                            <img src="../assets/images/player_cover.png" alt="cover">
                        </div>
                        <div class="text-info">
                            <p class="title">歌曲名：敢爱敢做</p>
                            <p class="artist">歌手名：林子祥</p>
                            <p class="album">专辑名：敢爱敢做</p>
                        </div>
                    </div>
                    <div class="lyric-wrapper">
                        <div class="lyric">
                            <p v-for="(line, index) of lyric" :key="index">{{line}}</p>
                        </div>
                    </div>
                </el-aside>
            </el-container>
        </el-main>
        <el-footer height="100px">
            <div class="player">
                <audio ref="audio" src=""></audio>
                <div class="player-bar">
                    <div class="btns btns-left">
                        <i class="iconfont icon-shangyishou icon-md"></i>
                        <i v-if="!playing" @click="handleContinue" class="iconfont icon-bofang icon-lg"></i>
                        <i v-else @click="handleStop" class="iconfont icon-zanting icon-lg"></i>
                        <i class="iconfont icon-xiayishou icon-md"></i>
                    </div>
                    <div class="process">
                        <div class="process-info">
                            <span>敢爱敢做 - 林子祥</span>
                            <span>1:35 / 3:10</span>
                        </div>
                        <div class="process-bar">
                            <div class="process-current"></div>
                        </div>
                    </div>
                    <div class="btns btns-right">
                        <i class="iconfont icon-sm"
                           :class="['icon-liebiaoxunhuan', 'icon-danquxunhuan', 'icon-suiji'][playMode]"
                           @click="handleChangeMode"></i>
                        <i v-if="playing" @click="handleContinue" class="iconfont icon-xin icon-sm"></i>
                        <i v-else @click="handleStop" class="iconfont icon-xin1 icon-sm"></i>
                        <i class="iconfont icon-xiazai icon-sm"></i>
                        <div class="volume-bar">
                            <i v-if="!playing" @click="handleContinue" class="iconfont icon-yinliang icon-sm"></i>
                            <i v-else @click="handleStop" class="iconfont icon-jingyin icon-sm"></i>
                            <div class="volume-process">
                                <div class="current-volume"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg" :style="{ 'background-image' : 'url(' + picUrl + ')' }"></div>
            <div class="mask"></div>
        </el-footer>
    </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'index',
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
                title: '我的歌单',
                to: 'myMusic'
            }, {
                title: '搜索',
                to: 'search'
            }],
            picUrl: 'http://cdn.mtnhao.com/music/bg.jpg',
            playing: false,
            playMode: 2, // 0:列表循环, 1:单曲循环, 2随机播放
            lyric: []
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
        handleContinue () {
            this.$refs.audio.play()
            this.playing = !this.$refs.audio.paused
        },
        handleStop () {
            this.$refs.audio.pause()
            this.playing = !this.$refs.audio.paused
        },
        handleChangeMode () {
            this.playMode++
            if (this.playMode > 2) {
                this.playMode = 0
            }
        },
        getLyric () {
            this.$axios({
                url: '/lyric?id=33894312'
            }).then(res => {
                let lyricText = res.data.lrc.lyric.replace(/\n/g, '')
                console.log(lyricText)
                let timeReg = /\[\d+:\d+[[.|:]\d*]*\]/
                // lyricText.replace(timeReg, '$/n$')
                this.lyric = lyricText.split(timeReg)
                console.log(this.lyric)
            })
        }
    },
    mounted () {
        if (this.userInfo) {
            this.isLogin = true
        } else {
            this.isLogin = false
        }
        this.getLyric()
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
        width 140px

        > div
            display flex
            line-height 40px

            .avatar
                color $lightColor

            .login-btn
                float right

.main-content
    max-width 1800px
    height 100%
    margin 0 auto

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
        height calc(100% - 60px)
        margin-top 20px

    .music-info
        height 300px
        width 300px
        margin 20px auto 0

        .cover-base
            position relative
            width 186px
            height 186px
            margin 0 auto

            img
                height 100%

            &::after
                content ''
                display block
                position absolute
                top 0
                left 9px
                height 180px
                width 201px
                background-image url(../assets/images/album_cover_player.png)

        .text-info
            padding 10px 0
            font-size 14px
            color $normalColor
            text-align center

            p
                margin 10px

    .lyric-wrapper
        overflow hidden
        height 340px
        margin-top 80px
        color $normalColor
        font-size 14px
        text-align center

        .lyric
            height 100%
            overflow auto
            margin-right -10px

            p
                padding 6px 0

            .on
                padding 12px 0
                color $lightColor
                font-size 16px

.el-footer
    color $normalColor

    .player
        height 100%

        .player-bar
            height 100%
            display flex

            .btns
                height 80%
                margin 0 20px
                display flex
                justify-content space-around
                align-items center

            .btns-left
                width 200px

            .process
                flex 1

                .process-info
                    display flex
                    margin 16px 0 10px
                    font-size 14px
                    justify-content space-between

                .process-bar
                    width 100%
                    height 4px
                    border-radius 2px
                    background-color rgba(255, 255, 255, .2)
                    cursor pointer

                    .process-current
                        position relative
                        width 50%
                        height 100%
                        border-radius 2px
                        background-color $normalColor

                        &::after
                            content ''
                            display block
                            position absolute
                            top 50%
                            right 0
                            width 12px
                            height 12px
                            border-radius 6px
                            background-color $lightColor
                            transform translate(50%, -50%)

            .btns-right
                width 300px

                .volume-process
                    display inline-block
                    height 4px
                    width 80px
                    border-radius 2px
                    margin-left 4px
                    background-color rgba(255, 255, 255, .2)
                    cursor pointer

                    .current-volume
                        position relative
                        width 50%
                        height 100%
                        border-radius 2px
                        background-color $normalColor

                        &::after
                            content ''
                            display block
                            position absolute
                            top 50%
                            right 0
                            height 8px
                            width 8px
                            border-radius 4px
                            background-color $lightColor
                            transform translate(50%, -50%)
        .iconfont
            cursor pointer

            &:hover
                color $lightColor

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
