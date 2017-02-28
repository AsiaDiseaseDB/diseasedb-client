const routes = [{
    path: '/home',
    component: require('./views/home.vue'),
    meta: { requireAuth: true },
    alias: '/'
  },
  {
    path: '/detail',
    component: require('./views/detail.vue'),
    mata: { requireAuth: true },
    children: [{
      path: 'basicsource',
      component: require('./components/BasicSource.vue')
    }, {
      path: 'survey',
      component: require('./components/Survey.vue')
    }]
  },
  {
    path: '/login',
    component: require('./views/login.vue')
  }
];

module.exports = routes;
