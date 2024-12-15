import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/fontawesome-free-solid'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../api/auth'

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hidePassword, sethidePassword] = useState(true)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(
        formData.identifier, 
        formData.password
      );

      const { tokens, teacher } = response.data;

      localStorage.setItem('Token', tokens.accessToken);
      localStorage.setItem('RefreshToken', tokens.refreshToken);
      localStorage.setItem('name', teacher.name);
      localStorage.setItem('course', teacher.course);
      localStorage.setItem('role', teacher.role);

      navigate('/bersamath');
    } catch (error) {
      setError(error.message || 'Login Gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      <div className="login-card m-auto d-flex flex-column">
        <div className="card-header text-center">
          <h2 className='py-4'>Bersamath</h2>
        </div>
        <div className="card-body w-100 text-center">
          <h4 className='my-3'>Masuk</h4>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-box email mx-auto mt-4 py-2">
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className="login-form"
                required
              />
              <label className={formData.identifier ? 'filled' : ''}>
                Email/No. Telp
              </label>
            </div>
            <div className="form-box password mx-auto mt-4 py-2">
              <input
                type={hidePassword ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="login-form"
                required
              />
              <label className={formData.password ? 'filled' : ''}>
                Password
              </label>
              <FontAwesomeIcon onClick={() => sethidePassword(!hidePassword)} type='button' color='#4A628A' className='password-toggle' icon={hidePassword ? faEye : faEyeSlash} />
            </div>
            <div className="border-bottom"></div>
            <div className="card-footer d-flex flex-fill justify-content-end align-items-center align-self-center">
            <button 
              type="submit" 
              className="btn"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Masuk'}
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
