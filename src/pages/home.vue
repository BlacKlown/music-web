<template>
    <el-container>
        <el-header height="130px">
            <my-header @login="login" @logout="logout" :path="[1, 1]"></my-header>
        </el-header>
        <el-main class="main-content">
            <el-container>
                <el-header height="105px">
                    <div class="title">新歌速递</div>
                    <el-menu mode="horizontal" default-active="0" class="swiper-controller" @select="getTopSongs">
                        <el-menu-item v-for="item of topSongs.types" :index="item.type" :key="item.type">{{item.title}}</el-menu-item>
                    </el-menu>
                </el-header>
                <el-main>
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(items, index) of topSongs.songs" :key="'topSongs' + index">
                            <div v-for="item of items" :key="item.id">{{item.name}}</div>
                        </swiper-slide>
                    </swiper>
                </el-main>
            </el-container>
            <el-container v-if="isLogin">
                <el-header height="45px">
                    <div class="title">个性化推荐</div>
                </el-header>
                <el-main>
                    <div>推荐歌曲</div>
                    <div v-for="item of recommend" :key="item.id">{{item.name}}</div>
                </el-main>
            </el-container>
            <el-container>
                <el-header height="45px">
                    <div class="title">热门歌单</div>
                </el-header>
                <el-main>
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(items, index) of playList" :key="'playList' + index">
                            <div v-for="item of items" :key="item.id">{{item.name}}</div>
                        </swiper-slide>
                    </swiper>
                </el-main>
            </el-container>
            <el-container>
                <el-header height="45px">
                    <div class="title">排行榜</div>
                </el-header>
                <el-main>
                    <div v-for="list of rankList" :key="list.id">
                        <div>{{list.name}}</div>
                        <div v-for="(item, index) of list.tracks" :key="list.name + index">{{item.first}}</div>
                    </div>
                </el-main>
            </el-container>
        </el-main>
        <el-footer height="60px">

        </el-footer>
    </el-container>
</template>

<script>
import myHeader from './components/header'

import { mapState } from 'vuex'

export default {
    name: 'HelloWorld',
    components: {
        'my-header': myHeader
    },
    data () {
        return {
            topSongs: {
                types: [{
                    type: '0',
                    title: '全部'
                }, {
                    type: '7',
                    title: '华语'
                }, {
                    type: '96',
                    title: '欧美'
                }, {
                    type: '8',
                    title: '日本'
                }, {
                    type: '16',
                    title: '韩国'
                }],
                songs: []
            },
            recommend: [],
            playList: [],
            rankList: [],
            swiperOption: {
                autoplay: false
            },
            isLogin: false
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        login () {
            this.isLogin = true
            this.getRecommend()
        },
        logout () {
            this.isLogin = false
        },
        getTopSongs (type = 0) {
            this.$axios({
                url: '/top/song',
                params: {
                    type
                }
            }).then(res => {
                this.topSongs.songs.splice(0, 1, res.data.data.slice(0, 8))
                this.topSongs.songs.splice(1, 1, res.data.data.slice(8, 16))
                console.log('topSongs', this.topSongs.songs)
            })
        },
        getRecommend () {
            this.$axios({
                url: '/recommend/resource'
            }).then(res => {
                this.recommend.splice(0, 7, ...res.data.recommend.slice(0, 7))
                console.log('recommend', this.recommend)
            })
        },
        getTopPlayList () {
            this.$axios({
                url: '/top/playlist',
                params: {
                    limit: 16
                }
            }).then(res => {
                this.playList.splice(0, 1, res.data.playlists.slice(0, 8))
                this.playList.splice(1, 1, res.data.playlists.slice(8, 16))
                console.log('playList', this.playList)
            })
        },
        getRankLists () {
            this.$axios({
                url: '/toplist/detail'
            }).then(res => {
                let data = res.data.list
                for (let i = 0; i < 4; i++) {
                    let listItem = data[i]
                    let temp = {
                        id: listItem.id,
                        name: listItem.name,
                        tracks: listItem.tracks,
                        description: listItem.description,
                        updateFrequency: listItem.updateFrequency,
                        coverImgUrl: listItem.coverImgUrl
                    }
                    this.rankList.push(temp)
                }
                console.log('rankList', this.rankList)
            })
        }
    },
    mounted () {
        if (this.userInfo) {
            this.isLogin = true
            this.getRecommend()
        } else {
            this.isLogin = false
        }
        this.getTopSongs(0)
        this.getTopPlayList()
        this.getRankLists()
    }
}
</script>

<style lang="stylus" scoped>
.el-header
    padding 0

.main-content
    text-align center

    .title
        font-size 34px
        font-weight 600
        letter-spacing 14px

    .swiper-controller
        display flex
        width 500px
        margin 0 auto

        .el-menu-item
            flex 1
            font-size 20px

</style>
