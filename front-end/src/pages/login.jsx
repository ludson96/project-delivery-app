import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import helpers from '../helpers';

const { backendUrl } = helpers;

const httpClient = axios.create();

httpClient.defaults.timeout = 500;

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    const minPasswordLenght = 6;
    const emailValidateRegex = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);

    if (password.length >= minPasswordLenght && emailValidateRegex) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handlePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    httpClient.post(`${backendUrl}login`, { email, password })
      .then((res) => {
        console.log(res);
        const user = {
          name: res.user.name,
          email: res.user.email,
          role: res.user.role,
          token: res.token,
        };
        localStorage.setItem('user', user);
        const { push } = history;
        push('/customer/products');
      })
      .catch((err) => {
        console.log(err);
        setErrorText('usuario invalido');
      });
  };

  const semConta = (e) => {
    e.preventDefault();
    const { push } = history;
    push('/register');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          id="email"
          value={ email }
          onChange={ handleEmail }
          data-testid="common_login__input-email"
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          type="password"
          name="password"
          id="password"
          value={ password }
          onChange={ handlePassword }
          data-testid="common_login__input-password"
        />
      </label>

      <button
        type="submit"
        disabled={ disabled }
        data-testid="common_login__button-login"
        onClick={ handleSubmit }
      >
        Login
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ semConta }
      >
        Ainda não tenho conta
      </button>
      <small data-testid="common_login__element-invalid-email">{errorText}</small>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
