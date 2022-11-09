// path: ./src/api/hello/controllers/hello.js

module.exports = {
    async search(ctx, next) {
        const result = await strapi.service('plugin::emailengine.message').search(ctx.state.user.id, ctx.request.body.data, ctx.request.query);
        console.log(result)
        ctx.status = result.status || result.statusCode || 200;
        ctx.body = result
    },
};
