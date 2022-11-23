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
        {user?.username ? (
          <>
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
