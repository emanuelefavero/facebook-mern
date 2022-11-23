import { useContext } from 'react'

// IMPORT INTERFACES
import FriendRequestInterface from '../interfaces/FriendRequestInterface'
import UserInterface from '../interfaces/UserInterface'

// IMPORT COMPONENTS
import GetUserById from './GetUserById'

// IMPORT CONTEXT
import FriendRequestContext from '../context/FriendRequestContext'

interface Props {
  friendRequests: FriendRequestInterface[] | []
  user: UserInterface | null
}

function FriendRequests({ friendRequests, user }: Props) {
  const { acceptFriendRequest, declineFriendRequest } =
    useContext(FriendRequestContext)

  return (
    <>
      <h2>Friend Requests</h2>
      <ul>
        {friendRequests.map((friendRequest) => {
          // Check if friend request is not from user and its to user
          return friendRequest.from !== user?._id &&
            friendRequest.to === user?._id ? (
            <li key={friendRequest._id}>
              <>
                <div>
                  <GetUserById id={friendRequest.from as string} />
                  wants to be friends with you
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
    </>
  )
}

export default FriendRequests
