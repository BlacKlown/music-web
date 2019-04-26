<template>
    <div class="myMusic-main">
        <div v-if="isLogin">
            <swiper :options="swiperOption" class="media-content">
                <swiper-slide v-for="item of myList" :key="item.id">
                    <list-item :info="item" :type="0"></list-item>
                </swiper-slide>
            </swiper>
        </div>
        <div v-else class="empty"><p>请先登录</p></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import listItem from '@/components/listItem'

export default {
    name: 'myMusic',
    props: ['isLogin'],
    components: {
        listItem
    },
    data () {
        return {
            myList: [],
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
    watch: {
        isLogin () {
            if (this.isLogin) {
                this.getMyList()
            }
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        getMyList () {
            this.$axios({
                url: '/user/playlist',
                params: {
                    uid: this.userInfo.userId,
                    timestamp: new Date()
                }
            }).then(res => {
                let playlist = res.data.playlist
                this.myList.splice(0, playlist.length, ...res.data.playlist)
            })
        }
    },
    mounted () {
        if (this.isLogin) {
            this.getMyList()
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/var.styl'

.empty
    display flex
    height 100%
    justify-content center
    align-items center
    font-size 16px
    color $normalColor
</style>

<style lang="stylus">
</style>
