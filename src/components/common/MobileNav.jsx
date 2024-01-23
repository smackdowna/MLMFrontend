import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../api/auth';

import '../../styles/dashboard.css';
import { getUser, removeToken, removeUser } from '../../utils/localStorage';
import Cookies from 'js-cookie';

const MobileNav = ({ menu_active }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { role, name } = getUser();

  useEffect(() => {
    setIsMenuOpen(menu_active)
  }, [menu_active])

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <div className={ isMenuOpen ? 'mobile-nav-content' : 'none' }>
      <ul>
        <li className="menu-item">
          <span className="menu-icon">
            <img src="/assets/images/profile.svg" alt="Profile" />
          </span>
          <span className="menu-title">{name}</span>
        </li>
        <hr style={ { width: '80%', margin: 'auto' } } />
        {
          role === 'user' && (
            <li className="menu-item" onClick={() => navigate('/user/dashboard/raiseticket')}>
              <span className="icon menu-icon">
                <img src="/assets/icons/help.svg" alt="Help" />
              </span>
              <span className="sub-title menu-title">Raise a ticket</span>
            </li>
          )
        }
        <li className="menu-item">
          <span className="icon menu-icon">
            <img src="/assets/icons/logout.svg" alt="Log Out" />
          </span>
          <button className="sub-title menu-title" onClick={ handleLogout }>Log Out</button>
        </li>
      </ul>

    </div>
  )
}

export default MobileNav