import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { httpClient } from '../httpClient';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
// import { allProduct } from './mocks/product.mock';

const dataBtnCart = 'customer_products__button-cart';
const dataBtnCheckout = 'customer_products__checkout-bottom-value';
const dataImg1 = 'customer_products__img-card-bg-image-1';
const dataPlus1 = 'customer_products__button-card-add-item-1';
const dataTotal = 'customer_products__checkout-bottom-value';
const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '10.0',
    urlImage: 'https://example.com/product1.png', 
  },
  {
    id: 2,
    name: 'Product 2',
    price: '20.0',
    urlImage: 'https://example.com/product2.png',
  },
];

const totalValue = 30


describe('Products page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('Checks that all products are returned successfully.', async () => {
    await act(async () => {
      httpClient.get = jest.fn().mockResolvedValue({ data: products });
      renderWithRouter(<App />, ['/customer/products']);
    });

    
    const btnCart = screen.getAllByTestId(dataBtnCart);
    const total = screen.getByTestId(dataBtnCheckout);
    const imageProduct = screen.getByTestId(dataImg1);
    
    expect(btnCart).toHaveLength(3)
    expect(total).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(imageProduct).toBeInTheDocument();
    await waitFor(() => expect(httpClient.get).toHaveBeenCalledTimes(1));
  });

  it('Check the value of a product is correctly added to the cart.', async () => {
    await act(async () => {
      httpClient.get = jest.fn().mockResolvedValue({ data: products });
      renderWithRouter(<App />, ['/customer/products']);
    });
    
    const btnCartPlus = screen.getByTestId(dataPlus1);
    const total = screen.getByTestId(dataTotal);

    userEvent.click(btnCartPlus);
    
    expect(btnCartPlus).toBeInTheDocument()
    expect(total).toBeInTheDocument()
    expect(total).toHaveTextContent('10,00')
  });

});
