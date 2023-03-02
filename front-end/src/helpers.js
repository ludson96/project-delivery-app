const backendUrl = 'http://localhost:3001/';

const getOrderProducts = () => {
  const products = localStorage.getItem('orderProducts');
  return products;
};

const getTotal = () => {
  const products = getOrderProducts();
  const total = products.reduce(
    (accomulator, product) => accomulator + (product.value * product.quantity),
    0,
  );
  return total;
};

const getSeller = () => {};
export default { backendUrl, getOrderProducts, getTotal, getSeller };
