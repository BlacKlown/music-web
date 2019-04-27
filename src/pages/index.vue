<template>
    <el-container class="wrapper">
        <el-header height="50px">
            <div class="my-header">
                <div class="title">音乐网站</div>
                <div class="login">
                    <template v-if="!isLogin">
                        <el-button class="login-btn" type="text" @click="toggelShowDialog">登录</el-button>
                    </template>
                    <template v-else>
                        <p class="avatar">{{userInfo.nickname}}</p>
                        <el-button class="logout-btn" type="text" @click="handleLogout">退出</el-button>
                    </template>
                </div>
                <div class="dialog-cover" v-if="showDialog">
                    <div class="dialog">
                        <p class="title">登录</p>
                        <p>账号: <input type="text" v-model="account"></p>
                        <p>密码: <input type="password" v-model="password"></p>
                        <el-button type="text" @click="handleLogin">登录</el-button>
                        <el-button type="text" @click="toggelShowDialog">取消</el-button>
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
                            <img :src="currentMusic.picUrl" alt="cover">
                        </div>
                        <div class="text-info" v-if="currentMusic.info">
                            <p class="title">歌曲名：{{currentMusic.info.name}}</p>
                            <p class="artist">歌手名：{{currentMusic.info.ar[0].name}}<span v-for="artist of currentMusic.info.ar.slice(1)" :key="artist.name">/{{artist.name}}</span></p>
                            <p class="album">专辑名：{{currentMusic.info.al.name}}</p>
                        </div>
                    </div>
                    <div class="lyric-wrapper">
                        <div v-if="!currentMusic.noLyric" class="lyric">
                            <p v-for="(item, index) of currentMusic.lyric" :key="index">{{item.text}}</p>
                        </div>
                        <div v-else style="line-height: 340px">
                            暂无歌词
                        </div>
                    </div>
                </el-aside>
            </el-container>
        </el-main>
        <el-footer height="100px">
            <div class="player">
                <div class="player-cover" v-if="!playList.length && !currentMusic.info"></div>
                <audio ref="audio" :src="currentMusic.url || null"></audio>
                <div class="player-bar" :disabled="currentMusic.info">
                    <div class="btns btns-left">
                        <i @click="playPrev" :class="{disabled: currentMusic.playMode === 1}" class="iconfont icon-shangyishou icon-md"></i>
                        <i v-if="!currentMusic.playing" @click="handleContinue" class="iconfont icon-bofang icon-lg"></i>
                        <i v-else @click="handleStop" class="iconfont icon-zanting icon-lg"></i>
                        <i @click="playNext($event)" class="iconfont icon-xiayishou icon-md"></i>
                    </div>
                    <div class="process">
                        <div class="process-info">
                            <span class="ellipsis">
                                <template v-if="currentMusic.info">{{currentMusic.info.name}} - {{currentMusic.info.ar[0].name}}<span v-for="artist of currentMusic.info.ar.slice(1)" :key="artist.name">/{{artist.name}}</span></template>
                                <template v-else>欢迎使用</template>
                            </span>
                            <span style="width: 200px; text-align: right">
                                <template v-if="currentMusic.info">{{Math.floor(currentMusic.currentTime / 1000 / 60)}}:{{Math.floor(currentMusic.currentTime / 1000) % 60}} / {{Math.floor(currentMusic.info.dt / 1000 / 60)}}:{{Math.floor(currentMusic.info.dt / 1000) % 60}}</template>
                            </span>
                        </div>
                        <div class="process-bar" ref="process" @click="changeCurrent($event)">
                            <div class="process-current" ref="processCurrent"><div class="process-dot"></div></div>
                        </div>
                    </div>
                    <div class="btns btns-right">
                        <i class="iconfont icon-sm"
                           :class="['icon-danquxunhuan', 'icon-suiji', 'icon-liebiaoxunhuan'][currentMusic.playMode]"
                           @click="handleChangeMode"></i>
                        <i v-if="currentMusic.info && likeList.indexOf(currentMusic.info.id) !== -1" @click="toggelLike(false)" class="iconfont icon-xin1 icon-sm"></i>
                        <i v-else @click="toggelLike(true)" class="iconfont icon-xin icon-sm"></i>
                        <a target="_blank" :href="currentMusic.url" class="iconfont icon-xiazai icon-sm"></a>
                        <div class="volume-bar">
                            <i v-if="!currentMusic.muted && currentMusic.currentVoice" @click="handleToggelMuted" class="iconfont icon-yinliang icon-sm"></i>
                            <i v-else @click="handleToggelMuted" class="iconfont icon-jingyin icon-sm"></i>
                            <div class="volume-process" ref="volumeProcess" @click="changeVolume($event)">
                                <div class="current-volume" ref="volumeCurrent"><div class="process-dot"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg" ref="bg"></div>
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
            currentMusic: {
                info: null,
                playing: false,
                playMode: 2, // 0:单曲循环, 1随机播放, 2:列表循环
                lyric: [],
                noLyric: true,
                url: '',
                picUrl: require('../assets/images/player_cover.png'),
                index: 0,
                currentTime: 0,
                currentVoice: 0,
                muted: false
            },
            timer: null,
            likeList: [],
            showDialog: false,
            account: '',
            password: ''
        }
    },
    computed: {
        ...mapState(['userInfo', 'playList'])
    },
    methods: {
        ...mapActions(['setUserInfo', 'addToPlayList', 'removeFromPlayList']),
        toggelShowDialog () {
            this.showDialog = !this.showDialog
        },
        handleLogin () {
            this.showDialog = false
            this.$axios({
                url: '/login/cellphone',
                params: {
                    phone: this.account,
                    password: this.password,
                    timestamp: new Date()
                }
            }).then(res => {
                if (res.data.code === 200) {
                    var userInfo = res.data.profile
                    this.setUserInfo(userInfo)
                    this.getLikeList()
                    this.isLogin = true
                } else {
                    alert('登录失败！')
                }
            }).catch(() => {
                alert('登录失败！')
            })
        },
        handleLogout () {
            this.$axios({
                url: '/logout',
                timestamp: new Date()
            }).then(res => {
                this.setUserInfo()
                this.likeList.splice(0, this.likeList.length)
                this.isLogin = false
            })
        },
        handleContinue () {
            if (!this.currentMusic.url) return
            this.$refs.audio.play()
            this.getProcess()
            this.currentMusic.playing = !this.$refs.audio.paused
        },
        handleStop () {
            if (!this.currentMusic.url) return
            clearTimeout(this.timer)
            this.$refs.audio.pause()
            this.currentMusic.playing = !this.$refs.audio.paused
        },
        handleChangeMode () {
            this.currentMusic.playMode++
            if (this.currentMusic.playMode > 2) {
                this.currentMusic.playMode = 0
            }
        },
        getLyric (id) {
            return this.$axios({
                url: '/lyric',
                params: {
                    id
                }
            }).then(res => {
                if (res.status === 200) {
                    if (res.data.nolyric || res.data.uncollected) {
                        this.currentMusic.noLyric = true
                    } else {
                        let lrc = res.data.lrc.lyric
                        let lyrics = lrc.split('\n')
                        let lrcObj = []
                        for (let i = 0; i < lyrics.length; i++) {
                            let lyric = decodeURIComponent(lyrics[i])
                            let timeReg = /\[\d*:\d*((.|:)\d*)*\]/g
                            let timeRegExpArr = lyric.match(timeReg)
                            if (!timeRegExpArr) continue
                            let clause = lyric.replace(timeReg, '')
                            for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
                                let t = timeRegExpArr[k]
                                let min = Number(String(t.match(/\[\d*/i)).slice(1))
                                let sec = Number(String(t.match(/:\d*/i)).slice(1))
                                let time = min * 60 + sec
                                if (clause !== '') {
                                    lrcObj.push({time: time, text: clause})
                                }
                            }
                        }
                        this.currentMusic.noLyric = false
                        this.currentMusic.lyric = lrcObj
                    }
                }
            })
        },
        handlePlay (index = 0, id = null) {
            return this.$axios({
                url: '/song/detail',
                params: {
                    ids: id || this.playList[index].id
                }
            }).then(res => {
                if (id) {
                    let exist = -1
                    this.playList.forEach((val, _index) => {
                        if (val.id === id) {
                            exist = _index
                        }
                    })
                    if (exist !== -1) {
                        index = exist
                    } else {
                        index = this.currentMusic.index + 1
                        this.addToPlayList({index, info: res.data.songs[0]})
                    }
                }
                this.currentMusic.index = index
                this.currentMusic.info = res.data.songs[0]
                this.currentMusic.picUrl = this.currentMusic.info.al.picUrl + '?param=200y200'
                this.$refs.bg.style.backgroundImage = 'url(' + this.currentMusic.picUrl + ')'
                return this.$axios({
                    url: '/song/url',
                    params: {
                        id: this.currentMusic.info.id
                    }
                })
            }).then(res => {
                this.currentMusic.index = index
                if (res.data.data[0].url) {
                    this.currentMusic.url = res.data.data[0].url
                    this.getLyric(this.currentMusic.info.id)
                    setTimeout(this.handleContinue, 0)
                } else {
                    alert('播放失败')
                    this.playNext()
                }
            })
        },
        playNext (e = null) {
            if (this.playList.length === 0) return
            switch (this.currentMusic.playMode) {
            case 1:
                let index = Math.floor(Math.random() * this.playList.length)
                this.handlePlay(index)
                break
            case 0:
                if (!e) {
                    this.handleContinue()
                    break
                }
            // eslint-disable-next-line
            default:
                if (this.currentMusic.index >= this.playList.length - 1) {
                    this.handlePlay(0)
                } else {
                    this.handlePlay(this.currentMusic.index + 1)
                }
                break
            }
        },
        playPrev () {
            if (this.playList.length === 0 || this.currentMusic.playMode === 1) return
            if (this.currentMusic.index <= 0) {
                this.handlePlay(this.playList.length - 1)
            } else {
                this.handlePlay(this.currentMusic.index - 1)
            }
        },
        handleRemove (index) {
            this.removeFromPlayList(index)
            if (this.playList.length === 1) {
                this.$refs.audio.currentTime = 0
                this.handleStop()
                this.currentMusic.info = null
                this.currentMusic.picUrl = require('../assets/images/player_cover.png')
                this.currentMusic.index = 0
                this.currentMusic.lyric = []
                this.$refs.bg.style.backgroundImage = ''
            } else {
                if (this.$refs.audio.paused) {
                    this.handlePlay(index).then(() => {
                        setTimeout(this.handleStop, 0)
                    })
                } else {
                    this.handlePlay(index)
                }
            }
        },
        getProcess () {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.currentMusic.currentTime = this.$refs.audio.currentTime * 1000
                this.$refs.processCurrent.style.width = this.currentMusic.currentTime / this.currentMusic.info.dt * this.$refs.process.offsetWidth + 'px'
                this.getProcess()
            }, 16)
        },
        getVoice () {
            this.currentMusic.currentVoice = this.$refs.audio.volume
            this.$refs.volumeCurrent.style.width = this.currentMusic.currentVoice * this.$refs.volumeProcess.offsetWidth + 'px'
        },
        handleToggelMuted () {
            this.currentMusic.muted = this.$refs.audio.muted = !this.$refs.audio.muted
            if (this.currentMusic.muted) {
                this.$refs.volumeCurrent.style.width = 0
            } else {
                this.getVoice()
            }
        },
        getLikeList () {
            this.$axios({
                url: '/likelist',
                params: {
                    uid: this.userInfo.userId,
                    timestamp: new Date()
                }
            }).then(res => {
                this.likeList.splice(0, this.likeList.length, ...res.data.ids)
            })
        },
        changeCurrent (event) {
            this.currentMusic.currentTime = this.$refs.audio.currentTime = this.$refs.audio.duration * (event.pageX - this.$refs.process.offsetLeft) / this.$refs.process.offsetWidth
        },
        changeVolume (event) {
            this.currentMusic.currentVoice = this.$refs.audio.volume = (event.pageX - this.$refs.volumeProcess.offsetLeft) / this.$refs.volumeProcess.offsetWidth
            this.getVoice()
        },
        toggelLike (status) {
            this.$axios({
                url: '/like',
                params: {
                    id: this.currentMusic.info.id,
                    like: status,
                    timestamp: new Date()
                }
            }).then(() => {
                this.getLikeList()
            })
        }
    },
    mounted () {
        this.getVoice()
        if (this.userInfo) {
            this.getLikeList()
            this.isLogin = true
        } else {
            this.isLogin = false
        }
        this.$refs.audio.onended = res => {
            this.playNext()
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
        display flex
        justify-content flex-end
        position absolute
        right 0
        top 0
        width 140px
        line-height 40px

        > *
            margin-right 20px

        .avatar
            color $lightColor

    .dialog-cover
        position fixed
        top 0
        left 0
        bottom 0
        right 0
        z-index 10
        background-color rgba(0, 0, 0, .4)

        .dialog
            position absolute
            top 50%
            left 50%
            height 140px
            width 280px
            padding 20px
            border 1px solid grey
            border-radius 6px
            background-color rgba(0, 0, 0, .6)
            transform translate(-50%, -80%)

            .title
                height 40px
                line-height 40px

            p
                height 40px
                color $normalColor

                input
                    height 70%
                    width calc(100% - 60px)
                    padding 0 6px
                    border 1px solid grey
                    border-radius 4px
                    background-color rgba(0, 0, 0, 0)
                    outline none
                    color $normalColor

                    &::placeholder
                        color $normalColor

            .el-button
                float right
                padding 0 8px

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
        position relative
        height 100%

        .player-cover
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            z-index 1

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

                .disabled
                    cursor not-allowed

            .process
                flex 1

                .process-info
                    display flex
                    justify-content space-between
                    height 22px
                    margin 16px 0 10px
                    font-size 14px
                    line-height 22px

                .process-bar
                    width 100%
                    height 4px
                    border-radius 2px
                    background-color rgba(255, 255, 255, .2)
                    cursor pointer

                    .process-current
                        position relative
                        width 0%
                        height 100%
                        border-radius 2px
                        background-color $normalColor

                        .process-dot
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
                        width 0%
                        height 100%
                        border-radius 2px
                        background-color $normalColor

                        .process-dot
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
        background-image url(../assets/images/bg.jpg)
        background-position center center
        background-size cover
        filter blur(12px)
        opacity .7
        transition: all .8s

    .mask
        z-index -1
        background-color rgba(0, 0, 0, .4)
</style>

<style lang="stylus">
</style>
