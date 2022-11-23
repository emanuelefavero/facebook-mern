import UserInterface from './UserInterface'
import CommentInterface from './CommentInterface'

export default interface PostInterface {
  _id?: string
  content: string
  author?: UserInterface | null
  username?: string
  createdAt: Date | string

  likes: UserInterface[] | []
  numberOfLikes: number

  comments: CommentInterface[] | []

  // __v?: number
}
