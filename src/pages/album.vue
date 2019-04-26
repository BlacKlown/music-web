<template>
    <div class="album-container" v-if="info">
        <div class="album-header">
            <img class="album-pic" :src="info.coverImgUrl + '?param=160y160'" alt="info.name">
            <div class="album-info">
                <p class="title ellipsis">{{info.name}}</p>
                <p class="creator"><span>{{info.creator.nickname}}</span>&ensp;于&ensp;<span>{{date}}</span>&ensp;创建</p>
                <p class="number">播放数：{{info.playCount}}&emsp;订阅数：{{info.subscribedCount}}</p>
                <div class="controller">
                    <button class="play"><span>播放</span> <i class="iconfont icon-bofang icon-md"></i></button>
                    <button class="subscribe" v-if="!info.subscribed" :disabled="!userInfo || info.userId == userInfo.userId"><span>订阅</span> <i class="iconfont icon-xin icon-sm"></i></button>
                    <button class="subscribe" v-else><span>取消订阅</span> <i class="iconfont icon-xin1 icon-sm"></i></button>
                </div>
            </div>
        </div>
        <div class="album-content">
            <music-list v-if="info.tracks.length" :list="info.tracks" :type="1"></music-list>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import musicList from '@/components/musicList'

export default {
    name: 'album',
    components: {
        musicList
    },
    props: ['isLogin'],
    data () {
        return {
            info: null,
            date: ''
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    watch: {
        info () {
            let date = new Date(this.info.createTime)
            this.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        }
    },
    methods: {

    },
    mounted () {
        this.$axios({
            url: '/playlist/detail',
            params: {
                id: this.$route.params.id
            }
        }).then(res => {
            this.info = res.data.playlist
            console.log(this.info)
        })
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/var.styl'

.album-header
    display flex

    .album-pic
        margin 10px

    .album-info
        flex 1
        margin 10px 20px

        .title
            width 100%
            font-size 26px
            color $lightColor

        .creator,
        .number
            margin-top 10px
            font-size 16px
            color $normalColor

        .controller
            margin-top 20px

            button
                box-sizing content-box
                height 36px
                border 1px solid $normalColor
                border-radius 4px
                margin-right 20px
                outline none
                color $normalColor
                background-color transparent

                &:not(:disabled):hover
                    color $lightColor

                span
                    display inline-block
                    height 36px
                    padding-left 10px
                    font-size 18px
                    line-height 36px
                    vertical-align middle

                .iconfont

                    &.icon-xin,
                    &.icon-xin1
                        margin 0 8px

.album-content
    height calc(100% - 161px)
</style>
