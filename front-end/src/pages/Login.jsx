import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { FaGoogle, FaApple } from 'react-icons/fa';

import { loginUser } from '../httpClient';
import logo from '../images/logo.png';
import bg from '../images/background.webp';

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
    setErrorText('');
  };

  const handlePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
    setErrorText('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await loginUser({ email, password });
    if (error) return setErrorText('usuario invalido');
    const { push } = history;
    push('/customer/products');
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
      <div className="entrar-com">
        <FaGoogle className="ico-social google" />
        <span>Entrar com o Google</span>
      </div>
      <div className="entrar-com">
        <FaApple className="ico-social" />
        <span>Entrar com a Apple</span>
      </div>
      <span className="ou">ou</span>
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
        {
          errorText ? (
            <small
              className="error-message"
              data-testid="common_login__element-invalid-email"
            >
              {errorText}
            </small>
          ) : null

        }
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
