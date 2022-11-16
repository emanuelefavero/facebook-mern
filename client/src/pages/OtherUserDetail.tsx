import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { useParams } from 'react-router-dom'

function UserDetail() {
  const { otherUser, getOtherUserByUsername } = useContext(UserContext)

  const { username } = useParams()

  useEffect(() => {
    getOtherUserByUsername(username as string)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {otherUser?.username ? (
        <>
          <h2>{otherUser.username}</h2>

          <h2>Friends</h2>
        </>
      ) : (
        <h2>User Not Found...</h2>
      )}
    </>
  )
}

export default UserDetail
