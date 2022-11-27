import styles from './Home.module.css'
import { useContext, useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'

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
      <h2 className={styles.username}>{user?.username}</h2>

      <div className={styles.showButtonsContainer}>
        {/* SHOW POSTS BUTTON */}
        <button
          onClick={() => {
            setShowPosts(true)
            setShowFriends(false)
          }}
          style={{
            borderBottom: showPosts
              ? '2px solid var(--color-home-show-button-active)'
              : 'none',
            color: showPosts
              ? 'var(--color-home-show-button-active)'
              : 'var(--color-home-show-button-inactive)',
          }}
        >
          <FontAwesomeIcon icon={faSquarePollHorizontal} />
        </button>

        {/* SHOW FRIENDS BUTTON */}
        <button
          onClick={() => {
            setShowFriends(true)
            setShowPosts(false)
          }}
          style={{
            borderBottom: showFriends
              ? '2px solid var(--color-home-show-button-active)'
              : 'none',
            color: showFriends
              ? 'var(--color-home-show-button-active)'
              : 'var(--color-home-show-button-inactive)',
          }}
        >
          <FontAwesomeIcon icon={faUserGroup} />
        </button>
      </div>

      {showPosts && (
        <>
          {/* POSTS */}
          <Posts />
        </>
      )}

      {showFriends && (
        <>
          {/* FRIEND REQUESTS */}
          <FriendRequests friendRequests={friendRequests} user={user} />

          {/* FRIENDS */}
          <Friends userFriends={userFriends} />
        </>
      )}
    </div>
  )
}

export default Home
