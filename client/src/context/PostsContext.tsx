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
  userPosts: [] as PostInterface[] | [],
  userFriendsLastPosts: [] as PostInterface[] | [],
  getUserPosts: () => {},
  getFriendsPosts: () => {},
})

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useContext(UserContext)
  const [postContent, setPostContent] = useState('')
  const [posts, setPosts] = useState<PostInterface[] | []>([])
  const [userPosts, setUserPosts] = useState<PostInterface[] | []>([])
  const [userFriendsLastPosts, setUserFriendsLastPosts] = useState<
    PostInterface[] | []
  >([])

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

  // GET user posts
  const getUserPosts = async () => {
    await axios({
      method: 'GET',
      url: `/api/user/user-by-id/${user?._id}`,
    })
      .then((res) => {
        setUserPosts(res.data.user.posts)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // GET friends posts
  const getFriendsPosts = async () => {
    setUserFriendsLastPosts([])
    user?.friends.forEach(async (friendId) => {
      if (friendId === undefined) {
        return
      } else {
        await axios({
          method: 'GET',
          url: `/api/user/user-by-id/${friendId}`,
        })
          .then((res) => {
            setUserFriendsLastPosts((prev: any) => [
              ...prev,
              res.data.user.posts[res.data.user.posts.length - 1],
            ])
          })
          .catch((err) => {
            console.log(err)
          })
      }
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
        userPosts,
        userFriendsLastPosts,
        getUserPosts,
        getFriendsPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export default PostsContext
