import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';

import logo from '../images/logo.png';

function NavBar() {
  const [name, setName] = useState('User Name');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const stringUser = JSON.parse(user);
    setName(stringUser.name);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-item-logo">
        <img src={ logo } alt="logo" />
      </div>
      <div className="nav-item-1">
        <Link
          to="/customer/products"
          data-testid=" customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </Link>

      </div>
      <div className="nav-item-2">
        <Link
          to="/meus-pedidos"
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS

        </Link>
      </div>
      <div className="nav-item-3">
        <h2
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </h2>
      </div>
      <div className="nav-item-4">
        <Link
          to="/login"
          data-testid="customer_products__element-navbar-link-logout"
        >
          <FiLogOut className="ico-logout" />
          {' '}
          <span>Sair</span>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
