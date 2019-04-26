<template>
    <div class="recommend-main">
        <div class="new-song">
            <p class="title">新歌速递</p>
            <swiper :options="swiperOption" class="news-content">
                <swiper-slide v-for="song of newSongs" :key="song.id">
                    <list-item :info="song" :type="1"></list-item>
                </swiper-slide>
            </swiper>
        </div>
        <div class="recommend" v-if="isLogin">
            <p class="title">个性化推荐</p>
            <swiper :options="swiperOption" class="recommend-content">
                <swiper-slide v-for="list of recommend" :key="list.id">
                    <list-item :info="list" :type="0"></list-item>
                </swiper-slide>
            </swiper>
        </div>
        <div class="personalized">
            <p class="title">歌单推荐</p>
            <swiper :options="personalizedSwiperOption" class="personalized-content">
                <swiper-slide v-for="list of albumList" :key="list.id">
                    <list-item :info="list" :type="0"></list-item>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import listItem from '@/components/listItem'

export default {
    name: 'recommend',
    components: {
        listItem
    },
    props: ['isLogin'],
    data () {
        return {
            newSongs: [],
            recommend: [],
            albumList: [],
            swiperOption: {
                autoplay: false,
                height: 185,
                slidesPerView: 8,
                watchOverflow: true,
                breakpoints: {
                    1340: {
                        slidesPerView: 5
                    },
                    1500: {
                        slidesPerView: 6
                    },
                    1640: {
                        slidesPerView: 7
                    }
                }
            },
            personalizedSwiperOption: {
                autoplay: false,
                height: 185,
                slidesPerView: 8,
                slidesPerColumn: 4,
                slidesPerColumnFill: 'row',
                watchOverflow: true,
                breakpoints: {
                    1340: {
                        slidesPerView: 5,
                        slidesPerColumn: 6
                    },
                    1500: {
                        slidesPerView: 6,
                        slidesPerColumn: 5
                    },
                    1640: {
                        slidesPerView: 7,
                        slidesPerColumn: 4
                    }
                }
            }
        }
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
                    type: 0,
                    timestamp: new Date()
                }
            }).then(res => {
                this.newSongs.splice(0, 8, ...res.data.data.slice(0, 8))
            })
        },
        getRecommend () {
            this.$axios({
                url: '/recommend/resource'
            }).then(res => {
                this.recommend.splice(0, 8, ...res.data.recommend.slice(0, 8))
            })
        },
        getAlbumList () {
            this.$axios({
                url: '/personalized',
                params: {
                    limit: 26
                }
            }).then(res => {
                this.albumList.splice(0, 20, ...res.data.result.slice(0, 26))
            })
        }
    },
    mounted () {
        if (this.isLogin === true) {
            this.getRecommend()
        }
        this.getTopSongs()
        this.getAlbumList()
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/var.styl'

.recommend-main
    height 100%
    overflow-y scroll

    .title
        padding 10px 0 10px
        font-size 22px
        color $lightColor
        letter-spacing 4px

</style>

<style lang="stylus">
.recommend-main

    .swiper-container
        width 100%

</style>
