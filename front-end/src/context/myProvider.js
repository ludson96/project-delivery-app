import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';
import helpers from '../helpers';

const { addCartProduct, getCartProducts } = helpers;

function Provider({ children }) {
  const [totalValue, setTotalValue] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    const localCart = getCartProducts();
    if (!localCart) return null;
    setShoppingCart(localCart);
  }, []);

  useEffect(() => {
    const total = shoppingCart
      .reduce((acm, cur) => (acm + (Number(cur.price) * cur.quantity)), 0);
    setTotalValue(total);
    addCartProduct(shoppingCart);
  }, [shoppingCart]);

  const updateCart = (requestItem) => {
    const validate = shoppingCart.some((item) => item.id === requestItem.id);
    if (!validate) {
      // const newArray = shoppingCart.push(requestItem);
      setShoppingCart([...shoppingCart, requestItem]);
      console.log(shoppingCart);
    } else {
      const update = shoppingCart.map((item) => {
        if (item.id === requestItem.id) {
          item.quantity = requestItem.quantity;
        }
        return item;
      });
      setShoppingCart(update);
    }
  };

  const contextValue = useMemo(() => ({
    totalValue,
    updateCart,
  }), [totalValue]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
