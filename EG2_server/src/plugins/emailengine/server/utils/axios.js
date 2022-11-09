module.exports = {
    getEmailengineUrl: function getEmailengineUrl(endpoint) {
        return `http://localhost:3000/v1/${endpoint}`;
    },
    getEmailengineToken: function getEmailengineToken() {
        return {
            headers: { Authorization: `Bearer 2828` }
        };
    }
}
