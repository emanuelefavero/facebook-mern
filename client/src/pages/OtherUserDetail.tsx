import { v4 as uuidv4 } from 'uuid'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../axiosConfig'

// IMPORT INTERFACE
import PostInterface from '../interfaces/PostInterface'

// IMPORT COMPONENTS
import GetUserLinkByUsername from '../components/GetUserLinkByUsername'

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

  return (
    <>
      {otherUser?.username ? (
        <>
          {/* OTHER USER PROFILE PICTURE */}
          <img
            src={otherUser?.profilePictureUrl}
            alt='Profile'
            width='150'
            height='150'
            style={{ borderRadius: '50%' }}
          />

          {/* OTHER USER USERNAME */}
          <h2>{otherUser.username}</h2>

          {/* ADD FRIEND */}
          {/* If user is already friend with other user or if the friend request has already been sent, hide 'Add Friend' button */}
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

          {/* OTHER USER POSTS */}
          <h3>Posts</h3>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div key={post._id}>
                <p>{post.content}</p>
                <h6>{post?.createdAt as string}</h6>

                {/* POST LIKES */}
                {/* --Check for undefined */}
                {post?.likes?.length >= 0 ? (
                  <>
                    {/* -- check if user is logged in */}
                    {user && (
                      <button onClick={() => likePost(post._id as string)}>
                        Like
                      </button>
                    )}
                    <p>Likes: {post?.likes?.length}</p>
                  </>
                ) : null}

                {/* ADD COMMENT */}
                {/* --Check if user is logged in && post content is not empty */}
                {user && post?.content ? (
                  <>
                    <input
                      type='text'
                      placeholder='Add a comment...'
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <button onClick={() => addComment(post?._id as string)}>
                      Comment
                    </button>
                  </>
                ) : null}

                {/* COMMENTS */}
                {/* --Check for undefined */}
                {post?.comments?.length > 0 ? (
                  <>
                    <p>Comments: {post?.comments?.length}</p>
                    {post?.comments?.map((comment: any) => (
                      <div key={comment?._id ? comment?._id : uuidv4()}>
                        {/* FIX: Link updates url but doesn't go to page */}
                        {/* --Username and profilePicture Link */}
                        <GetUserLinkByUsername username={comment?.username} />

                        <p>{comment?.content}</p>
                        <h6>{comment?.createdAt}</h6>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
            ))
          ) : (
            <p>{otherUser?.username} has no posts</p>
          )}
        </>
      ) : (
        <h2>User Not Found...</h2>
      )}
    </>
  )
}

export default UserDetail
