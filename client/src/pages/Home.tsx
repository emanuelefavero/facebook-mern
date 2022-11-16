import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'

import FindNewFriends from '../components/FindNewFriends'

function Home() {
  const { user, getUser, userFriends, getUserFriends } = useContext(UserContext)

  useEffect(() => {
    getUser()
    getUserFriends(user?.username as string)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <FindNewFriends />
      <h2>Friends</h2>
      <ul>
        {userFriends.map((friend) => {
          return <li key={friend.username}>{friend.username}</li>
        })}
      </ul>
    </div>
  )
}

export default Home
