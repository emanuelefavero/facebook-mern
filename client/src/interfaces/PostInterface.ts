import UserInterface from './UserInterface'

export default interface PostInterface {
  _id?: string
  content: string
  author?: UserInterface | null
  username?: string
  createdAt: Date | string

  likes: UserInterface[] | []
  numberOfLikes: number

  // __v?: number
}
