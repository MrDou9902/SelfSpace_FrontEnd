const Login = () => import('@/views/login/loginIndex.vue')
const Home = () => import('@/components/homeWrapper.vue')
const homeIndex = () => import('@/views/home/homeIndex.vue')
const b = { template: '<div>About</div>' }

const routes = [
  { name: 'login', path: '/login', component: Login },
  { path: '/', redirect: '/login' },
  { path: '/home', redirect: { name: 'homeIndex' } },
  {
    name: 'home',
    path: '/home',
    component: Home,
    children: [
      { name: 'homeIndex', path: 'index', component: homeIndex },
      { name: 'b', path: 'b', component: b }
    ]
  }
]

export default routes
