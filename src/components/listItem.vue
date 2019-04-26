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
            if (this.type) {
                // return
            } else {
                this.$router.push({path: 'album/' + this.info.id})
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
