import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import recommend from '@/pages/recommend'
import myMusic from '@/pages/myMusic'
import rankList from '@/pages/rankList'
import topPlayList from '@/pages/topPlayList'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index,
        children: [{
            path: '/recommend',
            name: 'recommend',
            component: recommend
        }, {
            path: '/rankList',
            name: 'rankList',
            component: rankList
        }, {
            path: '/topPlayList',
            name: 'topPlayList',
            component: topPlayList
        }, {
            path: '/myMusic',
            name: 'myMusic',
            component: myMusic
        }, {
            path: '*',
            redirect: '/recommend'
        }]
    }]
})
