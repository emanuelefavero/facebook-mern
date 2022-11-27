import friendRequestsStyles from './FriendRequests.module.css'
import postsStyles from './Posts.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { baseURL } from '../axiosConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAmerica } from '@fortawesome/free-solid-svg-icons'

axios.defaults.baseURL = baseURL

interface Props {
  id: string
  createdAt?: string
}

function GetUserLinkById({ id, createdAt }: Props) {
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

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <>
      {/* PROFILE PICTURE */}
      <Link
        className={`${friendRequestsStyles.link} ${postsStyles.link}`}
        to={`/user/${displayUsername}`}
      >
        <img
          src={displayProfilePictureUrl}
          alt='Profile'
          width='50'
          height='50'
          style={{ borderRadius: '50%' }}
        />

        <div className={postsStyles.usernameAndDate}>
          {/* USERNAME */}
          <span
            className={`${friendRequestsStyles.usernameText} ${postsStyles.usernameText}`}
          >
            {displayUsername}
          </span>
          {/* createdAt FORMATTED DATE */}
          {createdAt && (
            <span className={`${postsStyles.date}`}>
              {monthNames[new Date(createdAt).getMonth()]}{' '}
              {new Date(createdAt).getDate()}{' '}
              {new Date(createdAt).getFullYear() !== new Date().getFullYear() &&
                new Date(createdAt).getFullYear()}{' '}
              at{' '}
              {new Date(createdAt).toLocaleString('en-US', {
                hour: 'numeric',
                hour12: true,
                minute: 'numeric',
              })}{' '}
              &middot;{' '}
              <FontAwesomeIcon
                icon={faEarthAmerica}
                className={postsStyles.worldIcon}
              />
            </span>
          )}
        </div>
      </Link>
    </>
  )
}

export default GetUserLinkById
