import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from '../context/myContext';
import helpers from '../helpers';

const { getCartProducts } = helpers;

function CardProduct({ title, price, image, id }) {
  const {
    updateCart,
  } = useContext(context);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const localCart = getCartProducts();
    if (!localCart) return null;
    const localItem = localCart.find((item) => item.id === id);
    if (!localItem) return null;
    setQuantity(localItem.quantity);
  }, [id]);

  const handleChange = ({ target }) => {
    const { value } = target;
    if (value === 0 || value < 0) {
      return setQuantity(0);
    }
    setQuantity(Number(value));
    const item = {
      id,
      title,
      price,
      quantity: Number(value),
    };
    updateCart(item);
  };

  const minus = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      const item = {
        id,
        title,
        price,
        quantity: quantity - 1,
      };
      updateCart(item);
    } else {
      setQuantity(0);
    }
  };

  const plus = () => {
    setQuantity((prev) => prev + 1);
    const item = {
      id,
      title,
      price,
      quantity: quantity + 1,
    };
    updateCart(item);
  };

  return (
    <div
      data-testid="customer_products__button-cart"
      className="card-product"
    >
      <img
        alt="produtos"
        src={ image }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <h3
        className="card-price"
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { `${price.toString().replace('.', ',')}` }
      </h3>
      <div className="card-quantity">
        <h1
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { title }
        </h1>
        <div className="bttns-container">
          <button
            className="btn-minus"
            onClick={ minus }
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            -
          </button>
          <input
            type="number"
            onChange={ handleChange }
            value={ quantity }
            data-testid={ `customer_products__input-card-quantity-${id}` }
          />
          <button
            className="btn-plus"
            onClick={ plus }
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default CardProduct;
