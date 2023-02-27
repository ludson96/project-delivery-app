import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import backendUrl from '../helpers';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [errorText] = useState('');

  useEffect(() => {
    const passwordMinLength = 6;
    const emailIsValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);

    if (password.length > passwordMinLength && emailIsValid) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // fazer o post pra api
    axios.get(`${backendUrl}login`, { email, password })
      .then((res) => {
        const { token } = res.json().token;
        if (token) {
          localStorage.setItem('token', token);
          const { push } = history;
          push('/customer/products');
        }
      });
    // if deu bom {
    // }
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
