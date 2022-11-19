import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import type { AxiosError } from 'axios'

// IMPORT INTERFACES
import PostInterface from '../interfaces/PostInterface'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'

axios.defaults.baseURL = 'http://localhost:4000'

function Posts() {
  const { user, getUser } = useContext(UserContext)

  const [postContent, setPostContent] = useState('')
  const [posts, setPosts] = useState<PostInterface[] | []>([])

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

  useEffect(() => {
    getUser()
    getPosts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h2>Posts</h2>
      <input
        type='text'
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <button onClick={createPost}>Post</button>

      {posts.map((post: PostInterface) => (
        <div key={post._id}>
          <h4>{post.author?.username}</h4>
          <p>{post.content}</p>
          <h6>{post.createdAt as string}</h6>
        </div>
      ))}

      <h2>Posts</h2>
    </>
  )
}

export default Posts
