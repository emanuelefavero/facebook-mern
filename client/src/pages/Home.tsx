import { useContext, useEffect } from 'react'

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

  return (
    <div>
      {/* PROFILE PICTURE */}
      <ProfilePicture user={user} />

      {/* GREET USER */}
      <h1>Hello {user?.username}</h1>

      {/* SEARCH */}
      <SearchInput />

      {/* FRIENDS */}
      <Friends userFriends={userFriends} />

      {/* FRIEND REQUESTS */}
      <FriendRequests friendRequests={friendRequests} user={user} />

      {/* POSTS */}
      <Posts />
    </div>
  )
}

export default Home
