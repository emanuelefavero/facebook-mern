import styles from './SearchResults.module.css'
import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

// IMPORT COMPONENTS
import GetFriendLinkById from '../components/GetFriendLinkById'

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
    <div className={styles.searchResults}>
      <div className={styles.title}>
        <h3>Search Results</h3>
      </div>
      <ul className={styles.results}>
        {searchResults.map((searchResult) => (
          <li key={searchResult._id}>
            <Link
              to={
                // IF THE SEARCH RESULT IS THE CURRENT USER, GO TO THE HOME PAGE
                searchResult.username === user?.username
                  ? '/'
                  : `/user/${searchResult.username}`
              }
            >
              <GetFriendLinkById
                id={searchResult._id}
                friendProfilePictureUrl={
                  searchResult?.profilePictureUrl as string
                }
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchResults
