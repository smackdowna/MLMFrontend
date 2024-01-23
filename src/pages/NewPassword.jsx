import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import '../styles/auth.css'
import { toast } from 'react-toastify';
import { forgotPassword } from '../api/auth/index';
import Loader from '../components/common/Loader';

const NewPassword = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [cnfPswd, setCnfPswd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckPassword = () => {
    if (formValues.password !== formValues.confirmPassword) {
      setCnfPswd(true);
    } else {
      setCnfPswd(false);
    }
  }

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

    if (formValues.password === formValues.confirmPassword) {
      const payload = {
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword
      }
      forgotPassword(payload)
        .then(response => {
          if (response.success) {
            toast.success('Reset Password Successfully !!')
            setFormValues({});
            setIsLoading(false);
            navigate('/login');
          }
        })
        .catch((error) => {
          console.log('error', error);
          toast.error(error?.data?.message);
          setFormValues({});
          setIsLoading(false);
        })
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <header className='auth-header'>
          <img className="auth-logo" src="/श्री धाम गौशाला_Logo.svg" alt="Logo" />
          <h1 className='auth-title'>Welcome to shridham</h1>
        </header>
        <main className='auth-body'>
          <div className="auth-body-header">
            <h2 className='auth-subtitle'>Forgot Password</h2>
            <p className='auth-content'>Enter details to Reset your password:</p>
          </div>

          <form name="resetPasswordForm" className='auth-form' autoComplete='false' onSubmit={ handleSubmit }>
            <input
              type="email"
              id="email"
              name='email'
              value={ formValues.email }
              onChange={ handleChange }
              placeholder='Enter Email'
              required
            />

            <input
              type="password"
              id="password"
              name="password"
              value={ formValues.password }
              onChange={ handleChange }
              min="8"
              max="9"
              placeholder='Enter Password*'
              required
            />

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={ formValues.confirmPassword }
              onChange={ handleChange }
              onBlur={ handleCheckPassword }
              min="8"
              max="9"
              placeholder='Confirm Password*'
              required
            />
            { cnfPswd ? <p style={ { marginBottom: '10px', color: 'red' } }>Password do not match!! </p> : '' }

            <button type='submit' className='btn btn-filled'>
              { isLoading ? <Loader height={ '40px' } width={ '100px' } colour={ '#ffffff' } /> : 'SUBMIT' }</button>
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

export default NewPassword;