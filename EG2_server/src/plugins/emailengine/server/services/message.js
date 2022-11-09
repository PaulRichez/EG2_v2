'use strict';
const { getEmailengineUrl, getEmailengineToken } = require('../utils/axios');
const qs = require('qs');
const axios = require('axios').default;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.maxBodyLength = Infinity;
/**
 * message service.
 */

module.exports = ({ strapi }) => ({
    async search(idUser, body, ctxQuery) {
        try {
            const query = qs.stringify({
                path: ctxQuery.path,
                page: ctxQuery.page,
                pageSize: ctxQuery.pageSize
            });
            const url = getEmailengineUrl(`account/${idUser}/search?${query}`);
            const config = getEmailengineToken();
            const response = await axios.post(url, body, config);
            return response.data;
        } catch (err) {
            return err?.response?.data
        }
    }
});
