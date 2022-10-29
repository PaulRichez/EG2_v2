'use strict';


module.exports = {
    async findOne(ctx, next) {
        let data = await strapi.entityService.findOne(
            'plugin::upload.folder',
            ctx.params.id,
            {
                populate: {
                    'files':  { populate: ['owner'] },
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
    },
    async renameFolder(ctx) {
        const data = await strapi.entityService.update(
            'plugin::upload.folder',
            ctx.params.id,
            {
                data: { name: ctx.request.body.data.name },
                filters: {
                    owner: {
                        id: ctx.state.user.id
                    }
                },
                populate: {
                    'files': true,
                    'children': { count: true }, files: { count: true },
                    'owner': true
                }
            }
        );
        ctx.body = data;
    },
    async uploadFiles(ctx) {
        if (!ctx.request.files['files.file']) {
            ctx.forbidden('uploadFiles')
        }
        let folder = await strapi.entityService.findOne(
            'plugin::upload.folder',
            ctx.params.id,
            {
                populate: {
                    'owner': true
                }
            }
        );
        if (!folder.owner || folder.owner.id !== ctx.state.user.id) {
            ctx.unauthorized('uploadFiles')
        }
        const file = await strapi.plugins.upload.services.upload.upload({
            data: {
            },
            files: ctx.request.files['files.file']
        });
        const fileUpdated = await strapi.db.query('plugin::upload.file').update({
            where: { id: file[0].id },
            data: { folder: ctx.params.id, owner: ctx.state.user.id },
        });
        ctx.body = fileUpdated;
    }
};
