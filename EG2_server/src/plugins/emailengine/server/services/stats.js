'use strict';
const axios = require('axios').default;
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + '25e8ffcbd2364e8a827c898e02adc9003f9eb4e7a83afe1c786c0fd9ced58951';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.maxBodyLength = Infinity;
/**
 * stats service.
 */

module.exports = ({ strapi }) => ({
    async getEmailEngineSettings() {
        return await strapi.entityService.findOne('plugin::emailengine.emailengine-config', 1);
    },
    async getStats(ctx) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/stats`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const response = await axios.get(url, config);
            return response.data;
        } catch (err) {
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    }
});
