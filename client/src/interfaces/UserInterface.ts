import PostInterface from './PostInterface'

export default interface UserInterface {
  _id: string
  username: string
  password: string
  profilePictureUrl?: string
  role: string
  posts: PostInterface[] | []
  friends: string[]
  friendRequests: string[]
  __v: number

  // This is a virtual field
  // lastPost: PostInterface | {} | null
  // numberOfPosts: number
  // numberOfFriends: number
}
