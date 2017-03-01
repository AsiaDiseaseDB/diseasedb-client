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
    }, {
      path: 'location',
      component: require('./components/Location.vue')
    }, {
      path: 'disease',
      component: require('./components/DiseaseData.vue')
    }, {
      path: 'intervention',
      component: require('./components/InterventionData.vue')
    }]
  },
  {
    path: '/login',
    component: require('./views/login.vue')
  }
];

module.exports = routes;
