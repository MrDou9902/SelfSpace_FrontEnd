const Login = () => import('@/views/login/loginIndex.vue');
const Home = () => import('@/components/homeIndex.vue');
const a = () => import('@/views/testA/testAIndex.vue');
const b = { template: '<div>About</div>' };

const routes = [
  { name: 'login', path: '/login', component: Login },
  { path: '/', redirect: '/login' },
  { path: '/home', redirect: { name: 'a' } },
  {
    name: 'home',
    path: '/home',
    component: Home,
    children: [
      { name: 'a', path: 'a', component: a },
      { name: 'b', path: 'b', component: b },
    ],
  },
];

export default routes;
