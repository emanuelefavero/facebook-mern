import { useContext, useEffect } from 'react'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import FriendRequestContext from '../context/FriendRequestContext'

// IMPORT COMPONENTS
import FindNewFriends from '../components/FindNewFriends'
import GetUsernameById from '../components/GetUsernameById'

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
      <h1>Home</h1>
      <FindNewFriends />
      <h2>Friends</h2>
      {/* TODO: AFTER friend requests, Insert friend here (UserContext) */}
      {/* 2. */}
      {/* TODO: add accept and decline methods under each request */}

      <h2>Friend Requests</h2>
      {/* Display friend requests */}
      <ul>
        {friendRequests.map((friendRequest) => {
          return friendRequest.from !== user?._id &&
            friendRequest.to === user?._id ? (
            <li key={friendRequest._id}>
              <>
                {<GetUsernameById id={friendRequest.from as string} />} wants to
                be friends with you
              </>
            </li>
          ) : null
        })}
      </ul>
    </div>
  )
}

export default Home
