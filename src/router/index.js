import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import recommend from '@/pages/DiscoverMusic/index'
import follow from '@/pages/Follow/index'
import leaderBoard from '@/pages/DiscoverMusic/components/leaderBoard'
import detailSongList from '@/components/DetailSongList'
import search from '@/pages/Search/index'

var router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/home' },
        {
            path: '/home', component: recommend,
            children: [
                { path: 'leaderboard', component: leaderBoard,meta:{keepAlive:true} }
            ]
        },
        { path: '/follow', component: follow },
        { path: '/detail/:id/:trackCount' , name:detailSongList , component: detailSongList,meta:{keepAlive:false}},
        { path: '/search/:value',component:search,meta:{keepAlive:false}}
    ]
})



export default router