import React, { useState, createContext } from 'react'
import axios from 'axios'
import type { AxiosError } from 'axios'
axios.defaults.baseURL = 'http://localhost:4000'

// INTERFACES
interface UserInterface {
  _id: string
  username: string
  password: string
  role: string
}

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

  loginUsername: '',
  setLoginUsername: (username: string) => {},
  loginPassword: '',
  setLoginPassword: (password: string) => {},
  newFriendUsernameInput: '',
  setNewFriendUsernameInput: (username: string) => {},

  register: () => {},
  login: () => {},
  logout: () => {},
  getUser: () => {},
  getUserByUsername: (username: string) => {},
  getOtherUserByUsername: (username: string) => {},
  getUserFriends: (username: string) => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null)
  const [otherUser, setOtherUser] = useState<UserInterface | null>(null)

  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [newFriendUsernameInput, setNewFriendUsernameInput] = useState('')

  const [userFriends, setUserFriends] = useState<UserInterface[] | []>([])

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

  // GET user by username
  const getUserByUsername = async (username: string) => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: `/api/user/${username}`,
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

        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword,
        newFriendUsernameInput,
        setNewFriendUsernameInput,

        register,
        login,
        logout,
        getUser,
        getUserByUsername,
        getOtherUserByUsername,
        getUserFriends,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
