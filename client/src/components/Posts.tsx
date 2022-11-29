import styles from './Posts.module.css'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useContext, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import likeIcon from '../svg/likeIcon.svg'
import commentIcon from '../svg/commentIcon.svg'

// IMPORT COMPONENTS
import GetUserLinkByUsername from './GetUserLinkByUsername'
import GetUserLinkById from './GetUserLinkById'
import GetTimeSince from './GetTimeSince'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import PostsContext from '../context/PostsContext'

function Posts() {
  const { getUser, user } = useContext(UserContext)
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

  const [showComments, setShowComments] = useState(false)
  const [showAddComment, setShowAddComment] = useState(false)

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
      <div className={styles.friendsPosts}>
        {userFriendsLastPosts!.length > 0 &&
          userFriendsLastPosts!.map((post: any) => (
            <div key={post?._id ? post?._id : uuidv4()}>
              <div className={styles.friendPost}>
                {/* --Check if post has content */}
                {post?.content && (
                  <>
                    {/* --Username and profilePicture Link */}
                    <GetUserLinkById
                      id={post?.author}
                      createdAt={post?.createdAt}
                    />
                    <p
                      style={{
                        fontSize:
                          post?.content.length > 200
                            ? '0.9rem'
                            : post?.content.length > 100
                            ? '1rem'
                            : post?.content.length > 50
                            ? '1.15rem'
                            : post?.content.length > 25
                            ? '1.25rem'
                            : '1.5rem',
                        fontWeight: post?.content.length > 100 ? '400' : '300',
                      }}
                      className={styles.postContent}
                    >
                      {post?.content}
                    </p>
                  </>
                )}

                <div className={styles.likesAndCommentsContainer}>
                  {/* POST LIKES */}
                  {/* --Check for undefined */}
                  {post?.likes?.length >= 0 ? (
                    <div className={styles.likes}>
                      <FontAwesomeIcon
                        className={styles.thumbsUpIcon}
                        icon={faThumbsUp}
                      />
                      <span>{post?.likes?.length}</span>
                    </div>
                  ) : null}

                  {/* SHOW COMMENTS BUTTON */}
                  {post?.comments?.length > 0 && (
                    <button
                      className={styles.showComments}
                      onClick={() => setShowComments(!showComments)}
                    >
                      {post?.comments?.length} Comment
                      {post?.comments?.length === 1 ? '' : 's'}
                    </button>
                  )}
                </div>

                {post?.content && <hr />}

                {post?.content && (
                  <div className={styles.likeAndCommentButtonContainer}>
                    {/* LIKE POST */}
                    {/* --Check for undefined */}
                    {post?.likes?.length >= 0 ? (
                      <>
                        <button onClick={() => likePost(post?._id)}>
                          <img src={likeIcon} alt='comment' />
                          Like
                        </button>
                      </>
                    ) : null}

                    {/* SHOW ADD COMMENT BUTTON */}
                    <button onClick={() => setShowAddComment(!showAddComment)}>
                      <img src={commentIcon} alt='comment' />
                      Comment
                    </button>
                  </div>
                )}

                {/* <hr /> */}

                {/* COMMENTS */}
                {/* --Check for undefined */}
                {post?.comments?.length > 0 && showComments ? (
                  <div className={styles.comments}>
                    {post?.comments?.map((comment: any) => (
                      <div
                        className={styles.comment}
                        key={comment?._id ? comment?._id : uuidv4()}
                      >
                        {/* --Username and profilePicture Link */}
                        <GetUserLinkByUsername username={comment?.username} />
                        <div>
                          <div className={styles.commentText}>
                            <h5>{comment?.username}</h5>
                            <p>{comment?.content}</p>
                          </div>

                          {/* comment.createdAt FORMATTED DATE */}
                          <span className={`${styles.date}`}>
                            <GetTimeSince createdAt={comment?.createdAt} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* ADD COMMENT */}
                {/* --Check if post content is not empty */}
                {post?.content && showAddComment ? (
                  <div className={styles.addCommentContainer}>
                    <img
                      src={user?.profilePictureUrl}
                      alt='Profile'
                      width='25'
                      height='25'
                      style={{ borderRadius: '50%' }}
                    />
                    <input
                      type='text'
                      placeholder='Write a comment...'
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <button onClick={() => addComment(post?._id)}>Post</button>
                  </div>
                ) : null}
              </div>
              <hr className={styles.divider} />
            </div>
          ))}
      </div>
      <hr className={styles.lastDivider} />
    </div>
  )
}

export default Posts
