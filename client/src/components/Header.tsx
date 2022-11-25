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
      <header>
        {user?.username ? (
          <>
            {/* BACK BUTTON */}
            {window.location.pathname !== '/' && (
              <button
                onClick={() => {
                  navigate(-1)
                }}
              >
                {'<'}
              </button>
            )}

            <span>
              <Link to='/'>Facebook</Link>
            </span>
            <button
              onClick={() => {
                logout()
              }}
            >
              Logout
            </button>
          </>
        ) : null}
      </header>
    </>
  )
}

export default Header
