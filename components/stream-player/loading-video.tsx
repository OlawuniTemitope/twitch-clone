import { Loader } from "lucide-react"


interface LoadingProps{
    label: string
}

export const LoadingVideo = ({
    label
}:LoadingProps) => {
  return (
    <div className="h-full flex flex-col space-y-4
     justify-center items-center">
        <Loader className="h-10 w-10 animate-spin text-muted-foreground"/>
        <p className=" capitalize text-muted-foreground">
            {label}
        </p>
     </div>
  )
}
