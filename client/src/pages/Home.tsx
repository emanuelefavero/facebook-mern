import { useContext, useEffect } from 'react'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import FriendRequestContext from '../context/FriendRequestContext'

// IMPORT COMPONENTS
import FindNewFriends from '../components/FindNewFriends'
import GetUsernameById from '../components/GetUsernameById'

function Home() {
  const { user, getUser, userFriends, getUserFriends } = useContext(UserContext)
  const {
    getFriendRequests,
    friendRequests,
    acceptFriendRequest,
    declineFriendRequest,
  } = useContext(FriendRequestContext)

  useEffect(() => {
    getUser()
    getUserFriends(user?.username as string)
    getFriendRequests()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1>Hello {user?.username}</h1>
      <FindNewFriends />
      <h2>Friends</h2>

      {userFriends.length > 0 ? (
        userFriends.map((friend) => (
          <div key={friend._id}>
            <GetUsernameById id={friend._id} />
          </div>
        ))
      ) : (
        <p>You have no friends</p>
      )}

      <h2>Friend Requests</h2>
      <ul>
        {friendRequests.map((friendRequest) => {
          return friendRequest.from !== user?._id &&
            friendRequest.to === user?._id ? (
            <li key={friendRequest._id}>
              <>
                <div>
                  {<GetUsernameById id={friendRequest.from as string} />} wants
                  to be friends with you
                </div>
                <button
                  onClick={() => {
                    acceptFriendRequest(friendRequest._id as string)
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    declineFriendRequest(friendRequest._id as string)
                  }}
                >
                  Decline
                </button>
              </>
            </li>
          ) : null
        })}
      </ul>
    </div>
  )
}

export default Home
