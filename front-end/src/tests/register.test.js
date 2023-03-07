import React from 'react';
import { httpClient } from '../httpClient';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Login page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test(
    'Checks if the email, password and login button are rendered on the login screen',
    async () => {

      httpClient.post = jest.fn().mockResolvedValue({ data: { hasToken: false }});

      const { history } = renderWithRouter(<App />);

      const emailInput = screen.getByTestId(testUserInputEmail);
      const passwordInput = screen.getByTestId(testUserInputPassword);
      const loginButton = screen.getByTestId(tesButtonEnter);
      const registerButton = screen.getByTestId(testButtonRegister);

      userEvent.type(emailInput, 'teste@hotmail.com');
      userEvent.type(passwordInput, '123456789');

      userEvent.click(loginButton);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId(testUserInvalidEmail)).toBeInTheDocument();
      });

      expect(history.location.pathname).toBe('/login');
    },
  );

  // test('Checks if the user can type in the email and password inputs', () => {
  //   const { history } = renderWithRouter(<App />);

  //   const emailInput = screen.getByTestId(testUserInputEmail);
  //   const passwordInput = screen.getByTestId(testUserInputPassword);

  //   userEvent.type(emailInput, testUserEmail);
  //   userEvent.type(passwordInput, tesUserPassword);

  //   expect(emailInput).toHaveValue(testUserEmail);
  //   expect(passwordInput).toHaveValue(tesUserPassword);

  //   expect(history.location.pathname).toBe('/login');
  // });

  // test(`'User is able to click the sign in button after a valid email address
  // and password of 6 or more characters'`, () => {
  //   renderWithRouter(<App />);

  //   const emailInput = screen.getByTestId(testUserInputEmail);
  //   const passwordInput = screen.getByTestId(testUserInputPassword);
  //   const loginButton = screen.getByTestId(tesButtonEnter);

  //   userEvent.type(emailInput, 'incorrectEmail');
  //   expect(loginButton).toBeDisabled();

  //   userEvent.type(passwordInput, '12345');
  //   expect(loginButton).toBeDisabled();

  //   userEvent.type(emailInput, testUserEmail);
  //   userEvent.type(passwordInput, tesUserPassword);
  //   expect(loginButton).toBeEnabled();
  // });

  // test('Checks if the user can click the register button', () => {
  //   const { history } = renderWithRouter(<App />);

  //   const registerButton = screen.getByTestId(testButtonRegister);

  //   userEvent.click(registerButton);

  //   expect(history.location.pathname).toBe('/register');
  // });

  // test('User is redirected to the page after clicking the enter button', async () => {

  //   httpClient.post = jest.fn().mockResolvedValue({ data: outputValid });

  //   const { history } = renderWithRouter(<App />);

  //   const emailInput = screen.getByTestId(testUserInputEmail);
  //   const passwordInput = screen.getByTestId(testUserInputPassword);
  //   const loginButton = screen.getByTestId(tesButtonEnter);

  //   userEvent.type(emailInput, testUserEmail);
  //   userEvent.type(passwordInput, tesUserPassword);
  //   userEvent.click(loginButton);
    
  //   await waitFor(async () => {
  //     const abc = jest.spyOn(history, 'push');
  //     expect(abc).toHaveBeenLastCalledWith('/customer/products')
  //   });
  // });
});
