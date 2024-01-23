import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/common/Sidebar';
import Greeting from '../components/common/Greeting';

import '../styles/dashboard.css';
import Navbar from '../components/dashboard/Navbar';
import { getUser } from '../utils/localStorage';

const UserDashboard = () => {
  const {name, productPurchased } = getUser();

  return (
    <>
      <Navbar name={ name } purchased={ productPurchased } />
      <Greeting name={name} />
      <div className="main-container">
        <Sidebar />
        <div className="main">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default UserDashboard