'use strict';
const { getEmailengineUrl, getEmailengineToken } = require('../utils/axios');
const qs = require('qs');
const axios = require('axios').default;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.maxBodyLength = Infinity;
/**
 * mailbox service.
 */

module.exports = ({ strapi }) => ({
    async find(idUser) {
        try {
            const url = getEmailengineUrl(`account/${idUser}/mailboxes`);
            const config = await getEmailengineToken();
            const response = await axios.get(url, config);
            return response.data;
        } catch (err) {
            return err?.response?.data;
        }
    },
    async create(idUser, paths) {
        try {
            const url = getEmailengineUrl(`account/${idUser}/mailbox`);
            const config = await getEmailengineToken();
            const response = await axios.post(url, { path: paths }, config);
            return response.data;
        } catch (err) {
            return err?.response?.data;
        }
    },
    async delete(idUser, path) {
        try {
            const url = getEmailengineUrl(`account/${idUser}/mailbox?path=${path}`);
            const config = await getEmailengineToken();
            const response = await axios.delete(url, config);
            return response.data;
        } catch (err) {
            return err?.response?.data;
        }
    },
});
