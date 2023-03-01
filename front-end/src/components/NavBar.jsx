import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [name, setName] = useState('User Name');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) return;
    setName(user.name);
  }, []);

  return (
    <nav>
      <div>
        <Link
          to="/produtos"
          data-testid="customer_products__element-navbar-links-products"
        >
          PRODUTOS
        </Link>

      </div>
      <div>
        <Link
          to="/meus-pedidos"
          data-testid="customer_products__element-navbar-links-orders"
        >
          MEUS PEDIDOS

        </Link>
      </div>
      <div>
        <h2
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </h2>
      </div>
      <div>
        <Link
          to="/login"
          data-testid="customer_products__element-navbar-links-logout"
        >
          Sair
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
