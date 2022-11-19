import { useContext, useEffect } from 'react'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import FriendRequestContext from '../context/FriendRequestContext'

// IMPORT COMPONENTS
import GetUsernameById from '../components/GetUsernameById'
import SearchInput from '../components/SearchInput'
import Posts from '../components/Posts'

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
      {/* GREET USER */}
      <h1>Hello {user?.username}</h1>

      {/* SEARCH */}
      <SearchInput />

      {/* FRIENDS */}
      <h2>Friends</h2>

      {userFriends.length > 0 && (
        <h3>
          You have {userFriends.length.toString()} friend
          {userFriends.length > 1 && 's'}
        </h3>
      )}

      {userFriends.length > 0 ? (
        userFriends.map((friend) => (
          <div key={friend._id}>
            <GetUsernameById id={friend._id} />
          </div>
        ))
      ) : (
        <p>You have no friends</p>
      )}

      {/* FRIEND REQUESTS */}
      <h2>Friend Requests</h2>
      <ul>
        {friendRequests.map((friendRequest) => {
          // Check if friend request is not from user and its to user
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

      {/* POSTS */}
      <Posts />
    </div>
  )
}

export default Home
