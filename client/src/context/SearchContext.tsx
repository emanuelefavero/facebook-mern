import React, { useState, createContext } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../axiosConfig'

// IMPORT INTERFACES
import UserInterface from '../interfaces/UserInterface'

axios.defaults.baseURL = baseURL

// CONTEXT
const SearchContext = createContext({
  search: '',
  setSearch: (search: string) => {},
  searchResults: [] as UserInterface[] | [],
  searchUser: () => {},
})

export function SearchProvider({ children }: { children: React.ReactNode }) {
  // STATE
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<UserInterface[] | []>([])

  const location = useLocation()
  const query = new URLSearchParams(location.search).get('query')

  // Search user
  const searchUser = async () => {
    try {
      const { data } = await axios.get(`api/search?q=${query}`)
      setSearchResults(data.users)
      console.log(data.users)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        searchUser,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContext
