<template>
    <div class="container" :title="info.name" @click="handleClick">
        <img class="itemPic" v-lazy="(info.coverImgUrl || info.picUrl || info.album.picUrl) + '?param=160y160'" :alt="info.name">
        <p class="title ellipsis">{{info.name}}</p>
    </div>
</template>

<script>
export default {
    name: 'listItem',
    props: ['info', 'type'],
    data () {
        return {
        }
    },
    methods: {
        handleClick () {
            if (this.type) { // type: 1为歌曲类型，0为歌单类型
                this.$root.$children[0].$children[0].handlePlay(-1, this.info.id) // 调用播放器模块的播放方法
            } else {
                this.$router.push({path: 'album/' + this.info.id}) // 跳转至相应的歌单页面
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/var.styl'

.container
    margin-top 20px
    text-align center
    cursor pointer

    &:hover

        .title
            color $lightColor

    .itemPic
        width 140px
        height 140px

    .title
        width 140px
        padding 6px 0
        margin 0 auto
        font-size 14px
        color $normalColor

</style>
