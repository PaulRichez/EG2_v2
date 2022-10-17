'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('user-extended')
      .service('myService')
      .getWelcomeMessage();
  },
});
