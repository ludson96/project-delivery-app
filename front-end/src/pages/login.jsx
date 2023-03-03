import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import helpers from '../helpers';
import logo from '../images/logo.png';
import bg from '../images/background.webp';

const { backendUrl } = helpers;

const httpClient = axios.create();

httpClient.defaults.timeout = 500;

function Login({ history }) {
  const inputRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    const minPasswordLenght = 6;
    const emailValidateRegex = email.match(/^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[a-zA-Z0-9_.+-]+$/gm);

    if (password.length >= minPasswordLenght && emailValidateRegex) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
        const { token, user } = res.data;
        const saveUser = {
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        };
        localStorage.setItem('user', JSON.stringify(saveUser));
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
    <div
      className="login"
      style={ {
        background: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      } }
    >
      <img
        className="login-logo"
        src={ logo }
        alt="logo"
      />
      <form onSubmit={ handleSubmit } className="login-form">
        <label htmlFor="email">
          Login
          <input
            ref={ inputRef }
            type="email"
            name="email"
            id="email"
            placeholder="email@email.com"
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
            placeholder="******"
            value={ password }
            onChange={ handlePassword }
            data-testid="common_login__input-password"
          />
        </label>

        <button
          className="bttn-login"
          type="submit"
          disabled={ disabled }
          style={ disabled ? { opacity: '20%' } : {} }
          data-testid="common_login__button-login"
          onClick={ handleSubmit }
        >
          Login
        </button>
        <button
          className="bttn-sign"
          type="button"
          data-testid="common_login__button-register"
          onClick={ semConta }
        >
          Ainda não tenho conta
        </button>
        <small
          className="error-message"
          data-testid="common_login__element-invalid-email"
        >
          {errorText}
        </small>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
