import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { httpClient } from '../httpClient';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const dataMessageError = 'common_register__element-invalid_register';
const dataInputName = 'common_register__input-name';
const dataInputEmail = 'common_register__input-email';
const dataInputPwd = 'common_register__input-password';
const dataFullName = 'customer_products__element-navbar-user-full-name';
const name = 'Teste de tal';
const email = 'teste@email.com';
const password = '123456';
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImRhdGFWYWx1ZXMiOnsiaWQiOj
ksIm5hbWUiOiJEZWxpdmVyeSBBcHAgQWRtaW4iLCJlbWFpbCI6Imx1ZHNvbl9wczI1QGhvdG1haWwuY29tIiwicGFz
c3dvcmQiOiJmY2VhOTIwZjc0MTJiNWRhN2JlMGNmNDJiOGM5Mzc1OSIsInJvbGUiOiJjdXN0b21lciJ9LCJfcHJldm
lvdXNEYXRhVmFsdWVzIjp7Im5hbWUiOiJEZWxpdmVyeSBBcHAgQWRtaW4iLCJlbWFpbCI6Imx1ZHNvbl9wczI1QGhv
dG1haWwuY29tIiwicGFzc3dvcmQiOiJmY2VhOTIwZjc0MTJiNWRhN2JlMGNmNDJiOGM5Mzc1OSIsInJvbGUiOiJjdX
N0b21lciIsImlkIjo5fSwidW5pcW5vIjoxLCJfY2hhbmdlZCI6e30sIl9vcHRpb25zIjp7ImlzTmV3UmVjb3JkIjp0
cnVlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIn0sImlzTmV3UmVjb3JkIjpmYWxzZX0sImlhdC
I6MTY3ODIyNTM0MiwiZXhwIjoxNjc4ODMwMTQyfQ.wIf9bzH0T5A-99P6PTQmDWetfSTj4QXxwJytqb8lJZU`;

describe('Register page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Check that all elements are created.', () => {
    renderWithRouter(<App />, ['/register']);

    const titleRegister = screen.getByText(/register/i);
    const inputName = screen.getByTestId(dataInputName);
    const inputEmail = screen.getByTestId(dataInputEmail);
    const inputPwd = screen.getByTestId(dataInputPwd);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });

    expect(titleRegister).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPwd).toBeInTheDocument();
    expect(btnCadastrar).toBeInTheDocument();
  });

  it('Check if I can register successfully.', async () => {
    httpClient.post = jest.fn().mockResolvedValue({ data: token });

    const { history } = renderWithRouter(<App />, ['/register']);

    const inputName = screen.getByTestId(dataInputName);
    const inputEmail = screen.getByTestId(dataInputEmail);
    const inputPwd = screen.getByTestId(dataInputPwd);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });

    userEvent.type(inputName, name);
    userEvent.type(inputEmail, email);
    userEvent.type(inputPwd, password);

    userEvent.click(btnCadastrar);

    await waitFor(() => {
      const titleName = screen.getByTestId(dataFullName);
      expect(titleName).toBeInTheDocument();
      expect(history.location.pathname).toBe('/customer/products');
    });
  });

  it('Checks if it returns an error when registering with existing email', async () => {
    httpClient.post = jest.fn().mockRejectedValue({
      response: {
        data: { message: 'User already registered' },
      },
    });

    renderWithRouter(<App />, ['/register']);

    const inputName = screen.getByTestId(dataInputName);
    const inputEmail = screen.getByTestId(dataInputEmail);
    const inputPwd = screen.getByTestId(dataInputPwd);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });

    userEvent.type(inputName, 'Cliente Zé Birita');
    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPwd, '$#zebirita#$');

    userEvent.click(btnCadastrar);

    await waitFor(() => {
      const messageError = screen.getByTestId(dataMessageError);
      expect(messageError).toBeInTheDocument();
    });
  });
});
