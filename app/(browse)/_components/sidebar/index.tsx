import React from 'react'
import { Wrapper } from './wrapper'
import { Toggle, ToggleSkeleton } from './toggle'
import { Recommended, RecommendedSkeleton } from './recommended'
import { getRecommended } from '@/lib/recommended-service'
import { getFollowedUsers } from '@/lib/follow-service'
import { Following, FollowingSkeleton } from './following'

export const Sidebar = async () => {
  const recommended = await getRecommended()
  const following = await getFollowedUsers()
  return (
    <Wrapper>
        <Toggle/>
        <div className='pt-4 space-y-4 lg:pt-4'>
          <Following data ={following}/>
          <Recommended data={recommended}/>
        </div>
    </Wrapper>
  )
}

export const SidebarSkeleton =()=>{
  return (
    <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60
     h-full bg-background border-r border-[#202E35] z-50'>
      <ToggleSkeleton/>
      <FollowingSkeleton/>
      <RecommendedSkeleton/>
     </aside>
  )
}