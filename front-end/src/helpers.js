const backendUrl = 'http://localhost:3001/';

const getOrderProducts = () => {
  const products = JSON.parse(localStorage.getItem('orderProducts'));
  return products;
};

const addOrderProduct = (newProduct) => {
  const products = JSON.parse(localStorage.getItem('orderProducts')) || [];
  localStorage.setItem(
    'orderProducts',
    JSON.stringify([...products, newProduct]),
  );
};

const getTotal = () => {
  const products = getOrderProducts();
  const total = products.reduce(
    (accomulator, product) => accomulator + (product.value * product.quantity),
    0,
  );
  return total;
};

addOrderProduct({ name: 'gfvsdcas', value: 342.55, quantity: 44 });

export default { backendUrl, getOrderProducts, getTotal, addOrderProduct };
