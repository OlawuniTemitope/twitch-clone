import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const font = Poppins({
    subsets:["latin"],
    weight:["200",'300','400','500','600','700']
})

export const Logo = () => {
  return (
  
    <div className='flex flex-col items-center gap-y-4'>
      <div className='bg-white rounded-full p-1'>
      <Image src="/gamelogo.png" 
      alt='Gamehub' height="80" 
      width="80"/>
      </div>
    </div>
  
  )
}
