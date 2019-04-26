<template>
    <div class="search-container">
        <div class="search-bar">
            <div class="search-hot">
                <el-button type="text" v-for="item of searchHot" :key="item.first" @click="handleSearch(item.first, 0)">{{item.first}}</el-button>
            </div>
            <input class="search-input" v-model="keywordsBind" placeholder="音乐/歌手/专辑" @keyup.enter="handleSearch(keywordsBind)">
        </div>
        <div class="search-content">
            <music-list v-if="songsList.length" :list="songsList" :keywords="keywordsTrue" @scrollDown="handleSearch(keywordsTrue, songsList.length)"></music-list>
            <div v-else class="empty">输入关键字开始搜索吧！</div>
        </div>
    </div>
</template>

<script>
import musicList from '@/components/musicList'

export default {
    name: 'search',
    components: {
        musicList
    },
    data () {
        return {
            searchHot: [],
            keywordsBind: '',
            keywordsTrue: '',
            songsList: []
        }
    },
    methods: {
        getSearchHot () {
            this.$axios({
                url: '/search/hot'
            }).then(res => {
                let result = res.data.result.hots
                this.searchHot.splice(0, 5, ...result.slice(0, 5))
            })
        },
        handleSearch (keywords, offset = 0) {
            if (!keywords) {
                alert('搜索字段不能为空！')
                return
            }
            this.$axios({
                url: '/search',
                params: {
                    keywords,
                    offset
                }
            }).then(res => {
                let songs = res.data.result.songs || null
                if (songs) {
                    if (this.keywordsTrue === keywords && offset !== 0) {
                        this.songsList.splice(this.songsList.length, 30, ...songs)
                    } else {
                        this.songsList.splice(0, this.songsList.length, ...songs)
                    }
                }
                this.keywordsBind = this.keywordsTrue = keywords
            })
        }
    },
    mounted () {
        this.getSearchHot()
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/var.styl'

.search-bar
    display flex
    height 40px
    padding 10px
    background-color rgba(0, 0, 0, .2)

    .search-hot
        line-height 40px
        display inline-block

    .search-input
        flex 1
        box-sizing border-box
        height 40px
        width auto
        padding 10px
        border 1px solid rgba(255, 255, 255, .6)
        margin 0 0 0 10px
        outline none
        color $lightColor
        background-color transparent

        &::placeholder
            color $normalColor

.search-content
    height calc(100% - 60px)

    .empty
        display flex
        height 100%
        justify-content space-around
        align-items center
        color $normalColor
</style>

<style lang="stylus">
@import '../assets/var.styl'
.search-container

    .el-button.el-button--text
        color $normalColor

        &:hover
            color $lightColor
</style>
