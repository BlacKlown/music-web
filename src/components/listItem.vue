<template>
    <div class="container">
        <img class="itemPic" v-lazy="info.album.picUrl + '?param=160y160'" alt="info.name">
        <p class="title">{{info.name}}</p>
    </div>
</template>

<script>
export default {
    name: 'listItem',
    props: ['info', 'type'],
    data () {
        return {
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/var.styl'

.container
    text-align center

    .itemPic
        width 140px
        height 140px

    .title
        overflow hidden
        width 140px
        padding 6px 0
        margin 0 auto
        font-size 14px
        color $normalColor
        text-overflow ellipsis
        white-space nowrap

</style>
