import { Check } from 'lucide-react'
import React from 'react'

export const VerifiedMark = () => {
  return (
    <div className='p-0.5 items-center justify-center h-4
    w-4 rounded-full bg-blue-600'>
      <Check className='h-[10px] w-[10px] mt-0.5 text-primary
      stroke-[4px]'/>
    </div>
  )
}
