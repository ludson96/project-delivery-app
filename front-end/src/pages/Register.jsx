import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { registUser } from '../httpClient';

import logo from '../images/logo.png';
import bg from '../images/background.webp';

function Register({ history }) {
  const inputRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtondisabled, setButtondisabled] = useState(true);
  const [name, setName] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const passwordMinLength = 6;
    const minName = 12;
    const emailIsValid = email.match(/^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[a-zA-Z0-9_.+-]+$/gm);

    if (emailIsValid && password.length >= passwordMinLength && name.length >= minName) {
      setButtondisabled(false);
    } else {
      setButtondisabled(true);
    }
  }, [email, password, name]);

  const handleEmail = async ({ target }) => {
    const { value } = target;
    setEmail(value);
    setErrorText('');
  };

  const handlePassword = async ({ target }) => {
    const { value } = target;
    setPassword(value);
    setErrorText('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await registUser({ name, email, password });
    if (error) return setErrorText('User already registered');
    const { push } = history;
    push('/customer/products');
  };

  const handleName = async ({ target }) => {
    const { value } = target;
    setName(value);
  };

  return (
    <div
      className="register"
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
      <form onSubmit={ handleSubmit } className="register-form">
        <h1>Register</h1>
        <label htmlFor="Nome">
          <span>Nome</span>
          <input
            ref={ inputRef }
            type="text"
            name="name"
            id="name"
            value={ name }
            onChange={ handleName }
            data-testid="common_register__input-name"
            placeholder="Seu nome"
          />
        </label>

        <label htmlFor="email">
          <span>Email</span>
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ handleEmail }
            data-testid="common_register__input-email"
            placeholder="seu-email@site.com.b"
          />
        </label>

        <label htmlFor="password">
          <span>Password</span>
          <input
            type="password"
            name="password"
            id="password"
            value={ password }
            onChange={ handlePassword }
            data-testid="common_register__input-password"
          />
        </label>

        <button
          className="bttn-register"
          type="submit"
          disabled={ isButtondisabled }
          style={ isButtondisabled ? { opacity: '20%' } : {} }
          data-testid="common_register__button-register"
          onClick={ handleSubmit }
        >
          Cadastrar
        </button>
        <span
          className="back-login"
        >
          Voltar para
          {' '}
          <strong><Link to="/login">Login</Link></strong>
        </span>
        {
          errorText ? (
            <small
              className="error-message"
              data-testid="common_register__element-invalid_register"
            >
              {errorText}
            </small>
          ) : null
        }
      </form>
    </div>

  );
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Register;
