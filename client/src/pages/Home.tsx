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

      {/* BEWARE: Start from OtherUserDetail.tsx (create friend request) */}

      {/* 2. */}
      {/* TODO: Insert get friend requests here (UserContext) and add accept and decline methods under each request */}

      <h2>Friend Requests</h2>
      {/* Display friend requests */}
      <ul>
        {friendRequests.map((friendRequest) => {
          return friendRequest.from === user?._id ? (
            <li key={friendRequest._id}>
              <>
                {<GetUsernameById id={friendRequest.from as string} />} wants to
                be friends with{' '}
                {<GetUsernameById id={friendRequest.to as string} />}
              </>
            </li>
          ) : null
        })}
      </ul>

      <ul>
        {userFriends.map((friend) => {
          return <li key={friend.username}>{friend.username}</li>
        })}
      </ul>
    </div>
  )
}

export default Home
