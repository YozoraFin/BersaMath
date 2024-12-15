import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/fontawesome-free-solid'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/Api'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hidePassword, sethidePassword] = useState(true)
  const navigate = useNavigate()

  const login = (e) => {
    e.preventDefault()

    const data = {
      identifier: username,
      password: password
    }

    api.post(process.env.REACT_APP_BASEURL + 'api/v1/auth/teacher/login', data).then((res) => {
      if(res.status === 200) {
        localStorage.setItem('Token', res.data?.data.tokens.accessToken)
        localStorage.setItem('RefreshToken', res.data?.data.tokens.refreshToken)
        localStorage.setItem('name', res.data?.data.teacher.name)
        navigate('/bersamath')
      }
    })
  }

  return (
    <div className='login'>
      <div className="login-card m-auto d-flex flex-column">
        <div className="card-header text-center">
          <h2 className='py-4'>Bersamath</h2>
        </div>
        <div className="card-body w-100 text-center">
          <h4 className='my-3'>Masuk</h4>
          <div className="form-box email mx-auto mt-4 py-2"> 
            <input value={username} onChange={e => setUsername(e.target.value)} name='email' type="text" className="login-form" />
            <label className={username === '' ? '' : 'filled'} htmlFor="email">Email/No. Telp</label>
          </div>
          <div className="form-box password mx-auto mt-4 py-2"> 
            <input value={password} onChange={e => setPassword(e.target.value)} name='password' type={hidePassword ? 'password' : 'text'} className="login-form" />
            <label className={password === '' ? '' : 'filled'} htmlFor="password">Password</label>
            <FontAwesomeIcon onClick={() => sethidePassword(!hidePassword)} type='button' color='#4A628A' className='password-toggle' icon={hidePassword ? faEye : faEyeSlash} />
          </div>
        </div>
        <div className="border-bottom"></div>
        <div className="card-footer d-flex flex-fill justify-content-end align-items-center align-self-center">
          <button onClick={login} className='btn'>
            Masuk
          </button>
        </div>
      </div>
    </div>
  )
}
