"use client"
import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { usesidebar } from '@/store/use-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React from 'react'

export const Toggle = () => {
  const {collapsed, onExpand, onCollapse} = usesidebar((state)=>state)
  const label = collapsed ? "Expand" :"Collapsed"

  return (
    <>
    {collapsed && (
      <div className='hidden lg:flex w-full items-center
       justify-center pt-4 mb-4'>
        <Hint asChild label={label} side="right">
        <Button variant="ghost"
        onClick={onExpand}
         className='h-auto p-2'>
          <ArrowRightFromLine className='h-4 w-4'/>
        </Button>
        </Hint>
      </div>
    )}
    {!collapsed &&
    (<div className='p-3 pl-6 mb-2 hidden lg:flex items-center w-full'>
      <p className=' font-semibold text-primary'>
        for you
      </p>
      <Hint label={label} side="right" asChild>
      <Button
      onClick={onCollapse}
      variant="ghost"
      className='h-auto p-2 ml-auto'>
        <ArrowLeftFromLine className='h-4 w-4'/>
      </Button>
      </Hint>
    </div>)}
    </>
  )
}

export const ToggleSkeleton = () =>{
  return (
    <div className='p-3 pl-6 lg:flex items-center w-full justify-center hidden'>
      <Skeleton className='h-6 w-[100px]'/>
      <Skeleton className='h-6 w-6'/>
    </div>
  )
}