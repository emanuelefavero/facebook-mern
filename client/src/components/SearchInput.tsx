import styles from './SearchInput.module.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// IMPORT CONTEXT
import SearchContext from '../context/SearchContext'

function SearchInput() {
  const { search, setSearch } = useContext(SearchContext)

  const navigate = useNavigate()

  return (
    <div className={styles.searchInput}>
      <input
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        type='search'
        placeholder='Search users...'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            navigate(`/search?query=${search}`)
          }
        }}
      />
      <button
        className={styles.searchIcon}
        onClick={() => navigate(`/search?query=${search}`)}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  )
}

export default SearchInput
