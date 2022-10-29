'use strict';

module.exports = {
  type: "content-api",
  routes: [
    {
      method: 'GET',
      path: '/:id',
      handler: 'folder.findOne',
      config: {
        roles: ['authenticated'],
      }
    },
    {
      method: 'GET',
      path: '/drive/my-drive',
      handler: 'drive.getMyDriveFolderRoot',
      config: {
        roles: ['authenticated'],
      }
    },
    {
      method: 'POST',
      path: '/drive/new-folder/:id',
      handler: 'folder.createFolder',
      config: {
        roles: ['authenticated'],
      }
    },
    {
      method: 'PUT',
      path: '/drive/rename-folder/:id',
      handler: 'folder.renameFolder',
      config: {
        roles: ['authenticated'],
      }
    },
    {
      method: 'POST',
      path: '/drive/upload/:id',
      handler: 'folder.uploadFiles',
      config: {
        roles: ['authenticated'],
      }
    },
  ]
}