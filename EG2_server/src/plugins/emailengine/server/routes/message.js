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
    ]
}