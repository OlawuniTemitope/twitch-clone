"use client"

import { cn } from "@/lib/utils"
import { usesidebar } from "@/store/use-sidebar"
import { useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"

interface ContanerProps{
    children:React.ReactNode
}

export const Container = ({children}:ContanerProps) => {
    
    const matches = useMediaQuery("(max-width:1024px)")
    const {collapsed,onCollapse,onExpand} = usesidebar((state)=>state)
    useEffect(() => {
      if(matches){
        onCollapse()
      }
    else{
        onExpand()
    }
    }, [matches,onCollapse,onExpand])
    
    return (
    <div className={cn(
        `flex-1`, collapsed ?
         'ml-[70px]' : 'ml-[70px] sm:ml-60 lg:ml-60'
    )}>
        {children}
    </div>
  )
}
