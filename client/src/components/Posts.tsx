import { useEffect, useContext } from 'react'
import axios from 'axios'

// IMPORT INTERFACES
import PostInterface from '../interfaces/PostInterface'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import PostsContext from '../context/PostsContext'

axios.defaults.baseURL = 'http://localhost:4000'

function Posts() {
  const { getUser } = useContext(UserContext)
  const { postContent, setPostContent, posts, createPost, getPosts } =
    useContext(PostsContext)

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
    </>
  )
}

export default Posts
