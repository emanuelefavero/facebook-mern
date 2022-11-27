import styles from './OtherUserDetail.module.css'
import { v4 as uuidv4 } from 'uuid'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../axiosConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import likeIcon from '../svg/likeIcon.svg'
import commentIcon from '../svg/commentIcon.svg'

// IMPORT INTERFACE
import PostInterface from '../interfaces/PostInterface'

// IMPORT COMPONENTS
import GetUserLinkByUsername from '../components/GetUserLinkByUsername'
import GetTimeSince from '../components/GetTimeSince'

// IMPORT CONTEXT
import UserContext from '../context/UserContext'
import FriendRequestContext from '../context/FriendRequestContext'
import PostsContext from '../context/PostsContext'

axios.defaults.baseURL = baseURL

function UserDetail() {
  const {
    otherUser,
    getOtherUserByUsername,
    user,
    getUser,
    userFriends,
    getUserFriends,
    userFriendRequests,
    getUserFriendRequests,
  } = useContext(UserContext)

  const { createFriendRequest, getFriendRequests } =
    useContext(FriendRequestContext)

  const { likePost, commentContent, setCommentContent, addComment } =
    useContext(PostsContext)

  const { username } = useParams()

  // Get user posts
  const [userPosts, setUserPosts] = useState<PostInterface[] | []>([])
  const getUserPosts = async () => {
    try {
      axios({
        method: 'GET',
        url: `/api/posts/user/${username}`,
      }).then((res) => {
        setUserPosts(res.data)
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUser()
    getOtherUserByUsername(username as string)
    getFriendRequests()
    getUserFriends(user?.username as string)
    getUserFriendRequests(user?.username as string)

    getUserPosts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // check if user is already friends with other user
  const [isFriend, setIsFriend] = useState(false)
  useEffect(() => {
    setIsFriend(false)
    if (userFriends.length > 0) {
      userFriends.forEach((friend) => {
        if (friend._id === otherUser?._id) {
          setIsFriend(true)
        }
      })
    }
  }, [userFriends, otherUser])

  // check if user has already sent a friend request to other user
  const [hasSentFriendRequest, setHasSentFriendRequest] = useState(false)
  useEffect(() => {
    setHasSentFriendRequest(false)
    if (userFriendRequests.length > 0) {
      userFriendRequests.forEach((friendRequest) => {
        if (friendRequest.to === otherUser?._id) {
          setHasSentFriendRequest(true)
        }
      })
    }
  }, [userFriendRequests, otherUser])

  const [showComments, setShowComments] = useState(false)
  const [showAddComment, setShowAddComment] = useState(false)

  return (
    <div className={styles.otherUserDetail}>
      {otherUser?.username ? (
        <>
          {/* OTHER USER PROFILE PICTURE */}
          <div className={styles.profilePicture}>
            <div className={styles.pictureContainer}>
              <img
                className={styles.otherUserProfilePicture}
                src={otherUser?.profilePictureUrl}
                alt='Profile'
                width='150'
                height='150'
                style={{ borderRadius: '50%' }}
              />
              {/* image border */}
              <div className={styles.imageBorder}></div>
            </div>
          </div>

          {/* OTHER USER USERNAME */}
          <h2>{otherUser.username}</h2>

          {/* ADD FRIEND */}
          {/* If user is already friend with other user or if the friend request has already been sent, hide 'Add Friend' button */}
          <div className={styles.addFriendContainer}>
            {user ? (
              isFriend ? (
                <p>{otherUser?.username} is your friend</p>
              ) : hasSentFriendRequest ? (
                <p>You sent a friend request to {otherUser?.username}</p>
              ) : (
                <button
                  onClick={() => {
                    createFriendRequest({
                      _id: uuidv4(),
                      // TIP: We will pass the user and other user usernames and those will be used in the backend to find both users and add those users to the friend request
                      from: user?.username as string,
                      to: otherUser?.username as string,
                    })
                    window.location.reload()
                  }}
                >
                  Add Friend
                </button>
              )
            ) : null}
          </div>

          <hr className={styles.divider} />

          {/* OTHER USER POSTS */}
          <div className={styles.otherUserPosts}>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <>
                  <div className={styles.otherUserPost} key={post._id}>
                    <div className={styles.date}>
                      <GetTimeSince createdAt={post?.createdAt as string} />
                    </div>
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
                      {post.content}
                    </p>

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

                    <hr />

                    <div className={styles.likeAndCommentButtonContainer}>
                      {/* LIKE POST */}
                      {/* --Check for undefined */}
                      {post?.likes?.length >= 0 ? (
                        <>
                          <button onClick={() => likePost(post?._id as string)}>
                            <img src={likeIcon} alt='comment' />
                            Like
                          </button>
                        </>
                      ) : null}

                      {/* SHOW ADD COMMENT BUTTON */}
                      {post?.content ? (
                        <>
                          <button
                            onClick={() => setShowAddComment(!showAddComment)}
                          >
                            <img src={commentIcon} alt='comment' />
                            Comment
                          </button>
                        </>
                      ) : null}
                    </div>

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
                            <GetUserLinkByUsername
                              username={comment?.username}
                            />
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
                        <button onClick={() => addComment(post?._id as string)}>
                          Post
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <hr className={styles.divider} />
                </>
              ))
            ) : (
              <p>{otherUser?.username} has no posts</p>
            )}
            <hr className={styles.lastDivider} />
          </div>
        </>
      ) : (
        <div className={styles.loading}>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  )
}

export default UserDetail
