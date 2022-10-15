'use strict';

/**
 * default-config router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::default-config.default-config', {
    only: ['find'],
    config: {
        find: {
            auth: false,
        }
    }
});
