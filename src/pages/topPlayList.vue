<template>
    <el-container>
        <el-header height="130px">
            <my-header @login="login" @logout="logout" :path="[1, 3]"></my-header>
        </el-header>
        <el-main class="main-content">
            <el-container>
            </el-container>
        </el-main>
        <el-footer height="60px">

        </el-footer>
    </el-container>
</template>

<script>
import myHeader from './components/header'

import { mapState } from 'vuex'

export default {
    name: 'HelloWorld',
    components: {
        'my-header': myHeader
    },
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
