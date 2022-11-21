import { v4 as uuidv4 } from 'uuid'
import { useEffect, useContext } from 'react'

// IMPORT COMPONENTS
import GetUsernameById from './GetUsernameById'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import PostsContext from '../context/PostsContext'

function Posts() {
  const { getUser } = useContext(UserContext)
  const {
    postContent,
    setPostContent,
    createPost,
    userPosts,
    userFriendsLastPosts,
    getUserPosts,
    getFriendsPosts,
  } = useContext(PostsContext)

  useEffect(() => {
    getUser()
    getUserPosts()
    getFriendsPosts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* CREATE POST */}
      <h2>Create Post</h2>
      <input
        type='text'
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <button onClick={createPost}>Post</button>

      {/* LOGGED USER LAST POST */}
      <h2>Your Last Post</h2>
      {userPosts.length > 0 ? (
        <div>
          <p>{userPosts[userPosts.length - 1].content}</p>
        </div>
      ) : (
        <p>You have no posts yet</p>
      )}

      {/* FRIENDS POSTS */}
      <h2>Your Friends Posts</h2>
      <div>
        {userFriendsLastPosts!.length > 0 &&
          userFriendsLastPosts!.map((post: any) => (
            <div key={post?._id ? post?._id : uuidv4()}>
              <GetUsernameById id={post?.author} />
              <p>{post?.content}</p>
              <h6>{post?.createdAt}</h6>
            </div>
          ))}
      </div>

      {/* DISPLAY ALL POSTS */}
      {/* {posts.map((post: PostInterface) => (
        <div key={post._id}>
          <h4>{post.author?.username}</h4>
          <p>{post.content}</p>
          <h6>{post.createdAt as string}</h6>
        </div>
      ))} */}
    </>
  )
}

export default Posts
