import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import helpers from '../helpers';

const { backendUrl } = helpers;

const httpClient = axios.create();

httpClient.defaults.timeout = 500;

function Register({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtondisabled, setButtondisabled] = useState(true);
  const [name, setName] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    const passwordMinLength = 6;
    const minName = 12;
    const emailIsValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    if (emailIsValid && password.length >= passwordMinLength && name.length >= minName) {
      setButtondisabled(false);
    } else {
      setButtondisabled(true);
    }
  }, [email, password, name]);

  const handleEmail = async ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handlePassword = async ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    httpClient.post(
      `${backendUrl}register`,
      {
        name, email, password,
      },
    )
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        const { push } = history;
        push('/customer/products');
      })
      .catch((err) => {
        console.log(err);
        setErrorText('usuario invalido');
      });
  };

  const handleName = async ({ target }) => {
    const { value } = target;
    setName(value);
  };

  return (
    <div className="Login">
      <form onSubmit={ handleSubmit }>
        <h1>Register</h1>
        <label htmlFor="Nome">
          <span>Nome</span>
          <input
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
          type="submit"
          disabled={ isButtondisabled }
          data-testid="common_register__button-register"
          onClick={ handleSubmit }
        >
          Cadastrar
        </button>
        <small data-testid="common_register__element-invalid_register">
          {errorText}
        </small>
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
