import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard.css'
import { getUser } from '../../utils/localStorage';

const Error = () => {
  const navigate = useNavigate();
  const user = getUser()

  const goHome = () => {
    if (user) {

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'user') {
        navigate('/user/dashboard');
      }
    }
    else {
      navigate('/login')
    }
  }

  return (
    <div
      style={ {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      } }
    >
      <h1 className='error-content'>
        No page available for this route
      </h1>
      <button style={ {
        padding: '10px',
      } }
        onClick={ goHome }>
        Go Home
      </button>
    </div>
  )
}

export default Error