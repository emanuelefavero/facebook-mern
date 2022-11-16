import { useState, useContext } from 'react'
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
