import { useEffect, useState } from 'react'
import axios from 'axios'

interface Props {
  id: string
}

function useGetUsernameById({ id }: Props) {
  const [displayUsername, setDisplayUsername] = useState('')

  // GET username by id as string
  const getUsernameById = async (id: string) => {
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

  useEffect(() => {
    getUsernameById(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return displayUsername
}

export default useGetUsernameById
