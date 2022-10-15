'use strict';

/**
 * default-config service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::default-config.default-config');
