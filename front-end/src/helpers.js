const getCartProducts = () => {
  const StorageCart = JSON.parse(localStorage.getItem('carrinho'));
  return StorageCart;
};

const addCartProduct = (item) => {
  // const StorageCart = JSON.parse(localStorage.getItem('carrinho')) || [];
  localStorage.setItem(
    'carrinho',
    JSON.stringify(item),
  );
};

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

export default {
  getCartProducts,
  addCartProduct,
  getOrderProducts,
  getTotal,
  addOrderProduct,
};
