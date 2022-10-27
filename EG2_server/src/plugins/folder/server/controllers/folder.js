'use strict';


module.exports = {
    async findOne(ctx, next) {
        let data = await strapi.entityService.findOne(
            'plugin::upload.folder',
            ctx.params.id,
            {
                populate: {
                    'files': true,
                    'parent': { populate: ['parent', 'parent.parent', 'parent.parent.parent'] },
                    'children': {
                        populate: { owner: true, children: { count: true }, files: { count: true } },
                    },
                    'owner': true
                }
            }
        );
        if (!data?.parent?.parent) {
            data.parent = null;
        }
        if (!data?.parent?.parent?.parent && data?.parent?.parent) {
            data.parent.parent = null;
        }
        if (!data?.parent?.parent?.parent?.parent && data?.parent?.parent?.parent) {
            data.parent.parent.parent = null;
        }
        ctx.body = data;
    },
    async createFolder(ctx) {
        const newFolder = await strapi
            .plugin('folder')
            .service('drive')
            .createNewFolder(ctx, ctx.request.body.data.name, ctx.params.id);
        const data = await strapi.entityService.findOne(
            'plugin::upload.folder',
            newFolder.id,
            {
                populate: {
                    'files': true,
                    'children': { count: true }, files: { count: true },
                    'owner': true
                }
            }
        );
        ctx.body = data;
    }
};
