import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'

function FindNewFriends() {
  const {
    getOtherUserByUsername,
    newFriendUsernameInput,
    setNewFriendUsernameInput,
  } = useContext(UserContext)

  const navigate = useNavigate()

  return (
    <div>
      <h2>Find New Friends</h2>

      {/* TODO: implement a user search on all Users (search how on the web) */}
      {/* THEN, remember to hide the current logged in user by the result (DO IT ONLY AFTER THE SEARCH FEATURE IS IMPLEMENTED) */}

      <input
        type='text'
        placeholder='New friend username'
        value={newFriendUsernameInput}
        onChange={(e) => setNewFriendUsernameInput(e.target.value)}
      />
      <button
        onClick={() => {
          getOtherUserByUsername(newFriendUsernameInput)
          setNewFriendUsernameInput('')
          navigate(`/user/${newFriendUsernameInput}`)
        }}
      >
        Search
      </button>
    </div>
  )
}

export default FindNewFriends
