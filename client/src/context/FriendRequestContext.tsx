import React, { useState, createContext } from 'react'
import axios from 'axios'

// IMPORT INTERFACES
import FriendRequestInterface from '../interfaces/FriendRequestInterface'

axios.defaults.baseURL = 'http://localhost:4000'

// CONTEXT
const FriendRequestContext = createContext({
  friendRequests: [] as FriendRequestInterface[] | [],
  setFriendRequests: (friendRequests: FriendRequestInterface[]) => {},

  createFriendRequest: (friendRequest: FriendRequestInterface) => {},
  acceptFriendRequest: (friendRequestId: string) => {},
  declineFriendRequest: (friendRequestId: string) => {},

  getFriendRequests: () => {},
})

export function FriendRequestProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [friendRequests, setFriendRequests] = useState<
    FriendRequestInterface[] | []
  >([])

  // Create a friend request using an axios post request to this url: '/api/friend-request'
  // The friend request object is added to the database and the friend request is returned.
  // Log the returned friend request to the console.
  const createFriendRequest = async (friendRequest: FriendRequestInterface) => {
    try {
      const response = await axios.post('/api/friend-request', friendRequest)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Accept a friend request using an axios put request to this url: '/api/friend-request/:id'
  // The friend request object is updated in the database and the friend request is returned.
  // Log the returned friend request to the console.
  const acceptFriendRequest = async (friendRequestId: string) => {
    try {
      const response = await axios.put(
        `/api/friend-request/${friendRequestId}`,
        friendRequestId
      )
      console.log(response.data)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  // Decline a friend request using an axios delete request to this url: '/api/friend-request/:id'
  // The friend request object is deleted from the database and the friend request is returned.
  // Log the returned friend request to the console.
  const declineFriendRequest = async (friendRequestId: string) => {
    try {
      const response = await axios.delete(
        `/api/friend-request/${friendRequestId}`
      )
      console.log(response.data)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  // Get all friend requests using an axios get request to this url: '/api/friend-request'
  // The friend requests are returned.
  // Log the returned friend requests to the console.
  const getFriendRequests = async () => {
    try {
      const response = await axios.get('/api/friend-request')
      setFriendRequests(response.data)
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <FriendRequestContext.Provider
      value={{
        friendRequests,
        setFriendRequests,

        createFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,

        getFriendRequests,
      }}
    >
      {children}
    </FriendRequestContext.Provider>
  )
}

export default FriendRequestContext
