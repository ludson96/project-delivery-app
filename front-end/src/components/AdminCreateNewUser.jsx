import React from 'react';

function AdminCreateNewUserForm() {
  return (
    <div>
      <form>
        <label htmlFor="nameInput">
          <span>Nome</span>
          <input
            type="text"
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
          />
        </label>

        <label htmlFor="EmailInput">
          <span>Email</span>
          <input
            type="email"
            placeholder="seu-email@site.com"
            data-testid="admin_manage__input-email"
          />
        </label>

        <label htmlFor="SenhaInput">
          <span>Senha</span>
          <input
            type="password"
            placeholder="**************"
            data-testid="admin_manage__input-password"
          />
        </label>

        <label htmlFor="RoleDropDown">
          <span>Tipo</span>
          <select data-testid="admin_manage__select-role">
            <option>administrator</option>
            <option>seller</option>
            <option>customer</option>
          </select>
        </label>

        <button
          data-testid="admin_manage__button-register"
          type="button"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default AdminCreateNewUserForm;
