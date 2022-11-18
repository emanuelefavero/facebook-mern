import { v4 as uuidv4 } from 'uuid'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import FriendRequestContext from '../context/FriendRequestContext'

function UserDetail() {
  const {
    otherUser,
    getOtherUserByUsername,
    user,
    getUser,
    userFriends,
    getUserFriends,
  } = useContext(UserContext)

  const { createFriendRequest, getFriendRequests } =
    useContext(FriendRequestContext)

  const { username } = useParams()

  useEffect(() => {
    getUser()
    getOtherUserByUsername(username as string)
    getFriendRequests()
    getUserFriends(user?.username as string)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isFriend, setIsFriend] = useState(false)

  // check if user is already friends with other user
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

  return (
    <>
      {otherUser?.username ? (
        <>
          <h2>{otherUser.username}</h2>

          {/* If user is already friend with other user, hide button */}
          {isFriend ? (
            <p>{otherUser?.username} is your friend</p>
          ) : (
            <button
              onClick={() => {
                createFriendRequest({
                  _id: uuidv4(),
                  // TIP: We will pass the user and other user usernames and those will be used in the backend to find both users and add those users to the friend request
                  from: user?.username as string,
                  to: otherUser?.username as string,
                })
              }}
              // TODO: sDisable the button if the user is already friends with the other user or if a friend request has already been sent
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
