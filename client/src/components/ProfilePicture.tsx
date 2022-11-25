import styles from './ProfilePicture.module.css'
import { useState } from 'react'
import axios from 'axios'
import { baseURL } from '../axiosConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

// IMPORT INTERFACE
import UserInterface from '../interfaces/UserInterface'

axios.defaults.baseURL = baseURL

interface Props {
  user: UserInterface | null
}

function ProfilePicture({ user }: Props) {
  // Change profile picture by clicking on it and passing the user._id
  const [editModeProfilePictureUrl, setEditModeProfilePictureUrl] =
    useState(false)
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    user?.profilePictureUrl
  )

  const changeProfilePicture = async () => {
    try {
      await axios.put(
        `/api/user/profile-picture/${user?._id}`,
        { profilePictureUrl: profilePictureUrl },
        { withCredentials: true }
      )
      window.location.reload()
      setEditModeProfilePictureUrl(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.profilePicture}>
      {/* PROFILE PICTURE */}
      <div className={styles.pictureContainer}>
        {editModeProfilePictureUrl ? (
          <div className={styles.editPictureMode}>
            <p>Change Image URL:</p>
            <input
              type='text'
              placeholder='Profile picture URL...'
              value={profilePictureUrl}
              onChange={(e) => setProfilePictureUrl(e.target.value)}
            />
            <button onClick={changeProfilePicture}>Save</button>
          </div>
        ) : (
          <>
            <img
              src={user?.profilePictureUrl}
              alt='Profile'
              width='150'
              height='150'
              style={{ borderRadius: '50%' }}
            />
            {/* image border */}
            <div className={styles.imageBorder}></div>
          </>
        )}

        {/* EDIT PROFILE PICTURE BUTTON */}
        <button
          className={styles.editButton}
          onClick={() =>
            setEditModeProfilePictureUrl(!editModeProfilePictureUrl)
          }
        >
          {editModeProfilePictureUrl ? (
            <FontAwesomeIcon icon={faDeleteLeft} />
          ) : (
            <FontAwesomeIcon icon={faCamera} />
          )}
        </button>
      </div>
    </div>
  )
}

export default ProfilePicture
