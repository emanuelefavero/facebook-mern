import UserInterface from './UserInterface'

export default interface FriendRequestInterface {
  _id: string
  from: UserInterface | null
  to: UserInterface | null
}
