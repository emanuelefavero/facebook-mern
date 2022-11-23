import { useContext, useEffect } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import UserContext from '../context/UserContext'

function Login() {
  const {
    user,
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    login,
    getUser,
  } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (user?.username && window.location.pathname === '/login') {
    return <Navigate to='/' replace />
  } else {
    return (
      <>
        <div>
          <h1>Facebook</h1>
          <input
            type='text'
            placeholder='Username'
            onChange={(e) => setLoginUsername(e.target.value)}
            value={loginUsername}
          />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => setLoginPassword(e.target.value)}
            value={loginPassword}
          />
          <button
            onClick={async () => {
              await login()
              navigate('/')
            }}
          >
            Login
          </button>
          <div>
            <br />
            or
            <br />
          </div>
          <Link to='/register'>Create new account</Link>
        </div>
      </>
    )
  }
}

export default Login
