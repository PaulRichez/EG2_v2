'use strict';

/**
 * default-config controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::default-config.default-config');
