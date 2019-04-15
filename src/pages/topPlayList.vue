<template>
    <el-container>
    </el-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'topPlayList',
    data () {
        return {
            isLogin: false,
            list: []
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        login () {
            this.isLogin = true
        },
        logout () {
            this.isLogin = false
        }
    },
    mounted () {
        if (this.userInfo) {
            this.isLogin = true
        } else {
            this.isLogin = false
        }
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
