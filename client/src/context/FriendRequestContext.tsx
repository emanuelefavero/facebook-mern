import React, { useState, createContext } from 'react'
import axios from 'axios'
import { baseURL } from '../axiosConfig'

// IMPORT INTERFACES
import FriendRequestInterface from '../interfaces/FriendRequestInterface'

axios.defaults.baseURL = baseURL

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

  // POST: Create friend request
  const createFriendRequest = async (friendRequest: FriendRequestInterface) => {
    try {
      const response = await axios.post('/api/friend-request', friendRequest)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // PUT: Accept friend request
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

  // DELETE: Decline friend request
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

  // GET: Get friend requests
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
