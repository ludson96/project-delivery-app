import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { sendSale } from '../httpClient';

function DeliveryDetails({ history }) {
  const [adress, setAdress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [errorText, setErrorText] = useState('');

  const sellers = ['Fulana Pereira'];
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handler = (setter) => ({ target }) => {
    const { value } = target;
    setter(value);
  };

  const tryToSendSale = async () => {
    const {
      saleId,
      error,
    } = await sendSale({ deliveryAddress: adress, deliveryNumber: houseNumber });
    if (error) {
      return setErrorText(`
    Ocorreu um erro durante a criação do pedido, tente novamente
    `);
    }
    const { push } = history;
    push(`/customer/sale-details/${saleId}`);
  };

  return (
    <div className="details-address-checkout">
      <h1>Detalhes e Endereço para Entrega</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="responsible seller">
          P.vendedor responsável
          <select
            required="true"
            name="responsible seller"
            data-testid="customer_checkout__select-seller"
          >
            {sellers.map((seller) => (
              <option value={ seller } key={ seller }>{seller}</option>
            ))}
          </select>
        </label>
        <label htmlFor="adress">
          Endereço
          <input
            type="adress"
            name="adress"
            id="adress"
            value={ adress }
            onChange={ handler(setAdress) }
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="house number">
          numero
          <input
            type="number"
            name="house number"
            id="houseNumber"
            value={ houseNumber }
            onChange={ handler(setHouseNumber) }
            data-testid="customer_checkout__input-address-number"
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ tryToSendSale }
        >
          FINALIZAR PEDIDO
        </button>
        <small>{errorText}</small>
      </form>
    </div>
  );
}

DeliveryDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DeliveryDetails;
