import { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

// IMPORT INTERFACES
import UserInterface from '../interfaces/UserInterface'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'

function SearchResults() {
  const { user, getUser } = useContext(UserContext)

  const [searchResults, setSearchResults] = useState<UserInterface[] | []>([])
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('query')

  useEffect(() => {
    const searchUser = async () => {
      try {
        const { data } = await axios.get(`api/search?q=${query}`)
        setSearchResults(data.users)
      } catch (error) {
        console.log(error)
      }
    }
    searchUser()
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1>Search Results</h1>
      {searchResults.map((searchResult) => (
        <div key={searchResult._id}>
          <Link
            to={
              // IF THE SEARCH RESULT IS THE CURRENT USER, GO TO THE HOME PAGE
              searchResult.username === user?.username
                ? '/'
                : `/user/${searchResult.username}`
            }
          >
            {searchResult.username}
          </Link>
        </div>
      ))}
    </>
  )
}

export default SearchResults
