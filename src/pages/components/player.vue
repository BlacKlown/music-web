<template>
    <div>
        123123
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'myHeader',
    data () {
        return {
            input: '',
            isLogin: false,
            navList: ['首页', '排行榜', '歌单']
        }
    },
    props: ['path'],
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapActions(['setUserInfo']),
        handleLogout () {
            this.$axios({
                url: '/logout'
            }).then(res => {
                this.setUserInfo()
                this.isLogin = false
                this.$emit('logout')
            })
        },
        handleGoto (path) {
            this.$router.push(path)
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
</style>
