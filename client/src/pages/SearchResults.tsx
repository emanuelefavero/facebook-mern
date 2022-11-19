import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import SearchContext from '../context/SearchContext'

function SearchResults() {
  const { user, getUser } = useContext(UserContext)
  const { searchResults, searchUser } = useContext(SearchContext)

  useEffect(() => {
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
