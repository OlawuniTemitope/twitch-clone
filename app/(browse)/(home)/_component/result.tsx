import { getStream } from "@/lib/feed-service"
import { ResultCard, ResultCardSkeleton } from "./result-card"
import { Skeleton } from "@/components/ui/skeleton"

 

export const Result = async () => {
    const data = await getStream()
  return (
    <div>
        <h2 className="text-lg font-semibold mb-4">
            Stream we think you'll like
        </h2>
        {data.length===0 && (
            <div className=" text-muted-foreground text-sm">
                No stream found
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {data.map((result)=>(
                <ResultCard
                key={result.id}
                data={result}
                />
                       ))}
        </div>
    </div>
  )
}


export const ResultSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4"/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {[...Array(4)].map((_,i)=>(
            <ResultCardSkeleton key={i}/>
          ))}
        </div>
    </div>
  )
}