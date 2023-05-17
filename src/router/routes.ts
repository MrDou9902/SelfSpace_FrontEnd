const Login = () => import('@/views/login/loginIndex.vue')
const Home = () => import('@/components/layout/homeWrapper.vue')
const homeIndex = () => import('@/views/home/homeIndex.vue')
const fun = () => import('@/views/fun/funIndex.vue')
const live = () => import('@/views/live/liveIndex.vue')
const comment = () => import('@/views/comment/commentIndex.vue')
const study = () => import('@/views/study/studyIndex.vue')
const thorns = () => import('@/views/thorns/thornsIndex.vue')

const routes = [
  { name: 'login', path: '/login', component: Login },
  { name: 'index', path: '/', redirect: '/login' },
  { path: '/home', redirect: { name: 'homeIndex' } },
  {
    name: 'home',
    path: '/home',
    component: Home,
    children: [
      { name: 'homeIndex', path: 'index', component: homeIndex },
      { name: 'fun', path: 'fun', component: fun },
      { name: 'live', path: 'live', component: live },
      { name: 'comment', path: 'comment', component: comment },
      { name: 'comment', path: 'comment', component: comment },
      { name: 'study', path: 'study', component: study },
      { name: 'thorns', path: 'thorns', component: thorns }
    ]
  }
]

export default routes
