<template>
    <div class="player">
        <audio src=""></audio>
        <div class="player-bar">

        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapActions(['setUserInfo'])
    },
    mounted () {

    }
}
</script>

<style lang="stylus" scoped>
.player
    width 100%
    position fixed
    bottom 0
    z-index 10
    height 80px
    background-color pink

    .player-bar
        width 1200px
        height 100%
        margin 0 auto
        background-color skyblue
</style>
