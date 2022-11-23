import { useState } from 'react'
import axios from 'axios'
import { baseURL } from '../axiosConfig'

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
    <>
      {/* PROFILE PICTURE */}
      <div className='profile-picture-container'>
        <button
          onClick={() =>
            setEditModeProfilePictureUrl(!editModeProfilePictureUrl)
          }
        >
          {editModeProfilePictureUrl ? (
            <span>Cancel</span>
          ) : (
            <span>Edit profile picture</span>
          )}
        </button>

        {editModeProfilePictureUrl ? (
          <div>
            <input
              type='text'
              placeholder='Profile picture URL...'
              value={profilePictureUrl}
              onChange={(e) => setProfilePictureUrl(e.target.value)}
            />
            <button onClick={changeProfilePicture}>Save</button>
          </div>
        ) : (
          <img
            src={user?.profilePictureUrl}
            alt='Profile'
            width='150'
            height='150'
            style={{ borderRadius: '50%' }}
          />
        )}
      </div>
    </>
  )
}

export default ProfilePicture
