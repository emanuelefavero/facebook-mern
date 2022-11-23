import React, { useState, createContext } from 'react'
import axios from 'axios'
import type { AxiosError } from 'axios'
import { baseURL } from '../axiosConfig'

// IMPORT INTERFACES
import UserInterface from '../interfaces/UserInterface'
import FriendRequestInterface from '../interfaces/FriendRequestInterface'

axios.defaults.baseURL = baseURL

// CONTEXT
const UserContext = createContext({
  user: {} as UserInterface | null,
  otherUser: {} as UserInterface | null,
  registerUsername: '',
  setRegisterUsername: (username: string) => {},
  registerPassword: '',
  setRegisterPassword: (password: string) => {},
  userFriends: [] as UserInterface[] | [],
  setUserFriends: (friends: UserInterface[]) => {},
  userFriendRequests: [] as FriendRequestInterface[] | [],
  setUserFriendRequests: (friendRequests: FriendRequestInterface[]) => {},

  loginUsername: '',
  setLoginUsername: (username: string) => {},
  loginPassword: '',
  setLoginPassword: (password: string) => {},

  register: () => {},
  login: () => {},
  logout: () => {},
  getUser: () => {},
  getOtherUserByUsername: (username: string) => {},
  getUserFriends: (username: string) => {},
  getUserFriendRequests: (username: string) => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  // STATE
  const [user, setUser] = useState<UserInterface | null>(null)
  const [otherUser, setOtherUser] = useState<UserInterface | null>(null)

  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [userFriends, setUserFriends] = useState<UserInterface[] | []>([])
  const [userFriendRequests, setUserFriendRequests] = useState<
    FriendRequestInterface[] | []
  >([])

  // POST: Register user
  const register = async () => {
    try {
      axios({
        method: 'POST',
        data: {
          username: registerUsername,
          password: registerPassword,
        },
        withCredentials: true,
        url: '/api/register',
      }).then((res) => {
        console.log(res.data.message)
      })
    } catch (error) {
      const err = error as AxiosError
      console.log(err.response?.status) // the HTTP status code
      console.log(err.response?.data) // the actual body of the response
      // console.error(error)
    }
  }

  // POST: Login user
  const login = async () => {
    await axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: '/api/login',
    })
      .then((res) => {
        // console.log(res.data.message)

        getUser()
      })
      .catch((err) => {
        console.log(err.response?.data.message)
      })
  }

  // GET: Logout user
  const logout = async () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: '/api/logout',
    })
      .then((res) => {
        setUser(null)
        // console.log(res.data.message)
      })
      .catch((err) => {
        console.log(err.response?.data.message)
      })
  }

  // GET user from localStorage
  const getUser = async () => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: '/api/user',
    })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user)
        } else {
          setUser(null)
        }
      })
      .catch((err) => {
        console.log(err.response?.data.message)
      })
  }

  // GET other user by username
  const getOtherUserByUsername = async (username: string) => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: `/api/user/${username}`,
    })
      .then((res) => {
        if (res.data.user) {
          setOtherUser(res.data.user)
        } else {
          setOtherUser(null)
        }
      })
      .catch((err) => {
        console.log(err.response?.data.message)
      })
  }

  // GET user friends - /api/user/:username/friends
  const getUserFriends = async (username: string) => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: `/api/user/${username}/friends`,
    })
      .then((res) => {
        if (res.data.friends) {
          setUserFriends(res.data.friends)
        } else {
          setUserFriends([])
        }
      })
      .catch((err) => {
        console.log(err.response?.data.message)
      })
  }

  // GET user friend requests - /api/user/:username/friend-requests
  const getUserFriendRequests = async (username: string) => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: `/api/user/${username}/friend-requests`,
    })
      .then((res) => {
        if (res.data.friendRequests) {
          setUserFriendRequests(res.data.friendRequests)
        } else {
          setUserFriendRequests([])
        }
      })
      .catch((err) => {
        console.log(err.response?.data.message)
      })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        otherUser,
        registerUsername,
        setRegisterUsername,
        registerPassword,
        setRegisterPassword,
        userFriends,
        setUserFriends,
        userFriendRequests,
        setUserFriendRequests,

        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword,

        register,
        login,
        logout,
        getUser,
        getOtherUserByUsername,
        getUserFriends,
        getUserFriendRequests,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
