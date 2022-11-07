'use strict';

module.exports = {
    type: "content-api",
    routes: [
        {
            method: 'POST',
            path: '/verify-credentials',
            handler: 'emailengine.verifyCredentials',
            config: {
                roles: ['authenticated']
            }
        },
    ]
}