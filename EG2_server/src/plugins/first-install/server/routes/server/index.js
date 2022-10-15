'use strict';

module.exports = {
    type: "content-api",
    routes: [
        {
            method: 'GET',
            path: '/check',
            handler: 'first-install.check',
            config: {
                auth: false,
            }
        },
    ]
}