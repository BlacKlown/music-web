<template>
    <div class="player">
        <audio src="http://m10.music.126.net/20190415144504/f0caf13acb97bf76eb6c73d2d34f2a84/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3" controls="controls"></audio>
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
    height 60px
    background-color pink

    audio
        width 600px
        outline none
        background-color skyblue
</style>
