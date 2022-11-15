const { getSizeFolder } = require('../utils/drive-size');
module.exports = ({ strapi }) => ({
    async getMyDriveFolderRoot(ctx) {
        let folderDrives = await strapi.db.query('plugin::upload.folder').findOne({
            where: { name: 'drives', parent: null }
        });
        if (!folderDrives) {
            folderDrives = await strapi.plugins.upload.services.folder.create({ name: 'drives' })
        }

        let myDriveFolder = await strapi.db.query('plugin::upload.folder').findOne({
            where: { name: ctx.state.user.id.toString(), parent: folderDrives.id }
        });
        if (!myDriveFolder) {
            myDriveFolder = await strapi.plugins.upload.services.folder.create({ name: ctx.state.user.id.toString(), parent: folderDrives.id, owner: ctx.state.user })
        }

        return myDriveFolder;
    },
    async getMyDriveSize(ctx) {
        const myDriveFolder = await this.getMyDriveFolderRoot(ctx)
        return await getSizeFolder(strapi, myDriveFolder.id)
    },
    async createNewFolder(ctx, name, parentId) {
        const parent = await strapi.db.query('plugin::upload.folder').findOne({
            where: { id: parentId }, populate: ['owner']
        });
        if (parent?.owner?.id !== ctx.state.user.id) {
            return ctx.unauthorized(`Permission denied`);
        }
        return await strapi.plugins.upload.services.folder.create({ name, owner: ctx.state.user, parent: parentId })
    }
})