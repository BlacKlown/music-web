<template>
    <el-container>
        <el-header height="100px">

        </el-header>
        <el-main>
            <el-button @click="handleClick">123</el-button>
        </el-main>
        <el-footer height="60px"></el-footer>
    </el-container>
</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
        return {
        }
    },
    methods: {
        handleClick () {
            this.$axios({
                url: 'http://localhost:3000/top/playlist/highquality',
                params: {
                    before: 1503639064232,
                    limit: 3
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.el-container{

    .el-header{
        border-bottom 1px solid #f2f2f2
    }
}
</style>
