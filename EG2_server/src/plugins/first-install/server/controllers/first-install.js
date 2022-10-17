'use strict';


module.exports = {
  async check(ctx, next) {
    const countUsers = await strapi.db.query('plugin::users-permissions.user').count();
    ctx.body = countUsers == 0;
  },
  async setup(ctx, next) {
    await ['avatars', 'drives'].forEach(async (name) => {
      await strapi
        .plugin('first-install')
        .service('folders')
        .createFolderIfDoesNotExist(name);
    })

    const contentFolder = await strapi
      .plugin('first-install')
      .service('folders')
      .createFolderIfDoesNotExist('content');

    const data = JSON.parse(ctx.request.body.data);

    //default config
    if (ctx.request.files['files.logo']) {
      const logo = await strapi.plugins.upload.services.upload.upload({
        data: {
        },
        files: ctx.request.files['files.logo']
      });
      await strapi.db.query('plugin::upload.file').update({
        where: { id: logo[0].id },
        data: { folder: contentFolder.id }
      });
      data.site.logo = logo[0].id;
    }
    const defaultConfig = await strapi.plugin('first-install')
      .service('default-config').createOrUpdate({ data: data.site })


    // first User
    const firstUserCtx = ctx;
    firstUserCtx.request.file = null;
    data.firstUser.confirmed = true;
    firstUserCtx.request.body = data.firstUser;
    await strapi.plugin('users-permissions').controller('user').create(firstUserCtx)

    ctx.body = { status: 'ok' };
  }
};
