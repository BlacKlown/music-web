<template>
    <div class="musicList">
        <div class="list-header">
            <div class="index"></div>
            <div class="name">歌曲</div>
            <div class="artist">歌手</div>
            <div class="album">专辑</div>
            <div class="duration">时长</div>
        </div>
        <div class="list-content" ref="list" @scroll="handleScroll($event)">
            <div class="list-item" v-for="(item, index) of list" :key="index">
                <div class="index">{{index + 1}}</div>
                <div class="name ellipsis">
                    <span>{{item.name}}</span>
                    <div class="controller">
                        <i @click="handlePlay(index)" class="iconfont icon-bofang icon-md"></i>
                    </div>
                    <div v-if="type === 1" class="controller quxiao">
                        <i @click="handleRemove(index)" class="iconfont icon-quxiao icon-md"></i>
                    </div>
                </div>
                <div class="artist ellipsis">
                    <span>{{item.artists ? item.artists[0].name : item.ar[0].name}}</span><span v-for="artist of (item.artists ? item.artists.slice(1) : item.ar.slice(1))" :key="artist.name">/{{artist.name}}</span>
                </div>
                <div class="album ellipsis">{{item.album ? item.album.name : item.al.name}}</div>
                <div class="duration" v-if="item.duration">{{Math.floor(item.duration / 1000 / 60)}}:{{Math.floor(item.duration / 1000) % 60}}</div>
                <div class="duration" v-else>{{Math.floor(item.dt / 1000 / 60)}}:{{Math.floor(item.dt / 1000) % 60}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'musicList',
    props: ['list', 'keywords', 'type'],
    data () {
        return {
            scrollLock: false
        }
    },
    watch: {
        list () {
            if (this.list.length <= 30) {
                this.$refs.list.scroll(0, 0)
            }
            this.scrollLock = false
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        handleScroll (event) {
            if (this.scrollLock || this.type === 1) {
                return
            }
            let scrollTop = event.target.scrollTop
            let {scrollHeight, offsetHeight} = event.target
            if (offsetHeight + scrollTop >= scrollHeight - 50) {
                this.scrollLock = true
                this.$emit('scrollDown')
            }
        },
        handlePlay (index) {
            if (this.type === 1) {
                this.$root.$children[0].$children[0].handlePlay(index)
            } else {
                this.$root.$children[0].$children[0].handlePlay(-1, this.list[index].id)
            }
        },
        handleRemove (index) {
            this.$root.$children[0].$children[0].handleRemove(index)
        }
    },
    mounted () {
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/var.styl'
.musicList
    height 100%

    .list-header,
    .list-item
        overflow hidden
        height 50px
        width 100%
        border-bottom 1px solid rgba(255, 255, 255, .2)
        display flex
        line-height 50px
        font-size 14px

        .index
            width 50px
            text-align center

        .name
            flex 1

        .artist
            width 120px

        .album
            width 140px

        .duration
            width 80px
            text-align center

    .list-header
        color $lightColor

    .list-item
        color $normalColor

        &:hover
            color $lightColor

            .name
                position relative
                padding-right 120px

                .controller
                    position absolute
                    top 9px
                    right 12px
                    width 24px
                    height 24px
                    border 4px solid $normalColor
                    border-radius 19px
                    color $normalColor

                    &:hover
                        border-color $lightColor
                        color $lightColor
                        cursor pointer

                    .iconfont
                        position absolute
                        top 50%
                        left 50%
                        transform translate(-50%, -50%)

                .quxiao
                    right 60px

    .list-content
        overflow-y auto
        height calc(100% - 50px)
</style>

<style lang="stylus">
</style>
