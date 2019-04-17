<template>
    <el-container>
    </el-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'myMusic',
    data () {
        return {
            isLogin: false
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
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
</style>

<style lang="stylus">
</style>
