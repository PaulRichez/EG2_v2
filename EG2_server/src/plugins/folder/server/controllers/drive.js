'use strict';


module.exports = {
    async getMyDriveFolderRoot(ctx, next) {
      const myDriveFolder =  await strapi
      .plugin('folder')
      .service('drive')
      .getMyDriveFolderRoot(ctx);
      ctx.body = myDriveFolder;
    },
};
