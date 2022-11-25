import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'

function Header() {
  const navigate = useNavigate()
  const { user, getUser, logout } = useContext(UserContext)

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {user?.username ? (
        <header className={styles.header}>
          <>
            {/* BACK BUTTON */}
            {window.location.pathname !== '/' && (
              <button
                className={styles.backButton}
                onClick={() => {
                  navigate(-1)
                }}
              >
                {'<'}
              </button>
            )}

            {/* LOGO */}
            <Link className={styles.logo} to='/'>
              Facebook
            </Link>

            {/* LOGOUT BUTTON */}
            <button
              className={styles.logoutButton}
              onClick={() => {
                logout()
              }}
            >
              Logout
            </button>
          </>
        </header>
      ) : null}
    </>
  )
}

export default Header
