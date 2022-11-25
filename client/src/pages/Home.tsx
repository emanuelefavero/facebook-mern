import styles from './Home.module.css'
import { useContext, useEffect, useState } from 'react'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import FriendRequestContext from '../context/FriendRequestContext'

// IMPORT COMPONENTS
import SearchInput from '../components/SearchInput'
import Posts from '../components/Posts'
import ProfilePicture from '../components/ProfilePicture'
import Friends from '../components/Friends'
import FriendRequests from '../components/FriendRequests'

function Home() {
  const { user, getUser, userFriends, getUserFriends } = useContext(UserContext)
  const { getFriendRequests, friendRequests } = useContext(FriendRequestContext)

  useEffect(() => {
    getUser()
    getUserFriends(user?.username as string)
    getFriendRequests()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [showPosts, setShowPosts] = useState(true)
  const [showFriends, setShowFriends] = useState(false)

  return (
    <div className={styles.home}>
      {/* SEARCH */}
      <SearchInput />

      {/* PROFILE PICTURE */}
      <ProfilePicture user={user} />

      {/* GREET USER */}
      <h2>{user?.username}</h2>

      <hr className={styles.divider} />

      {/* SHOW POSTS BUTTON */}
      <button
        onClick={() => {
          setShowPosts(true)
          setShowFriends(false)
        }}
        style={{
          borderBottom: showPosts ? '2px solid blue' : 'none',
        }}
      >
        Show Posts
      </button>

      {/* SHOW FRIENDS BUTTON */}
      <button
        onClick={() => {
          setShowFriends(true)
          setShowPosts(false)
        }}
        style={{
          borderBottom: showFriends ? '2px solid blue' : 'none',
        }}
      >
        Show Friends
      </button>

      {showFriends && (
        <>
          {/* FRIEND REQUESTS */}
          <FriendRequests friendRequests={friendRequests} user={user} />

          {/* FRIENDS */}
          <Friends userFriends={userFriends} />
        </>
      )}

      {showPosts && (
        <>
          {/* POSTS */}
          <Posts />
        </>
      )}
    </div>
  )
}

export default Home
