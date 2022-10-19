module.exports = {
  type: "content-api",
  routes: [
    {
      method: 'POST',
      path: '/update/:id',
      handler: 'user-extended.update',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    }
  ]
};
