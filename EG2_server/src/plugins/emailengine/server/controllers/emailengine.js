// path: ./src/api/hello/controllers/hello.js

module.exports = {
  async verifyCredentials(ctx, next) {
    ctx.body = await strapi.service('api::emailengine.accounts').verifyCredentials(ctx);
  },
};
