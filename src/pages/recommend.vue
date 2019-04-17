<template>
    <div class="recommend">
        <div class="new-song">
            <p class="title">新歌速递</p>
            <swiper :options="swiperOption" class="news-content">
                <swiper-slide v-for="song of newSongs" :key="song.id">
                    <list-item :info="song" :type="'song'"></list-item>
                </swiper-slide>
            </swiper>
        </div>
        <div class="new-song">
            <p class="title">个性化推荐</p>
            <swiper :options="swiperOption" class="news-content">
                <!-- <swiper-slide>
                    <list-item :info="song" :type="'list'"></list-item>
                </swiper-slide> -->
                <swiper-slide v-for="song of recommend" :key="song.id">
                    <list-item :info="song" :type="'song'"></list-item>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import listItem from '@/components/listItem'

export default {
    name: 'home',
    components: {
        listItem
    },
    data () {
        return {
            newSongs: [],
            recommend: [],
            playList: [],
            rankList: [],
            swiperOption: {
                autoplay: false,
                slidesPerView: 6,
                height: 185
            }
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    watch: {
        isLogin () {
            if (this.isLogin === true) {
                this.getRecommend()
            }
        }
    },
    methods: {
        getTopSongs () {
            this.$axios({
                url: '/top/song',
                params: {
                    type: 0
                }
            }).then(res => {
                this.newSongs.splice(0, 6, ...res.data.data.slice(0, 6))
                console.log('newSongs', this.newSongs)
            })
        },
        getRecommend () {
            this.$axios({
                url: '/recommend/resource'
            }).then(res => {
                this.recommend.splice(0, 5, ...res.data.recommend.slice(0, 5))
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
        if (this.isLogin === true) {
            this.getRecommend()
        }
        this.getTopSongs()
        this.getTopPlayList()
        this.getRankLists()
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/var.styl'

.recommend
    height 100%
    overflow-y scroll

    .title
        padding 20px 0 10px
        font-size 22px
        color $lightColor
        letter-spacing 4px

</style>
