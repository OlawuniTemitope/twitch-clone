"use client"

import { Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { InfoModal } from "./info-modal";

interface InfoCardProps{ 
    hostIdentity:string,
    viewerIdentity:string,
    name:string,
    thumbmailUrl:string,
}

export const InfoCard = ({
    name,
    thumbmailUrl,
    hostIdentity,
    viewerIdentity
}:InfoCardProps) => {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    if(!isHost) return null
    
  return (
    <div className="px-4">
        <div className="rounded-xl bg-background">
            <div className="flex items-center gap-x-2.5 p-4">
                <div className="w-auto h-auto p-2 bg-blue-500 rounded-md">
                    <Pencil className="h-5 w-5"/>
                </div>
                <div>
                    <h2 className="text-sm lg:text-lg font-semibold capitalize">
                        Edit your stream info
                    </h2>
                    <p className="lg:text-sm text-xs text-muted-foreground">
                        Maximize your visibility
                    </p>
                </div>
                <InfoModal
                initialName={name}
                initialThumbnailUrl={thumbmailUrl}
                />
            </div>
            <Separator/>
            <div className="p-4 lg:p-6 space-y-4">
                <div>
                    <h3 className="text-sm text-muted-foreground mb-2">
                        name
                    </h3>
                    <p>
                        {name}
                    </p>
                </div>
                <div>
                    <h3 className="text-sm text-muted-foreground mb-2">
                        Thumbnail
                    </h3>
                    <p>
                        {thumbmailUrl && (
                            <div className="relative aspect-video rounded-md
                            w-[220px] overflow-hidden border border-white/10">
                                <Image
                                fill
                                src={thumbmailUrl}
                                alt={name}
                                className="object-cover"
                                />
                            </div>
                        )}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
