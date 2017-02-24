const routes = [{
    path: '/home',
    component: require('./views/home.vue'),
    meta: { requireAuth: true },
    alias: '/' 
  },
  { path: '/login', component: require('./views/login.vue') }
];

module.exports = routes;
