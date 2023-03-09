import React from 'react';
import NavBar from '../components/NavBar';
import AdminCreateNewUserForm from '../components/AdminCreateNewUser';
import UserCard from '../components/UserCard';

const userList = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator',
  },
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
  },
];

function admin() {
  return (
    <div>
      <NavBar />
      <div>
        <h3>
          Cadastrar novo usuário
        </h3>
        <AdminCreateNewUserForm />
      </div>

      <div>
        {userList.map(({ id, name, email, role }, index) => (<UserCard
          id={ id }
          name={ name }
          email={ email }
          role={ role }
          index={ index }
          key={ index }
        />))}
      </div>
    </div>
  );
}

export default admin;
