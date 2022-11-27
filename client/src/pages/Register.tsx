import styles from './Register.module.css'
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
      <div className={styles.register}>
        <header>Join Facebook</header>
        <h2>Choose a username and password: </h2>
        <p>Enter a unique username to use on our site.</p>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor='username'>Username</label>
            <input
              name='username'
              type='text'
              onChange={(e) => setRegisterUsername(e.target.value)}
              value={registerUsername}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='text'
              onChange={(e) => setRegisterPassword(e.target.value)}
              value={registerPassword}
            />
          </div>
        </div>
        <button
          onClick={() => {
            register()
            navigate('/')
          }}
        >
          Join
        </button>
        <div className={styles.linkContainer}>
          <Link to='/login'>Already have an account?</Link>
        </div>
      </div>
    )
  }
}

export default Register
