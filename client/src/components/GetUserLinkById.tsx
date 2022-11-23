import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { baseURL } from '../axiosConfig'

axios.defaults.baseURL = baseURL

interface Props {
  id: string
}

function GetUserLinkById({ id }: Props) {
  const [displayUsername, setDisplayUsername] = useState('')
  const [displayProfilePictureUrl, setDisplayProfilePictureUrl] = useState('')

  // GET user by id as string
  const getUserById = async (id: string) => {
    if (id === undefined) {
      return
    } else {
      await axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/user/user-by-id/${id}`,
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
    getUserById(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* PROFILE PICTURE */}
      <Link to={`/user/${displayUsername}`}>
        <img
          src={displayProfilePictureUrl}
          alt='Profile'
          width='50'
          height='50'
          style={{ borderRadius: '50%' }}
        />

        {/* USERNAME */}
        {displayUsername}
      </Link>
    </>
  )
}

export default GetUserLinkById
