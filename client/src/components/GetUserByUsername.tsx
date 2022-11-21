import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface Props {
  username: string
}

function GetUserByUsername({ username }: Props) {
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
        // url: `/api/user/user-by-username/${username}`,
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
    // getUsernameById(id)
    getUserByUsername(username)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Link to={`/user/${displayUsername}`}>
        <img
          src={displayProfilePictureUrl}
          alt='Profile'
          width='25'
          height='25'
          style={{ borderRadius: '50%' }}
        />

        {displayUsername}
      </Link>
    </>
  )
}

export default GetUserByUsername
