import { Suspense } from "react";
import { Result, ResultSkeleton } from "./_component/result";



export default async function Home() {
  return (
    <div className="h-full p-8 max-w-screen-2xl">
      <Suspense fallback={<ResultSkeleton/>}>
      <Result/>
      </Suspense>
    </div>
  )
}

