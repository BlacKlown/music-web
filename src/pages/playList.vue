<template>
    <div class="playList-cover">
        <music-list :list="playList" :type="1"></music-list>
    </div>
</template>

<script>
import musicList from '@/components/musicList'
import { mapState } from 'vuex'

export default {
    name: 'playList',
    components: {
        musicList
    },
    data () {
        return {
            isLogin: false,
            list: []
        }
    },
    computed: {
        ...mapState(['userInfo', 'playList'])
    },
    methods: {
    },
    mounted () {
    }
}
</script>

<style lang="stylus" scoped>
.el-header
    padding 0

.main-content
    width 1200px
    padding 0
    margin 40px auto 0
</style>

<style lang="stylus">
</style>
