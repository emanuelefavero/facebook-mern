import { useContext, useRef, useEffect, useState } from 'react'

// IMPORT INTERFACES
import FriendRequestInterface from '../interfaces/FriendRequestInterface'
import UserInterface from '../interfaces/UserInterface'

// IMPORT COMPONENTS
import GetUserLinkById from './GetUserLinkById'

// IMPORT CONTEXT
import FriendRequestContext from '../context/FriendRequestContext'

interface Props {
  friendRequests: FriendRequestInterface[] | []
  user: UserInterface | null
}

function FriendRequests({ friendRequests, user }: Props) {
  const { acceptFriendRequest, declineFriendRequest } =
    useContext(FriendRequestContext)

  // check if user has any friend requests (via friendRequests ul element textContent)
  const ulRef = useRef<HTMLUListElement | null>(null)
  const [userHasFriendsRequests, setUserHasFriendsRequests] = useState(false)

  useEffect(() => {
    if (ulRef?.current?.textContent === '') {
      setUserHasFriendsRequests(false)
    } else {
      setUserHasFriendsRequests(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h2>Friend Requests</h2>
      {userHasFriendsRequests ? null : <div>No requests</div>}
      <ul ref={ulRef}>
        {friendRequests.map((friendRequest) => {
          // Check if friend request is not from user and its to user
          return friendRequest.from !== user?._id &&
            friendRequest.to === user?._id ? (
            <li key={friendRequest._id}>
              <>
                <div>
                  <GetUserLinkById id={friendRequest.from as string} />
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
