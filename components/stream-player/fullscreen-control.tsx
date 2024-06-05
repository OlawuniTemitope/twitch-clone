"use client"

interface FullscreenControlProps{
    isFullscreen : boolean;
    onToggle: () => void;
}

import { Maximize, Minimize } from 'lucide-react';
import React from 'react'
import { Hint } from '../hint';

export const FullscreenControl = ({
    isFullscreen,
    onToggle
    }:FullscreenControlProps) => {
        const Icon = isFullscreen ? Minimize : Maximize 

        const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen"

  return (
    <div className='flex items-center justify-center gap-4'>
        <Hint label={label} asChild>
            <button 
            onClick={onToggle}
            className='p-1.5 text-white/10 hover:bg-white/10 rounded-lg'>
                <Icon className=' h-7 w-7 text-white' />
            </button>
        </Hint>
    </div>
  )
}
