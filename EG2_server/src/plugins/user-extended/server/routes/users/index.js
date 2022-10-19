module.exports = {
  type: "content-api",
  routes: [
    {
      method: 'PUT',
      path: '/user/:id',
      handler: 'user-extended.update',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    }
  ]
};
