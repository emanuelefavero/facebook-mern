import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import FriendRequestContext from '../context/FriendRequestContext'

// IMPORT COMPONENTS
import GetUsernameById from '../components/GetUsernameById'
import SearchInput from '../components/SearchInput'
import Posts from '../components/Posts'
// import ProfilePicture from '../components/ProfilePicture'

// FIX: remove this after moving profile picture functions to context
axios.defaults.baseURL = 'http://localhost:4000'

function Home() {
  const { user, getUser, userFriends, getUserFriends } = useContext(UserContext)
  const {
    getFriendRequests,
    friendRequests,
    acceptFriendRequest,
    declineFriendRequest,
  } = useContext(FriendRequestContext)

  useEffect(() => {
    getUser()
    getUserFriends(user?.username as string)
    getFriendRequests()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <div>
      {/* TODO: add - profile picture to displayed friends here and in other users detail page */}
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

      {/* GREET USER */}
      <h1>Hello {user?.username}</h1>

      {/* SEARCH */}
      <SearchInput />

      {/* FRIENDS */}
      <h2>Friends</h2>

      {userFriends.length > 0 && (
        <h3>
          You have {userFriends.length.toString()} friend
          {userFriends.length > 1 && 's'}
        </h3>
      )}

      {userFriends.length > 0 ? (
        userFriends.map((friend) => (
          <div key={friend._id}>
            <img
              src={friend?.profilePictureUrl}
              alt='Profile'
              width='50'
              height='50'
              style={{ borderRadius: '50%' }}
            />

            <GetUsernameById id={friend._id} />
          </div>
        ))
      ) : (
        <p>You have no friends</p>
      )}

      {/* FRIEND REQUESTS */}
      <h2>Friend Requests</h2>
      <ul>
        {friendRequests.map((friendRequest) => {
          // Check if friend request is not from user and its to user
          return friendRequest.from !== user?._id &&
            friendRequest.to === user?._id ? (
            <li key={friendRequest._id}>
              <>
                <div>
                  {<GetUsernameById id={friendRequest.from as string} />} wants
                  to be friends with you
                </div>
                <button
                  onClick={() => {
                    acceptFriendRequest(friendRequest._id as string)
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    declineFriendRequest(friendRequest._id as string)
                  }}
                >
                  Decline
                </button>
              </>
            </li>
          ) : null
        })}
      </ul>

      {/* POSTS */}
      <Posts />
    </div>
  )
}

export default Home
