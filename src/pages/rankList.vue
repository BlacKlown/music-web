<template>
    <div class="rankList-main">
        <div class="characteristic">
            <p class="title">云音乐特色榜</p>
            <swiper :options="swiperOption" class="characteristic">
                <swiper-slide v-for="item of list.slice(0, 4)" :key="item.id">
                    <list-item :info="item" :type="0"></list-item>
                </swiper-slide>
            </swiper>
        </div>
        <div class="media">
            <p class="title">全球媒体榜</p>
            <swiper :options="swiperOption" class="media-content">
                <swiper-slide v-for="item of list.slice(4, -1)" :key="item.id">
                    <list-item :info="item" :type="0"></list-item>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import listItem from '@/components/listItem'

export default {
    name: 'rankList',
    components: {
        listItem
    },
    data () {
        return {
            isLogin: false,
            list: [],
            swiperOption: {
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
    methods: {
        getList () {
            this.$axios({
                url: '/toplist'
            }).then(res => {
                this.list.splice(0, this.list.length, ...res.data.list)
            })
        }
    },
    mounted () {
        this.getList()
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/var.styl'

.rankList-main
    height 100%
    overflow-y scroll

    .title
        padding 10px 0 10px
        font-size 22px
        color $lightColor
        letter-spacing 4px

</style>

<style lang="stylus">
.rankList-main

    .swiper-container
        width 100%

</style>
