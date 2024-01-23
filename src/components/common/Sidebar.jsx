import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../api/auth';
import Cookies from 'js-cookie';

import '../../styles/dashboard.css';
import { getUser, removeToken, removeUser } from '../../utils/localStorage';

const Sidebar = () => {
  const tab = window.location.pathname.split('/').pop();
  const [activeItem, setActiveItem] = useState(tab);
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const userData = getUser();

  useEffect(() => {
    if (userData) {
      const { role } = userData;
      setRole(role);
    }
  }, [userData])

  const handleLogout = () => {
    logout()
      .then(response => {
        toast.success(response.message);
        const user = getUser();

        if (user) {
          removeUser();
          removeToken();
          Cookies.remove('token');
        }
        navigate('/login');
      })
      .catch(error => {
        toast.error(error?.data?.message);
      })
  }

  const handleMenuItemClick = (title, path) => {
    setActiveItem(title);
    if (role === 'user') {
      navigate(`/user/dashboard/${path}`);
    } else if (role === 'admin') {
      navigate(`/admin/dashboard/${path}`);
    }
  }

  return (
    <div className="sidebar">
      <div className="row-1">
        <ul>
          <li
            className={ `menu-item ${activeItem === 'Home' || activeItem === 'dashboard' || activeItem === '/' ? 'active-item' : ''}` }
            onClick={ () => handleMenuItemClick('Home', '') }
          >
            <span className="menu-icon">
              <img src="/assets/icons/home.svg" alt="Home" />
            </span>
            <span className="menu-title ">Home</span>
          </li>
          <li
            className={ `menu-item ${activeItem === 'My Network' ? 'active-item' : ''}` }
            onClick={ () => handleMenuItemClick('My Network', 'network') }
          >
            <span className="menu-icon">
              <img src="/assets/icons/my_network.svg" alt="My Network" />
            </span>
            <span className="menu-title">My Network</span>
          </li>
          <li
            className={ `menu-item ${activeItem === 'My Income' ? 'active-item' : ''}` }
            onClick={ () => handleMenuItemClick('My Income', 'income') }
          >
            <span className="menu-icon">
              <img src="/assets/icons/my_income.svg" alt="My Income" />
            </span>
            <span className="menu-title">My Income</span>
          </li>
          <li
            className={ `menu-item ${activeItem === 'Wallet' ? 'active-item' : ''}` }
            onClick={ () => handleMenuItemClick('Wallet', 'wallet') }
          >
            <span className="menu-icon">
              <img src="/assets/icons/wallet.svg" alt="Wallet" />
            </span>
            <span className="menu-title">Wallet</span>
          </li>
          <li
            className={ `menu-item ${activeItem === 'Transaction' ? 'active-item' : ''}` }
            onClick={ () => handleMenuItemClick('Transaction', 'transaction') }
          >
            <span className="menu-icon">
              <img src="/assets/icons/transactions.svg" alt="Transaction" />
            </span>
            <span className="menu-title">Transaction</span>
          </li>
          {
            role === 'admin' && (
              <ul>
                <li
                  className={ `menu-item ${activeItem === 'Pending Requests' ? 'active-item' : ''}` }
                  onClick={ () => handleMenuItemClick('Pending Requests', 'pending/requests') }
                >
                  <span className="menu-icon">
                    <img src="/assets/icons/pending_request.svg" alt="Transaction" />
                  </span>
                  <span className="menu-title">Pending Request</span>
                </li>

                <li
                  className={ `menu-item ${activeItem === 'Pending Queries' ? 'active-item' : ''}` }
                  onClick={ () => handleMenuItemClick('Pending Queries', 'pending/queries') }
                >
                  <span className="menu-icon">
                    <img src="/assets/icons/pending_request.svg" alt="Transaction" />
                  </span>
                  <span className="menu-title">Pending Queries</span>
                </li>
              </ul>
            )
          }

        </ul>
      </div>

      <div className="row-2">
        <hr />
        <ul>
          {
            role === 'user' && (
              <li className="menu-item" onClick={ () => navigate('/user/dashboard/raiseticket') }>
                <span className="menu-icon">
                  <img src="/assets/icons/help.svg" alt="Help" />
                </span>
                <span className="menu-title">Raise a ticket</span>
              </li>
            )
          }
          <li className="menu-item">
            <span className="menu-icon">
              <img src="/assets/icons/logout.svg" alt="Log Out" />
            </span>
            <button className="menu-title" onClick={ handleLogout }>Log Out</button>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default Sidebar