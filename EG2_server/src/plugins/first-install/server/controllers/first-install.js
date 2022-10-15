'use strict';


module.exports = {
  async check(ctx, next) {
    const countUsers = await strapi.db.query('plugin::users-permissions.user').count();
    ctx.body = countUsers == 0;
  },
  async setup(ctx, next) {
    ctx.body = 'register';
  }
};
