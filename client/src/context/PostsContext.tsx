import { useState, useContext, createContext } from 'react'
import axios from 'axios'
import type { AxiosError } from 'axios'

// IMPORT INTERFACES
import PostInterface from '../interfaces/PostInterface'

// IMPORT CONTEXT
import UserContext from './UserContext'

axios.defaults.baseURL = 'http://localhost:4000'

// CONTEXT
const PostsContext = createContext({
  postContent: '',
  setPostContent: (content: string) => {},
  posts: [] as PostInterface[] | [],
  createPost: () => {},
  getPosts: () => {},
})

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useContext(UserContext)
  const [postContent, setPostContent] = useState('')
  const [posts, setPosts] = useState<PostInterface[] | []>([])

  // Create a post
  const createPost = async () => {
    window.location.reload()
    await axios({
      method: 'POST',
      url: '/api/posts',
      data: {
        content: postContent,
        author: user,
        username: user?.username,
      },
    })
      .then((res) => {
        console.log(res.data)
        setPostContent('')
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  }

  // Get all posts
  const getPosts = async () => {
    await axios({
      method: 'GET',
      url: '/api/posts',
    })
      .then((res) => {
        // console.log(res.data)
        setPosts(res.data)
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  }

  return (
    <PostsContext.Provider
      value={{
        postContent,
        setPostContent,
        posts,
        createPost,
        getPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export default PostsContext
