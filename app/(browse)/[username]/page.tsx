import {isFollowingUser} from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import { Actions } from './_component/actions'
import { isBlockedByUser } from '@/lib/block-service'
import { StreamPlayer } from '@/components/stream-player'

interface UserPageProps{
    params:{
        username:string
    }
}

const UserPage = async ({params}:UserPageProps) => {
  // throw new Error("Test")
  const user = await getUserByUsername(params.username)
  if(!user || !user.stream){
    notFound()
  }
  const isBlocked = await isBlockedByUser(user.id)
  const isFollowing = await isFollowingUser(user.id)

  if(isBlocked){
    notFound()
  }
  return (
    <StreamPlayer
    user={user}
    stream={user.stream}
    isFollowing={isFollowing}
    />
  )
}

export default UserPage