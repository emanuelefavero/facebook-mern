import { v4 as uuidv4 } from 'uuid'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import FriendRequestContext from '../context/FriendRequestContext'

function UserDetail() {
  const { otherUser, getOtherUserByUsername, user, getUser } =
    useContext(UserContext)

  const { createFriendRequest, getFriendRequests } =
    useContext(FriendRequestContext)

  const { username } = useParams()

  useEffect(() => {
    getUser()
    getOtherUserByUsername(username as string)
    getFriendRequests()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {user?.username}
      {otherUser?.username ? (
        <>
          <h2>{otherUser.username}</h2>

          <button
            onClick={() => {
              createFriendRequest({
                _id: uuidv4(),
                // TIP: We will pass the user and other user usernames and those will be used in the backend to find both users and add those users to the friend request
                from: user?.username as string,
                to: otherUser?.username as string,
              })
            }}
            // TODO: sDisable the button if the user is already friends with the other user (check if otherUser is in user.friends or friendRequests array)
          >
            Add Friend
          </button>
          {/* 1. */}
          {/* TODO: Add 'Request Friend' button here that will call createFriendRequest method (from FriendRequestContext). This method should pass { from: user.username and to: otherUser.username } as argument  */}
        </>
      ) : (
        <h2>User Not Found...</h2>
      )}
    </>
  )
}

export default UserDetail
