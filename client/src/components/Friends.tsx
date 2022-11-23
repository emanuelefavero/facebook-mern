import React from 'react'

// IMPORT INTERFACES
import UserInterface from '../interfaces/UserInterface'

// IMPORT COMPONENTS
import GetFriendLinkById from './GetFriendLinkById'

interface Props {
  userFriends: UserInterface[] | []
}

function Friends({ userFriends }: Props) {
  return (
    <>
      <h2>Friends</h2>

      {userFriends.length > 0 && (
        <h3>
          You have {userFriends.length.toString()} friend
          {userFriends.length > 1 && 's'}
        </h3>
      )}

      {userFriends.length > 0 ? (
        userFriends.map((friend) => (
          <div key={friend._id}>
            <GetFriendLinkById
              id={friend._id}
              friendProfilePictureUrl={friend?.profilePictureUrl as string}
            />
          </div>
        ))
      ) : (
        <p>You have no friends</p>
      )}
    </>
  )
}

export default Friends
