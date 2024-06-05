"use client"

interface VideoProps{
    hostName : string,
    hostIdentity:string
}

import { useConnectionState, useRemoteParticipant, useTracks } from '@livekit/components-react'
import { ConnectionState, Track } from 'livekit-client'
import React from 'react'
import { OfflineVideo } from './offline-video'
import { LoadingVideo } from './loading-video'
import { LiveVideo } from './live-video'
import { Skeleton } from '../ui/skeleton'

export default function Video({
    hostName,
    hostIdentity
}:VideoProps) {
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone
  ]).filter((track)=>track.participant.identity === hostIdentity)

  let content;

  if(!participant && connectionState === ConnectionState.Connected){
    content = <OfflineVideo username={hostName}/>
  } else if (!participant ||  tracks.length === 0){
    content = <LoadingVideo label={connectionState}/>
  } else {
    content = <LiveVideo participant={participant}/>
  }
  return (
    <div className='group aspect-video border-b relative'>
      {content}
    </div>
  )
}

export const VideoSkeleton =()=>{
  return(
    <div className='aspect-video border-x border-background'>
      <Skeleton className='h-full w-full rounded-none'/>
    </div>
  )
}