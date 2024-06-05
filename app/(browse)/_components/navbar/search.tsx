"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React, { useState } from 'react'

export const  Search = () => {
    const [value, setValue] =useState("")
    const router = useRouter()
    const onSubmit = (e:React.FormEvent<HTMLElement>)=>{
        e.preventDefault();
        if(!value) return
        const url = queryString.stringifyUrl({
            url:"/search",
            query:{term:value},},
            {skipEmptyString:true}
        );
        router.push(url)
    }
    const onClear =()=>{
        setValue("")
    }
  return (
    <form 
    onSubmit={onSubmit}
    className='relative w-full lg:w-[400px] flex'>
        <Input
        value={value}
        onChange={(e)=>setValue(e.target.value)} 
        placeholder='Search'
        className='rounded-r-none focus-visible:ring-0
         focus-visible:ring-transparent focus-visible:ring-offset-0'/>
         {value && <X onClick={onClear}
          className='absolute top-2.5 right-14 h-5 w-5 text-muted-foreground
           cursor-pointer hover:opacity-75 transition h-'/>}
        <Button type='submit'
        size='sm' 
        variant="secondary"
        className=' rounded-l-none'>
            <SearchIcon 
            className='h-5 w-5 text-muted-foreground'/>
            
        </Button>
    </form>
  )
}
