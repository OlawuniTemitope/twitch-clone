"use client"

import { useParticipants, useRemoteParticipant } from "@livekit/components-react"
import { UserAvatar, UserAvatarSkeleton } from "../user-avatar"
import { VerifiedMark } from "./verified-mark"
import { UserIcon } from "lucide-react"
import { ActionSkeleton, Actions } from "./actions"
import { Skeleton } from "../ui/skeleton"

interface HeaderProps {
    hostName :string
    hostIdentity:string
    viewerIdentity:string
    imageUrl:string
    isFollowing:boolean
    name:string
}
export const Header = ({
    hostName,
    imageUrl,
    hostIdentity,
    viewerIdentity,
    isFollowing,
    name
}:HeaderProps) => {
  const participants = useParticipants();
  const particicpant = useRemoteParticipant(hostIdentity)

  const isLive = !!particicpant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0
     items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
        imageUrl={imageUrl}
        username={hostName}
        size="lg"
        isLive={isLive}
        showBadge/>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
          <h2 className="text-lg font-semibold">
            {hostName}
          </h2>
          <VerifiedMark/>
          </div>
          <p className="text-small font-semibold">
            {name}
          </p>
          {
            isLive ? (
              <div className="flex font-semibold gap-x-1 items-center text-rose-500
               text-xs">
                <UserIcon/>
                <p>
                  {participantCount} {participantCount === 1 ? "viewr" : "viewers" }
                </p>
               </div>
            ) : (
            <p className="text-xs font-semibold 
            text-muted-foreground">
              offline
            </p>
            )
          }
        </div>
        </div>
        <Actions
        isFollowing = {isFollowing}
        hostIdentity={hostIdentity}
        isHost={isHost}
        />
     </div> 
  )
}


export const HeaderSkeleton = () =>{
 return( 
 <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0
 items-start justify-between px-4"> 
 <div className="flex items-center gap-x-2">
  <UserAvatarSkeleton size="lg"/>
  <div className="space-y-2">
    <Skeleton className=" h-6 w-32"/>
    <Skeleton className=" h-6 w-24"/>
  </div>
 </div>
 <ActionSkeleton/>
 </div>)
}
