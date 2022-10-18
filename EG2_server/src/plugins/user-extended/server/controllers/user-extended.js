'use strict';
const utils = require('@strapi/utils');
const { sanitize } = utils;

const sanitizeOutput = (user, ctx) => {
  const schema = strapi.getModel('plugin::users-permissions.user');
  const { auth } = ctx.state;

  return sanitize.contentAPI.output(user, schema, { auth });
};

module.exports = ({ strapi }) => ({
  async me(ctx) {
    let data = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      ctx.state.user.id,
      ctx.query
    );
    if (data) {
      data = await sanitizeOutput(data, ctx);
    }

    ctx.body = data;
  },
});
