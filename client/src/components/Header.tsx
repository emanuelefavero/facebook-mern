import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'

function Header() {
  const { user, getUser, logout } = useContext(UserContext)

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <header>
        <div>
          <span>
            <Link to='/'>Facebook</Link>
          </span>

          {user?.username ? (
            <>
              <button
                onClick={() => {
                  logout()
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <nav>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
