"use client"
import { useUser } from "@clerk/nextjs"
import { Fullscreen, KeyRound, MessageSquare, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { NavItemSkeleton, Navitem } from "./nav-item"


export const Navigation = () => {
  const pathname = usePathname()
  const {user} = useUser()

  const routes = [
  {
    label : "stream",
    href:`/u/${user?.username}`,
    icon: Fullscreen
  },
  {
    label : "key",
    href:`/u/${user?.username}/keys`,
    icon: KeyRound
  },
  {
    label : "chat",
    href:`/u/${user?.username}/chat`,
    icon: MessageSquare
  },
  {
    label : "community",
    href:`/u/${user?.username}/community`,
    icon: User
  },
  ];
  if(!user?.username){
    return(
    <ul className="space-y-2">
      {[...Array(4)].map((_,i)=>(
        <NavItemSkeleton key={i}/>
      ))}
    </ul>)
  }
  return (
    <ul className="space-y-2 px-2 pt-4  lg:pt-0">{routes.map((route)=>(
    <Navitem
    key={route.href}
    label={route.label}
    icon={route.icon}
    href={route.href}
    isActive={pathname===route.href}/>  
    ))}</ul>
  )
}
