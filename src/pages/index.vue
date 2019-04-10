<template>
    <el-container>
        <el-header height="130px">
            <my-header></my-header>
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
                        <swiper-slide v-for="(items, index) of topSongs.songs" :key="index">
                            <div v-for="item of items" :key="item.id">{{item.name}}</div>
                        </swiper-slide>
                    </swiper>
                </el-main>
            </el-container>
            <el-container v-if="isLogin">
                <el-header height="105px">
                    <div class="title">个性化推荐</div>
                </el-header>
                <el-main>
                </el-main>
            </el-container>
            <el-container>
                <el-header height="105px">
                    <div class="title">热门歌单</div>
                    <el-menu mode="horizontal" default-active="0" class="swiper-controller">
                        <el-menu-item v-for="item in personalized" :index="item.type" :key="item.type">{{item.title}}</el-menu-item>
                    </el-menu>
                </el-header>
                <el-main>
                    <swiper>
                        <swiper-slide>1</swiper-slide>
                        <swiper-slide>2</swiper-slide>
                        <swiper-slide>3</swiper-slide>
                    </swiper>
                </el-main>
            </el-container>
            <el-container>
                <el-header height="45px">
                    <div class="title">排行榜</div>
                </el-header>
                <el-main>
                    <swiper>
                        <swiper-slide>1</swiper-slide>
                        <swiper-slide>2</swiper-slide>
                        <swiper-slide>3</swiper-slide>
                    </swiper>
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
            personalized: [],
            recommend: [],
            topList: [],
            swiperOption: {

            },
            isLogin: false
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        getTopSongs (type = 0) {
            console.log(type)
            this.$axios({
                url: '/top/song',
                params: {
                    type
                }
            }).then(res => {
                this.topSongs.songs.splice(0, 1, res.data.data.slice(0, 8))
                this.topSongs.songs.splice(1, 1, res.data.data.slice(8, 16))
                console.log(this.topSongs.songs)
            })
        }
    },
    mounted () {
        if (this.userInfo) {
            this.isLogin = true
        } else {
            this.isLogin = false
        }
        this.getTopSongs(0)
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
