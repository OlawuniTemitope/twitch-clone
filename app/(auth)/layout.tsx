import React from 'react'
import { Logo } from './_components/logo'

interface LayoutProps{
    children:React.ReactNode
}

const layout = ({children}:LayoutProps) => {
  return (
    <div className='h-full flex-col flex space-y-6 items-center justify-center'>
      <Logo/>
        {children}
    </div>
  )
}

export default layout