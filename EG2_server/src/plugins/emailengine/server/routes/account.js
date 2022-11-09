'use strict';

module.exports = {
    type: "content-api",
    routes: [
        {
            method: 'GET',
            path: '/account',
            handler: 'account.findMe',
            config: {
                roles: ['authenticated']
            }
        },
        {
            method: 'POST',
            path: '/account/createOrUpdate',
            handler: 'account.createOrUpdate',
            config: {
                roles: ['authenticated']
            }
        },
    ]
}