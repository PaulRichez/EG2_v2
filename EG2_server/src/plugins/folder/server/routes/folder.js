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
  ]
}