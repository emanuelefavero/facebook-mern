import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { baseURL } from '../axiosConfig'

axios.defaults.baseURL = baseURL

interface Props {
  id: string
  friendProfilePictureUrl: string
}

function GetFriendUsernameById({ id, friendProfilePictureUrl }: Props) {
  const [displayUsername, setDisplayUsername] = useState('')

  // GET username by id as string
  const getFriendUsernameById = async (id: string) => {
    if (id === undefined) {
      return
    } else {
      await axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/user/username-by-id/${id}`,
      })
        .then((res) => {
          if (res.data.username) {
            setDisplayUsername(res.data.username)
          } else {
            setDisplayUsername('')
          }
        })
        .catch((err) => {
          console.log(err.response?.data.message)
        })
    }
  }

  useEffect(() => {
    getFriendUsernameById(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* PROFILE PICTURE */}
      <Link to={`/user/${displayUsername}`}>
        <img
          src={friendProfilePictureUrl}
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

export default GetFriendUsernameById
