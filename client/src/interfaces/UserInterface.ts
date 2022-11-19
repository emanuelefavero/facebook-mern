export default interface UserInterface {
  _id: string
  username: string
  password: string
  role: string
  friendRequests: string[]
  friends: string[]
  __v: number
}
