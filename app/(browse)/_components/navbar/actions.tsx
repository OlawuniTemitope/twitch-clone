import { Button } from '@/components/ui/button'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Clapperboard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Actions = async () => {
    const user = await currentUser()
  return (
    <div>
        {!user &&(
            <SignInButton>
                <Button variant="primary">
                    Login
                </Button>
            </SignInButton>
        )}
        {!!user && (
            <div className='flex'>
                <Button size='sm'
                variant="ghost"
                className=' text-muted-foreground hover:text-primary'
                asChild>
                    <Link href={`/u/${user.username}`}>
                        <Clapperboard className='h-5 w-5 lg:mr-2'/>
                        <span className='hidden lg:block'>
                            Dashboard
                        </span>
                    </Link>
                </Button>
                <UserButton afterSignOutUrl='/'/>
            </div>
        )}
    </div>
  )
}
