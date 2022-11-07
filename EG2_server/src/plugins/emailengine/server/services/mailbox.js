'use strict';

const qs = require('qs');
const axios = require('axios').default;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.maxBodyLength = Infinity;
/**
 * mailbox service.
 */

module.exports = ({ strapi }) => ({
    async getEmailEngineSettings() {
        return await strapi.entityService.findOne('plugin::emailengine.emailengine-config', 1);
    },
    async getMailboxes(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account/${account.id}/mailboxes`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const response = await axios.get(url, config);
            return response.data;
        } catch (err) {
            console.log('rr', err.response);
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            console.log(ctx.status)
            return err?.response?.data || { code: err?.code, message: err?.message };
        }
    },
    async createMailbox(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account/${account.id}/mailbox`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const response = await axios.post(url, { path: [ctx.request.body.path] }, config);
            return response.data;
        } catch (err) {
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    },
    async deleteMailbox(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account/${account.id}/mailbox?path=${ctx.request.query.path}`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            console.log(url);
            const response = await axios.delete(url, config);
            return response.data;
        } catch (err) {
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    },
    async search(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const query = qs.stringify({
                path: ctx.request.query.path,
                page: ctx.request.query.page,
                pageSize: ctx.request.query.pageSize
            });
            const url = `${emailEngineSettings.url}v1/account/${account.id}/search?${query}`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const response = await axios.post(url, ctx.request.body, config);
            return response.data;
        } catch (err) {
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    }
});
