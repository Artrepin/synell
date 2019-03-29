import App from '../components/App.js'
import Auth from '../components/Auth.js'
import Logout from '../components/Logout.js'
import Project from '../components/Project.js'

Vue.use(VueSession)

const routes = [
    {
        path: '/',
        redirect: '/project',
    },
    {
        path: '/auth',
        component: Auth,
        meta: {
            auth: false
        }
    },
    {
        path: '/logout',
        component: Logout,
        meta: {
            auth: true
        }
    },
    {
        path: '/project',
        component: Project,
        meta: {
            auth: true
        }
    },
]

const router = new VueRouter({
    routes
})

const session = Vue.prototype.$session;

router.beforeEach((to, from, next) => {
    
    const auth = to.matched.some(record => record.meta.auth)
    var iUserID = Number.isInteger(session.get('iUserID'))
    console.log(auth)
    console.log(iUserID)

    if (auth === true && iUserID === true) {
        next()
    } else if (auth === true && iUserID === false) {
        next('/auth')
    } else if (auth === false && iUserID === true) {
        next('/')
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