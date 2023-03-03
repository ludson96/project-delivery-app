import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CardProduct({ title, price, image, id }) {
  const [quantity, setQuantity] = useState(0);

  const handleChange = ({ target }) => {
    const { value } = target;
    if (value <= 0) {
      return setQuantity(0);
    }
    setQuantity(Number(value));
  };

  return (
    <div className="card-product">
      {/* <div
        style={ {
          background: `url(${image})`,
          height: '200px',
          width: '200px',
        } }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      >
        <h3 data-testid={ `customer_products__element-card-price-${id}` }>{ price }</h3>
      </div> */}
      <img
        alt="produtos"
        src={ image }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <h3
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { `${price}` }
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
            onClick={
              () => (quantity > 0 ? setQuantity((prev) => prev - 1) : setQuantity(0))
            }
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
            onClick={
              () => (setQuantity((prev) => Number(prev + 1)))
            }
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
  id: PropTypes.string.isRequired,
};

export default CardProduct;
