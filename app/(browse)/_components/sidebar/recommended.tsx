"use client"
import { usesidebar } from '@/store/use-sidebar'
import {  User } from '@prisma/client'
import React from 'react'
import { UserItem, UserItemSkeleton } from './user-item'
interface RecommendedProps{
    data:(User & {
        stream:{isLive:boolean} | null
    })[]
}
export const Recommended = ({
    data
}:RecommendedProps) => {
    const {collapsed} = usesidebar((state)=>state)
    const showLabel = !collapsed && data.length > 0
    return (
    <div>
        {!collapsed && (
            <div className='pl-6 mb-4'>
                <p className='text-sm text-muted-foreground'>
                    Recommended
                </p>
            </div>
        )}
        <ul className='space-y-2 px-2'>
            {data.map((user)=>(
                <UserItem key={user.id}
                username={user.username}
                imageUrl = {user.imageUrl}
                isLive={user.stream?.isLive}
                />
            ))}
        </ul>
    </div>
  )
}

export const RecommendedSkeleton = () =>{
    return(
        <ul className='px-2'>
            {[...Array(3)].map((_,i)=>(
                <UserItemSkeleton/>
            ))}
        </ul>
    )
}