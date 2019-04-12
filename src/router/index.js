import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import rankList from '@/pages/rankList'
import topPlayList from '@/pages/topPlayList'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        }, {
            path: '/rankList',
            name: 'rankList',
            component: rankList
        }, {
            path: '/topPlayList',
            name: 'topPlayList',
            component: topPlayList
        }
    ]
})
