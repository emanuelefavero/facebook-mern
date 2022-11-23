import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { baseURL } from '../axiosConfig'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'

axios.defaults.baseURL = baseURL

interface Props {
  username: string
}

function GetUserByUsername({ username }: Props) {
  const { user } = useContext(UserContext)

  const [displayUsername, setDisplayUsername] = useState('')
  const [displayProfilePictureUrl, setDisplayProfilePictureUrl] = useState('')

  // GET user by username as string
  const getUserByUsername = async (username: string) => {
    if (username === undefined) {
      return
    } else {
      await axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/user/${username}`,
      })
        .then((res) => {
          if (res.data.user) {
            setDisplayUsername(res.data.user.username)
            setDisplayProfilePictureUrl(res.data.user.profilePictureUrl)
          } else {
            setDisplayUsername('')
            setDisplayProfilePictureUrl('')
          }
        })
        .catch((err) => {
          console.log(err.response?.data.message)
        })
    }
  }

  useEffect(() => {
    getUserByUsername(username)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* PROFILE PICTURE */}
      <Link
        to={
          // IF THE SEARCH RESULT IS THE CURRENT USER, GO TO THE HOME PAGE
          displayUsername === user?.username ? '/' : `/user/${displayUsername}`
        }
      >
        <img
          src={displayProfilePictureUrl}
          alt='Profile'
          width='25'
          height='25'
          style={{ borderRadius: '50%' }}
        />

        {/* USERNAME */}
        {displayUsername}
      </Link>
    </>
  )
}

export default GetUserByUsername
