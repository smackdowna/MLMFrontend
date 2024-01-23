import React, { useState } from 'react'
import '../styles/auth.css'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth/index';
import { toast } from 'react-toastify';
import { removeToken, removeUser, setToken, setUser } from '../utils/localStorage';
import { useDispatch } from 'react-redux';
import { userReducer, tokenReducer } from '../storage/slices/authSlice';
// import Cookies from 'js-cookie';
import Loader from '../components/common/Loader';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      email: formValues['email'],
      password: formValues['password'],
    }

    login(payload)
      .then((response) => {
        toast.success('Login Successfull ✌️');
        removeUser();
        removeToken();
        setIsLoading(false);
        const userToken = response?.token;
        const userData = response?.user;

        setUser(userData);
        setToken(userToken);
        dispatch(userReducer(userData));
        dispatch(tokenReducer(userToken));

        // Cookies.set('token', userToken);

        if (response?.user?.role === 'user') {
          navigate('/user/dashboard');
        } else if (response?.user?.role === 'admin') {
          navigate('/admin/dashboard');
        }
      })
      .catch(error => {
        toast.error(error?.data?.message);
        setIsLoading(false);
      });
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
            <h2 className='auth-subtitle'>Login</h2>
            <p className='auth-content'>Enter your details to Login:</p>
          </div>

          <form name="loginForm" className='auth-form' autoComplete='false' onSubmit={ handleSubmit }>
            <input
              type="email"
              id='email'
              name='email'
              placeholder='Enter Your Email'
              value={ formValues.email }
              onChange={ handleChange }
              required
            />
            <input
              type="password"
              id='password'
              name='password'
              placeholder='Enter Password'
              value={ formValues.password }
              onChange={ handleChange }
              required
            />
            <button type='submit' className='btn btn-filled'>
              { isLoading ? <Loader height={ '40px' } width={ '100px' } colour={ '#ffffff' } /> : 'Login' }
            </button>
          </form>

          <div className="auth-forgot">
            <Link to='/reset/password'>Forgot Password ?</Link>
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

export default Login