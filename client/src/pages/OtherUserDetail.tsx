import { v4 as uuidv4 } from 'uuid'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import FriendRequestContext from '../context/FriendRequestContext'

// TODO: Add user profile picture, user posts

function UserDetail() {
  const {
    otherUser,
    getOtherUserByUsername,
    user,
    getUser,
    userFriends,
    getUserFriends,
    userFriendRequests,
    getUserFriendRequests,
  } = useContext(UserContext)

  const { createFriendRequest, getFriendRequests } =
    useContext(FriendRequestContext)

  const { username } = useParams()

  useEffect(() => {
    getUser()
    getOtherUserByUsername(username as string)
    getFriendRequests()
    getUserFriends(user?.username as string)
    getUserFriendRequests(user?.username as string)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // check if user is already friends with other user
  const [isFriend, setIsFriend] = useState(false)
  useEffect(() => {
    setIsFriend(false)
    if (userFriends.length > 0) {
      userFriends.forEach((friend) => {
        if (friend._id === otherUser?._id) {
          setIsFriend(true)
        }
      })
    }
  }, [userFriends, otherUser])

  // check if user has already sent a friend request to other user
  const [hasSentFriendRequest, setHasSentFriendRequest] = useState(false)
  useEffect(() => {
    setHasSentFriendRequest(false)
    if (userFriendRequests.length > 0) {
      userFriendRequests.forEach((friendRequest) => {
        if (friendRequest.to === otherUser?._id) {
          setHasSentFriendRequest(true)
        }
      })
    }
  }, [userFriendRequests, otherUser])

  return (
    <>
      {otherUser?.username ? (
        <>
          <h2>{otherUser.username}</h2>

          {/* ADD FRIEND */}
          {/* If user is already friend with other user or if the friend request has already been sent, hide 'Add Friend' button */}
          {isFriend ? (
            <p>{otherUser?.username} is your friend</p>
          ) : hasSentFriendRequest ? (
            <p>You sent a friend request to {otherUser?.username}</p>
          ) : (
            <button
              onClick={() => {
                createFriendRequest({
                  _id: uuidv4(),
                  // TIP: We will pass the user and other user usernames and those will be used in the backend to find both users and add those users to the friend request
                  from: user?.username as string,
                  to: otherUser?.username as string,
                })
                window.location.reload()
              }}
            >
              Add Friend
            </button>
          )}
        </>
      ) : (
        <h2>User Not Found...</h2>
      )}
    </>
  )
}

export default UserDetail
