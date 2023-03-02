import React, { useState } from 'react';

function DeliveryDetails() {
  const [adress, setAdress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const sellers = ['Fulana Pereira'];
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handler = (setter) => ({ target }) => {
    const { value } = target;
    setter(value);
  };

  return (
    <>
      <h1>Detalhes e Endereço para Entrega</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="responsible seller">
          P.vendedor responsável
          <select name="responsible seller" required="false">
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
            data-testid=""
          />
        </label>
        <label htmlFor="house number">
          Endereço
          <input
            type="integer"
            name="house number"
            id="houseNumber"
            value={ houseNumber }
            onChange={ handler(setHouseNumber) }
            data-testid=""
          />
        </label>
      </form>
    </>
  );
}

export default DeliveryDetails;
