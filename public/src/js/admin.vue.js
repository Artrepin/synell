import App from '../components/App.js'
import Auth from '../components/Auth.js'
import Project from '../components/Project.js'

const routes = [
    {
        path: '/',
        redirect: '/project',
    },
    {
        path: '/auth',
        component: Auth,
    },
    {
        path: '/project',
        component: Project,
        meta: {
            requiresAuth: false
        }
    },
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth) {
        next('/auth')
    } else {
        next()
    }
})

const app = new Vue({
    router,
    data: {

    },
    render: h => h(App, {
        props: {
            menu: [
                {
                    title: 'Проекты',
                    uri: '/project'
                },
            ]
        },
    }),
}).$mount('#app')