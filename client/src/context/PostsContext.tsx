import { useState, useContext, createContext } from 'react'
import axios from 'axios'
import type { AxiosError } from 'axios'
import { baseURL } from '../axiosConfig'

// IMPORT INTERFACES
import PostInterface from '../interfaces/PostInterface'

// IMPORT CONTEXT
import UserContext from './UserContext'

axios.defaults.baseURL = baseURL

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
  likePost: (postId: string) => {},
  commentContent: '',
  setCommentContent: (content: string) => {},
  addComment: (postId: string) => {},
})

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useContext(UserContext)

  // STATE
  const [postContent, setPostContent] = useState('')
  const [posts, setPosts] = useState<PostInterface[] | []>([])
  const [userPosts, setUserPosts] = useState<PostInterface[] | []>([])
  const [userFriendsLastPosts, setUserFriendsLastPosts] = useState<
    PostInterface[] | []
  >([])
  const [commentContent, setCommentContent] = useState('')

  // POST: Create a post
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

  // GET all posts
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

  // POST: Like a post
  const likePost = async (postId: string) => {
    await axios({
      method: 'POST',
      data: {
        username: user?.username,
      },
      // withCredentials: true,
      url: `/api/posts/${postId}/like`,
    })
      .then((res) => {
        console.log(res.data)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response?.data.message)
      })
  }

  // PUT: Add Comment to a post
  const addComment = async (postId: string) => {
    await axios({
      method: 'PUT',
      data: {
        content: commentContent,
        username: user?.username,
      },
      // withCredentials: true,
      url: `/api/posts/${postId}/comments`,
    })
      .then((res) => {
        // console.log(res.data)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response?.data.message)
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
        likePost,
        commentContent,
        setCommentContent,
        addComment,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export default PostsContext
