import styles from './Login.module.css'
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
      <section className={styles.login}>
        <Link className={styles.logo} to='/'>
          facebook
        </Link>
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
          Log in
        </button>
        <div className={styles.orSection}>
          <hr />
          <span className={styles.or}>or</span>
          <hr />
        </div>
        <Link className={styles.registerButton} to='/register'>
          Create new account
        </Link>
      </section>
    )
  }
}

export default Login
