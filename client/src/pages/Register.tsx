import { useContext, useEffect } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import UserContext from '../context/UserContext'

function Register() {
  const {
    user,
    registerUsername,
    setRegisterUsername,
    registerPassword,
    setRegisterPassword,
    register,
    getUser,
  } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (user?.username && window.location.pathname === '/register') {
    return <Navigate to='/' replace />
  } else {
    return (
      <div>
        <header>Join Facebook</header>
        <h1>Choose a username: </h1>
        <p>Enter a unique username to use on our site.</p>
        <label htmlFor='username'>Username</label>
        <input
          name='username'
          type='text'
          placeholder='Username'
          onChange={(e) => setRegisterUsername(e.target.value)}
          value={registerUsername}
        />
        <label htmlFor='username'>Password</label>
        <input
          name='password'
          type='text'
          placeholder='Password'
          onChange={(e) => setRegisterPassword(e.target.value)}
          value={registerPassword}
        />
        <button
          onClick={() => {
            register()
            navigate('/')
          }}
        >
          Register
        </button>
        <div>
          <br />
          or
          <br />
        </div>
        <Link to='/login'>Login</Link>
      </div>
    )
  }
}

export default Register
