import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import recommend from '@/pages/recommend'
import myMusic from '@/pages/myMusic'
import rankList from '@/pages/rankList'
import playList from '@/pages/playList'
import search from '@/pages/search'
import album from '@/pages/album'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index,
        children: [{
            path: '/recommend',
            name: 'recommend',
            component: recommend,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/rankList',
            name: 'rankList',
            component: rankList,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/playList',
            name: 'playList',
            component: playList,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/myMusic',
            name: 'myMusic',
            component: myMusic,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/search',
            name: 'search',
            component: search,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/album/:id',
            name: 'album',
            component: album,
            meta: {
                keepAlive: false
            }
        }, {
            path: '*',
            redirect: '/recommend'
        }]
    }]
})
