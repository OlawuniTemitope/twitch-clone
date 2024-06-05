
interface ResultProps {
    term?:string
}

export const Results = async ({
    term
}:ResultProps) => {

    const data = await getSearch(term);
  return (
    <div>
        <h2 className="mb-4 text-lg font-semibold">
            Results for term &quot;{term}&quot;
        </h2>
        {data.length === 0 && (
            <p className='text-sm text-muted-foreground'>
                No result found. Try searching for something else.
            </p>
        )}
        <div className='flex flex-col gap-y-4'>
            {data.map((result)=>(
                <ResultCard data={result}/>
            ))}
        </div>
    </div> 
  )
}

import { getSearch } from '@/lib/search-service'
import React from 'react'
import { ResultCard, ResultCardSkeleton } from './result-card';
import { Skeleton } from '@/components/ui/skeleton';

export const ResultsSkeleton = () => {
  return (
    <div>
        <Skeleton className='h-8 w-[290px] mb-4'/>
        <div className='flex flex-col gap-y-4'>
            {[...Array(4)].map((_, i)=>(
                <ResultCardSkeleton key={i}/>
            ))}
        </div>
    </div>
  )
}
