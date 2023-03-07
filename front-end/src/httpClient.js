const axios = require('axios').default;

const helpers = require('./helpers');

const { getCartProducts } = helpers;

const backendUrl = (endpoint) => `http://localhost:3001/${endpoint}`;

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
    const saveUser = {
      id,
      name,
      email,
      token: res.data.token,
    };
    httpClient.defaults.headers.common.Authorization = saveUser.token;
    localStorage.setItem('user', JSON.stringify(saveUser));
  } catch (err) {
    error = true;
  }
  return { error };
};

const loginUser = async ({ email, password }) => {
  let error = false;
  try {
    const res = await httpClient.post(backendUrl('login'), { email, password });
    // console.log(res);
    const { token, user } = res.data;
    const saveUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
    httpClient.defaults.headers.common.Authorization = token;

    localStorage.setItem('user', JSON.stringify(saveUser));
  } catch (err) {
    error = true;
  }
  return { error };
};

const sendSale = async ({ deliveryAdress, deliveryNumber }) => {
  const products = getCartProducts();
  const totalPrice = getTotal();
  let error = false;
  try {
    const res = await httpClient.post(backendUrl('sales'), {
      products,
      totalPrice,
      deliveryAdress,
      deliveryNumber,
    });
    const { saleId } = res.data;
    return { saleId, error };
  } catch (err) {
    error = true;
  }
  return { error };
};

const getMineSales = async () => {
  let error = false;
  try {
    const res = await httpClient.get(backendUrl('sales'));
    const { sales } = res.data;
    return { sales, error };
  } catch (err) {
    error = true;
  }
  return { error };
};

module.exports = { httpClient,
  registUser,
  loginUser,
  backendUrl,
  sendSale,
  getMineSales };
