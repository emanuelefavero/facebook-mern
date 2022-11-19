import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// IMPORT CONTEXT
import SearchContext from '../context/SearchContext'

function SearchInput() {
  const { search, setSearch } = useContext(SearchContext)

  const navigate = useNavigate()

  return (
    <>
      <h2>Search Users</h2>
      <input
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        type='search'
        placeholder='Search users...'
      />
      <div>
        <button onClick={() => navigate(`/search?query=${search}`)}>
          Search
        </button>
      </div>
    </>
  )
}

export default SearchInput
