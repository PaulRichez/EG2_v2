'use strict';

module.exports = {
    type: "content-api",
    routes: [
        {
            method: 'POST',
            path: '/messages',
            handler: 'message.search',
            config: {
                roles: ['authenticated']
            }
        },
        {
            method: 'GET',
            path: '/message/:id',
            handler: 'message.get',
            config: {
                roles: ['authenticated']
            }
        }
    ]
}