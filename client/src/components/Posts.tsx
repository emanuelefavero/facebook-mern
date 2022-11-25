import styles from './Posts.module.css'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useContext } from 'react'

// IMPORT COMPONENTS
import GetUserLinkByUsername from './GetUserLinkByUsername'
import GetUserLinkById from './GetUserLinkById'

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
    likePost,
    commentContent,
    setCommentContent,
    addComment,
  } = useContext(PostsContext)

  useEffect(() => {
    getUser()
    getUserPosts()
    getFriendsPosts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.posts}>
      {/* CREATE POST */}
      <div className={styles.createPost}>
        <input
          type='text'
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button onClick={createPost}>Post</button>
      </div>

      <hr className={styles.divider} />

      {/* LOGGED USER LAST POST */}
      <div className={styles.lastPost}>
        <h4>Your Last Post</h4>
        <hr />
        {userPosts.length > 0 ? (
          <p>{userPosts[userPosts.length - 1].content}</p>
        ) : (
          <p>You have no posts yet</p>
        )}
      </div>

      <hr className={styles.divider} />

      {/* FRIENDS POSTS */}
      <h2>Your Friends Posts</h2>
      <div>
        {userFriendsLastPosts!.length > 0 &&
          userFriendsLastPosts!.map((post: any) => (
            <div key={post?._id ? post?._id : uuidv4()}>
              {/* --Check if post has content */}
              {post?.content && (
                <>
                  {/* --Username and profilePicture Link */}
                  <GetUserLinkById id={post?.author} />
                  <p>{post?.content}</p>
                  <h6>{post?.createdAt}</h6>
                </>
              )}

              {/* POST LIKES */}
              {/* --Check for undefined */}
              {post?.likes?.length >= 0 ? (
                <>
                  <button onClick={() => likePost(post?._id)}>Like</button>
                  <p>Likes: {post?.likes?.length}</p>
                </>
              ) : null}

              {/* ADD COMMENT */}
              {/* --Check if post content is not empty */}
              {post?.content ? (
                <>
                  <input
                    type='text'
                    placeholder='Add a comment...'
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                  />
                  <button onClick={() => addComment(post?._id)}>Comment</button>
                </>
              ) : null}

              {/* COMMENTS */}
              {/* --Check for undefined */}
              {post?.comments?.length > 0 ? (
                <>
                  <p>Comments: {post?.comments?.length}</p>
                  {post?.comments?.map((comment: any) => (
                    <div key={comment?._id ? comment?._id : uuidv4()}>
                      {/* --Username and profilePicture Link */}
                      <GetUserLinkByUsername username={comment?.username} />
                      <p>{comment?.content}</p>
                      <h6>{comment?.createdAt}</h6>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Posts
