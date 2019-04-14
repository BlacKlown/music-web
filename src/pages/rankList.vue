<template>
    <el-container>
        <el-header height="130px">
            <my-header @login="login" @logout="logout" :path="[1, 2]"></my-header>
        </el-header>
        <el-main class="main-content">
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="0" @select="getList">
                        <el-menu-item-group>
                            <template slot="title">特色榜</template>
                            <el-menu-item index="0">新歌榜</el-menu-item>
                            <el-menu-item index="1">热歌榜</el-menu-item>
                            <el-menu-item index="3">飙升榜</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">全球媒体榜</template>
                            <el-menu-item index="5">UK排行榜周榜</el-menu-item>
                            <el-menu-item index="6">美国Billboard周榜</el-menu-item>
                            <el-menu-item index="8">iTunes榜</el-menu-item>
                            <el-menu-item index="10">日本Oricon周榜</el-menu-item>
                            <el-menu-item index="11">韩国Melon排行榜周榜</el-menu-item>
                        </el-menu-item-group>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-table
                        :data="list.slice(25 * (currentPage - 1), 25 * currentPage)"
                        style="width: 100%">
                        <el-table-column prop="name" label="歌曲"></el-table-column>
                        <el-table-column width="160px">
                            <template>
                                <i class="el-icon-caret-right"></i>
                                <i class="el-icon-star-off"></i>
                                <i class="el-icon-download"></i>
                            </template>
                        </el-table-column>
                        <el-table-column label="时长" width="120px">
                            <template slot-scope="scope">
                                {{Math.floor(scope.row.dt / (1000 * 60))}}:{{Math.floor((scope.row.dt / 1000) % 60)}}
                            </template>
                        </el-table-column>
                        <el-table-column label="歌手" width="120px">
                            <template slot-scope="scope">
                                <span v-for="(item, index) of scope.row.ar" :key="item.id">{{item.name}}<b v-if="index < scope.row.ar.length-1"> / </b></span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="list.length"
                        :page-size="25"
                        :current-page.sync="currentPage">
                    </el-pagination>
                </el-main>
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
            list: [],
            currentPage: 1
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
        },
        getList (idx) {
            this.$axios({
                url: '/top/list',
                params: {
                    idx
                }
            }).then(res => {
                this.list.splice(0, this.list.length, ...res.data.playlist.tracks)
                console.log(this.list)
            })
        }
    },
    mounted () {
        if (this.userInfo) {
            this.isLogin = true
        } else {
            this.isLogin = false
        }
        this.getList(0)
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

    .pic
        width 88px
</style>

<style lang="stylus">
.el-menu-item-group__title
    padding-top 20px
    padding-bottom 10px
    border-bottom 1px solid #ccc
    font-size 20px
    font-weight bold
    color #333

.el-table

    td
        padding 0

        .cell
            overflow hidden
            line-height 40px
            text-overflow ellipsis
            white-space nowrap

            i
                line-height 48px
                font-size 24px
</style>
