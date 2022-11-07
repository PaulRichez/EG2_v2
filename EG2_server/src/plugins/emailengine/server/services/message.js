'use strict';
const qs = require('qs');
const axios = require('axios').default;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.maxBodyLength = Infinity;
/**
 * message service.
 */

module.exports = ({ strapi }) => ({
    async getEmailEngineSettings() {
        return await strapi.entityService.findOne('plugin::emailengine.emailengine-config', 1);
    },
    async deleteMessage(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account/${account.id}/message/${ctx.request.query.message}`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const response = await axios.delete(url, config);
            return response.data;
        } catch (err) {
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    },
    async updateMessage(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account/${account.id}/message/${ctx.request.query.message}`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const response = await axios.put(url, ctx.request.body, config);
            return response.data;
        } catch (err) {
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    },
    async moveMessage(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account/${account.id}/message/${ctx.request.query.message}/move`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const response = await axios.put(url, ctx.request.body, config);
            return response.data;
        } catch (err) {
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    },
    async getMessageSource(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account/${account.id}/message/${ctx.request.query.message}/source`;
            const config = {
                responseType: 'stream',
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const response = await axios.get(url, config);
            return response.data;
        } catch (err) {
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    },
    async getMessage(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account/${account.id}/message/${ctx.request.query.message}`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const response = await axios.get(url, config);
            return response.data;
        } catch (err) {
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    },
    async downloadAttachment(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account/${account.id}/attachment/${ctx.request.query.attachment}`;
            const config = {
                responseType: 'stream',
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const response = await axios.get(url, config);
            return response.data;
        } catch (err) {
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    },
    async getMessageText(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account/${account.id}/text/${ctx.request.query.text}`;
            const config = {
                headers: { Authorization: `Bearer ${emailEngineSettings.token}` }
            };
            const response = await axios.get(url, config);
            return response.data;
        } catch (err) {
            ctx.status = err.response?.data?.statusCode || err.response?.status || 500;
            return err?.response?.data
        }
    },
    async submit(ctx, account) {
        const emailEngineSettings = await this.getEmailEngineSettings();
        try {
            const url = `${emailEngineSettings.url}v1/account/${account.id}/submit`;
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
