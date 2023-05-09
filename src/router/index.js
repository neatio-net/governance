import Vue from 'vue'
import Router from 'vue-router'
const Layout = resolve => require(['@/components/layouts/Layout'], resolve);
const neatGov = resolve => require(['@/components/pages/neatGov'], resolve);
const prop001 = resolve => require(['@/components/pages/prop001'], resolve);


Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Layout,
        children: [{
            path: '',
            name: 'neatGov',
            component: neatGov,
            meta: []
        },
        ]
    }]
})

export default router
