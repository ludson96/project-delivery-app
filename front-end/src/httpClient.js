const axios = require('axios').default;
const helpers = require('./helpers').default;

const { backendUrl } = helpers;

const httpClient = axios.create();

httpClient.defaults.timeout = 500;

const registUser = async ({ name, email, password }) => {
  let error = false;
  try {
    const res = await httpClient.post(
      backendUrl('register'),
      {
        name, email, password,
      },
    );
    console.log(res);
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    console.log(err);
    error = true;
  }
  return { error };
};

module.exports = { httpClient, registUser };
