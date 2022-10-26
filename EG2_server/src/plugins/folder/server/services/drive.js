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
            myDriveFolder = await strapi.plugins.upload.services.folder.create({ name: ctx.state.user.id.toString(), parent: folderDrives.id })
        }

        return myDriveFolder;
    }
})