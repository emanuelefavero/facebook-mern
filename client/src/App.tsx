import styles from './App.module.css'
import { useContext, useEffect } from 'react'
import { UserProvider } from './context/UserContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import Components
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'

// Import Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import OtherUserDetail from './pages/OtherUserDetail'

// Import Context
import UserContext from './context/UserContext'

function App() {
  const { getUser } = useContext(UserContext)

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.App}>
      <UserProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              {/* HOME */}
              <Route
                path='/'
                element={
                  <ProtectedRoute redirectPath='/login'>
                    <Home />
                  </ProtectedRoute>
                }
              />

              {/* AUTH */}
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              {/* NOT FOUND */}
              <Route path='*' element={<NotFound />} />

              <Route path='/user/:username' element={<OtherUserDetail />} />
            </Routes>
          </main>
        </Router>
      </UserProvider>
    </div>
  )
}

export default App
