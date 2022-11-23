import styles from './App.module.css'
import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import Components
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Footer from './components/Footer'

// Import Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import OtherUserDetail from './pages/OtherUserDetail'
import SearchResults from './pages/SearchResults'

// Import Context Provider
import { UserProvider } from './context/UserContext'
import { FriendRequestProvider } from './context/FriendRequestContext'
import { SearchProvider } from './context/SearchContext'
import { PostsProvider } from './context/PostsContext'

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
      <Router>
        <UserProvider>
          <FriendRequestProvider>
            <PostsProvider>
              <SearchProvider>
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

                    {/* SEARCH */}
                    <Route path='/search' element={<SearchResults />} />

                    {/* OTHER USER DETAIL */}
                    <Route
                      path='/user/:username'
                      element={<OtherUserDetail />}
                    />
                  </Routes>
                </main>
                <Footer />
              </SearchProvider>
            </PostsProvider>
          </FriendRequestProvider>
        </UserProvider>
      </Router>
    </div>
  )
}

export default App
