"use client"

import { onBlock, onUnblock } from '@/actions/block'
import { onFollow, onUnFollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({isFollowing,userId}:ActionsProps) => {
  const [isPending, startTransition] = useTransition()
  const handleFollow = () =>{
    startTransition(()=>{
    onFollow(userId).
    then((data)=>toast.success(`You are now following ${data.following.username}`)).
    catch(()=>toast.error("somethingwent wrong"))
  })}
  const handleUnfollow = () =>{
    startTransition(()=>{
    onUnFollow(userId).
    then((data)=>toast.success(`You have unfollowed ${data.following.username}`)).
    catch(()=>toast.error("somethingwent wrong"))
  })}
  const onClick = ()=>{
    if(isFollowing){
      handleUnfollow()
    }
    else{
      handleFollow()
    }
  }
  const handleBlock = ()=>{
    startTransition(()=>{
      onUnblock(userId)
      .then((data)=>toast.success(`You blocked ${data.blocked.username}`))
      .catch(()=>toast.error("Something went wrong"))
    })
  }
  return (
    <>   
     <Button
       onClick={onClick}
       disabled={isPending}
       variant="primary">
       { isFollowing ? "Unfollow" : "follow" }  
    </Button>
    <Button
      onClick={handleBlock}
      disabled={isPending}>
      Block
    </Button>
    </>

  )
}
