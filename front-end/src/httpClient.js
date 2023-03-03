const axios = require('axios').default;

const httpClient = axios.create();

httpClient.defaults.timeout = 500;

module.exports = httpClient;
