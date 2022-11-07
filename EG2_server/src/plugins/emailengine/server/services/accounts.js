'use strict';

const axios = require('axios').default;
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + '25e8ffcbd2364e8a827c898e02adc9003f9eb4e7a83afe1c786c0fd9ced58951';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.maxBodyLength = Infinity;

/**
 * emailengine service.
 */


/*case 'DL':
                try {
                    const response = await axios.get(url, {
                        responseType: 'stream'
                    });
                    console.log(response.data)
                    return response.data;
                } catch (err) {
                    ctx.response.badRequest(err);
                    if (err.response?.data) {
                        return err.response.data;
                    } else {
                        return err.code;
                    }
                }
                break;*/


module.exports = ({ strapi }) => ({
    async getEmailEngineSettings() {
        return await strapi.entityService.findOne('plugin::emailengine.emailengine-config', 1);
    },
    async verifyCredentials(ctx) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/verifyAccount`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const response = await axios.post(url, ctx.request.body, config);
            return response.data;
        } catch (err) {
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    },
    async createAccount(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const payload = {
                account: account.id.toString(),
                name: account.user.username,
                imap: account.imap,
                smtp: account.smtp,
            };
            const response = await axios.post(url, payload, config);
            console.log(response.data);
            await strapi.entityService.update('api::email-store.email-store', account.id, { data: { emailEngineCreated: true } })
            return response.data;
        } catch (err) {
            console.log(err)
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    },
    async updateAccount(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const payload = {
                name: account.user.username,
                imap: account.imap,
                smtp: account.smtp,
            };
            const response = await axios.put(url + '/' + account.id.toString(), payload, config);
            await strapi.entityService.update('api::email-store.email-store', account.id, { data: { emailEngineCreated: true } })
            return response.data;
        } catch (err) {
            console.log(err)
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    },
});
