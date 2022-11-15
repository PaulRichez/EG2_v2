module.exports = {
  type: "content-api",
  routes: [
    {
      method: 'GET',
      path: '/user',
      handler: 'user-extended.find',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    },
    {
      method: 'GET',
      path: '/admin/user/count',
      handler: 'user-extended.count',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    },
    {
      method: 'GET',
      path: '/user/:id',
      handler: 'user-extended.findOne',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    },
    {
      method: 'PUT',
      path: '/admin/user/:id',
      handler: 'user-extended.update',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    },
    {
      method: 'POST',
      path: '/admin/user',
      handler: 'user-extended.create',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    }
  ]
};
