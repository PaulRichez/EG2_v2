module.exports = {
  type: "content-api",
  routes: [
    {
      method: 'GET',
      path: '/user-group',
      handler: 'user-group.find',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    },
    {
      method: 'GET',
      path: '/user-group/count',
      handler: 'user-group.count',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    },
    {
      method: 'GET',
      path: '/user-group/:id',
      handler: 'user-group.findOne',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    },
    {
      method: 'POST',
      path: '/user-group/:id',
      handler: 'user-group.create',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    },
    {
      method: 'PUT',
      path: '/user-group/:id',
      handler: 'user-group.update',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    },
    {
      method: 'DELETE',
      path: '/user-group',
      handler: 'user-group.delete',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    }
  ]
};
