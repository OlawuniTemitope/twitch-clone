"use client"

import React, { ElementRef, useRef, useState, useTransition } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { updateStream } from "@/actions/stream"
import { toast } from "sonner"
import { UploadDropzone } from "@/lib/uploadthings"
import { useRouter } from "next/navigation"
import { Hint } from "../hint"
import { Trash } from "lucide-react"
import Image from "next/image"

interface InfoProps{
    initialName:string
    initialThumbnailUrl:string | null
}

export const InfoModal = ({
    initialName,
    initialThumbnailUrl,
}:InfoProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const [name, setName] = useState(initialName)
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl)

 const onRemoveThumbnail = () =>{
    startTransition(()=>{
      updateStream({thumbmailUrl:null}).then(()=>{
        toast.success("Thumbnail removed");
        setThumbnailUrl('');
        closeRef.current?.click()
      })
      .catch(()=>toast.error("something went wrong"))
    })
  }
  const onSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    startTransition(()=>{
      updateStream({name:name})
      .then(()=>{
        toast.success("Stream updated")
        closeRef.current?.click()
      })
      .catch(()=>toast.error("Something went wrong"))
    })
  }

  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setName(e.target.value)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
        variant="link" size="sm" className=" ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit stream info
          </DialogTitle>
        </DialogHeader>
        <form
        onSubmit={onSubmit}
         className="space-y-14">
          <div className="space-y-2">
            <Label>
              Name
            </Label>
            <Input 
            placeholder="Stream name"
            onChange={onChange}
            value={name}
            disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>
              Thumbnail
            </Label>
            {thumbnailUrl?(
              <div className="relative aspect-video rounded-xl
              border border-white/10 overflow-hidden">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint asChild label="Remove thumbnail" side="left">
                    <Button
                    type="button"
                    disabled={isPending}
                    onClick={onRemoveThumbnail}
                    className="h-auto w-auto p-1.5">
                      <Trash className="h-4 w-4"/>
                    </Button>
                  </Hint>
                </div>
                <Image
                src={thumbnailUrl}
                alt="Thumbnail"
                fill
                className="object-cover"
                />
              </div>
            ):(
            <div className=" rounded-xl border outline-dashed outline-muted">
              <UploadDropzone
              endpoint="thumbnailUploader"
              appearance={{
                label:{
                  color:"#FFFFFF"
                },
                allowedContent:{
                  color:"#FFFFFF"
                }
              }}
              onClientUploadComplete={(res)=>{
                setThumbnailUrl(res?.[0]?.url)
                router.refresh()
                closeRef.current?.click()
              }}/>
            </div>)}
          </div>
          <div className="flex justify-between">
            <DialogClose
            ref={closeRef}
             asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button
            disabled={isPending}
            variant="primary"
            type="submit" className="">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
