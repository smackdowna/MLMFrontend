import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPassword } from '../api/auth/index';
import Loader from '../components/common/Loader';

import '../styles/auth.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  const initialFormValues = {
    email: '',
    password: ''
  }

  const [formValues, setFormValues] = useState(initialFormValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    forgotPassword(formValues).then(response => {
      if (response.success) {
        toast.success('Link sent to email');
        setIsLoading(false);
        navigate('/new/password', { replace: true });
      }
    }).catch(error => {
      toast.error(error.data.message);
      setIsLoading(false);
    })
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <header className='auth-header'>
          <img className="auth-logo" src="/श्री धाम गौशाला_Logo.svg" alt="Logo" onClick={() => navigate('/', {replace: true})}/>
          <h1 className='auth-title'>Welcome to shridham</h1>
        </header>
        <main className='auth-body'>
          <div className="auth-body-header">
            <h2 className='auth-subtitle'>Forgot Password</h2>
            <p className='auth-content'>Enter details to Reset your password:</p>
          </div>

          <form className='auth-form' autoComplete='false' onSubmit={ handleSubmit }>
            <input
              type="email"
              id="email"
              name='email'
              value={ formValues.email }
              onChange={ handleChange }
              placeholder='Enter Email'
            />
            <button type='submit' className='btn btn-filled'>
              { isLoading ? <Loader height={ '40px' } width={ '100px' } colour={ '#ffffff' } /> : 'SUBMIT' }
            </button>
          </form>

          <div className="auth-already-account">
            <p className='auth-content'>
              Already have an account?
              <Link to='/login'> Login</Link>
            </p>
          </div>

          <div className="auth-footer">
            <p className='auth-content'>Don't have an account?
              <Link to='/register'> Register</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ForgotPassword;