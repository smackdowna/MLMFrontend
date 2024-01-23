/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import '../styles/auth.css'
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/common/Loader';

import { register } from '../api/auth';
import { useDispatch } from 'react-redux';
import { tokenReducer } from '../storage/slices/authSlice';
import { getToken, setToken } from '../utils/localStorage';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialFormValues = {
    referralId: '',
    name: '',
    position: '',
    email: '',
    mobileNo: '',
    country: '',
    password: '',
    confirmPassword: ''
  };

  const [formValues, setFormValues] = useState(initialFormValues);
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

  const handleAccountCreation = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      name: formValues['name'],
      email: formValues['email'],
      password: formValues['password'],
      cnfrmpassword: formValues['confirmPassword'],
      sponsor_id: formValues['referralId'],
      position: formValues['position'],
      own_id: formValues['mobileNo'],
      country: formValues['country'],
    }

    register(payload)
      .then(response => {
        if (response.success) {
          toast.success('Registered Successfull ✌️');
          const token = getToken();
          setToken(response.token);
          setIsLoading(false);

          dispatch(tokenReducer(token));
          navigate('/login');
        }
      })
      .catch(error => {
        console.log('error', error.data);
        toast.error(error.data.message);
        setIsLoading(false);
      });
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <header className='auth-header'>
          <img className="auth-logo" src="/श्री धाम गौशाला_Logo.svg" alt="Logo" onClick={() => navigate('/', {replace: true})} />
          <h1 className='auth-title'>Welcome to shridham</h1>
        </header>
        <main className='auth-body'>
          <div className="auth-body-header">
            <h2 className='auth-subtitle'>Sign Up</h2>
            <p className='auth-content'>Enter your details to create shridham goshala account:</p>
          </div>

          <form name="registrationForm" className='auth-form' autoComplete='false' onSubmit={ handleAccountCreation }>
            <input
              type="number"
              id="referralId"
              name="referralId"
              value={ formValues.referralId }
              onChange={ handleChange }
              placeholder='Enter Referral Id*'
              required
            />

            <input type="text"
              id='name'
              name='name'
              value={ formValues.name }
              onChange={ handleChange }
              placeholder='Enter Your name*'
              required
            />
            <select
              id='position'
              name='position'
              value={ formValues.position }
              onChange={ handleChange }
              required
            >
              <option value="" disabled>Select Position</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>

            <input
              type="email"
              id="email"
              name='email'
              value={ formValues.email }
              onChange={ handleChange }
              placeholder='Enter Email'
            />

            <input
              type="number"
              id="mobileNo"
              name='mobileNo'
              min="10"
              value={ formValues.mobileNo }
              onChange={ handleChange }
              placeholder='Enter Mobile No.*'
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
              { isLoading ? <Loader height={ '40px' } width={ '100px' } colour={ '#ffffff' } /> : 'Create an Account' }
            </button>
          </form>

          <div className="auth-footer">
            <p className='auth-content'>Already have an account?
              <Link to='/login'> Login</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Register