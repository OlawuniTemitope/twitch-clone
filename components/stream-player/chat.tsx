"use client"
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import React, { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { ChatHeaderSkeleton, ChatHearder } from './chat-hearder';
import { ChatForm, ChatFormSkeleton } from './chat-form';
import { Skeleton } from '../ui/skeleton';
import { ChatList, ChatListSkeleton } from './chat-list';
import { ChatCommunity } from './chat-community';



interface ChatProps{
    viewerName:string,
    hostName:string,
    hostIdentity:string,
    isFollowing:boolean,
    isChatEnabled:boolean
    isChatDelay:boolean,
    iSChatFollowersOnly:boolean, 
}


export const Chat = ({
    viewerName,
    hostIdentity,
    hostName,
    isFollowing,
    isChatEnabled,
    isChatDelay,
    iSChatFollowersOnly
}:ChatProps) => {
    const matches = useMediaQuery('(max-width:1024px)');
    const {variant, onExpand} = useChatSidebar((state)=>state)
    const connectionState = useConnectionState()
    const participant =useRemoteParticipant(hostIdentity)
    
    const isOnline = participant && connectionState === ConnectionState.Connected 

    const isHidden = !isChatEnabled || !isOnline;

    const [value, setValue] = useState("");
    const {chatMessages:messages, send} = useChat()

    useEffect(()=>{
        if(matches){
            onExpand();
        }
    },[matches,onExpand])

    const reversedMesages = useMemo(()=>{
        return messages.sort((a,b)=>b.timestamp - a.timestamp);
    },[messages])
    const onSubmit = () =>{
        if(!send) return;

        send(value);
        setValue("")
    }

    const onChage = (value:string)=>{
        setValue(value);
    }
  return (
    <div className='flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]'>
        <ChatHearder/>
        {variant === ChatVariant.CHAT &&(
            <>
          <ChatList
            messages={reversedMesages}
            isHidden={isHidden}/>
                <ChatForm
                onSubmit={onSubmit}
                onChange={onChage}
                value = {value}
                isHidden ={isHidden}
                isFollowing = {isFollowing}
                isDelayed ={isChatDelay}
                isFollowersOnly={ iSChatFollowersOnly}
                />
            </>
        )}
        {variant === ChatVariant.COMMUNITY && (
           <ChatCommunity
           viewerName={viewerName}
           hostName={hostName}
           isHidden={isHidden}/>
           )}
    </div>
  )
}

export const ChatSkeleton =()=>{
    return(
        <div className='flex flex-col border-l border-b pt-0 
        h-[calc(100vh-80px)] border-2'>
            <ChatHeaderSkeleton/>
            <ChatListSkeleton/>
            <ChatFormSkeleton/>
        </div>
    )
}