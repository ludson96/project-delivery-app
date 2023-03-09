const axios = require('axios').default;

const helpers = require('./helpers').default;

const { getCartProducts, getTotal } = helpers;

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
      name,
      email,
      token: res.data.token,
    };
    console.log(saveUser);
    httpClient.defaults.headers.post.authorization = saveUser.token;
    console.log(httpClient.defaults.headers.post.Authorization);
    console.log('passei do autozation');
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
    console.log('passou: ', res);
    const { token, user } = res.data;
    const saveUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
    httpClient.defaults.headers.post.authorization = token;

    localStorage.setItem('user', JSON.stringify(saveUser));
  } catch (err) {
    error = true;
  }
  return { error };
};

const sendSale = async ({ deliveryAddress, deliveryNumber }) => {
  const products = getCartProducts();
  console.log(products);
  const nProducts = products.map((product) => ({ ...product, productId: product.id }));
  const totalPrice = getTotal();
  const { token } = JSON.parse(localStorage.getItem('user'));

  httpClient.defaults.headers.post.authorization = token;
  let error = false;
  try {
    const res = await httpClient.post(backendUrl('sales'), {
      products: nProducts,
      totalPrice,
      deliveryAddress,
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
    const { token } = JSON.parse(localStorage.getItem('user'));
    httpClient.defaults.headers.get.authorization = token;
    const res = await httpClient.get(backendUrl('sales'));
    const sales = res.data;
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
