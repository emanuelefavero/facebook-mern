import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface Props {
  id: string
}

function GetUsernameById({ id }: Props) {
  const [displayUsername, setDisplayUsername] = useState('')

  // GET username by id as string
  const getUsernameById = async (id: string) => {
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
    getUsernameById(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Link to={`/user/${displayUsername}`}>{displayUsername}</Link>
    </>
  )
}

export default GetUsernameById
