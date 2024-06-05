import { BioModal } from "./bio-modal"
import { VerifiedMark } from "./verified-mark"


interface AboutCardProps {
    
    hostName:string,
    hostIdentity:string,
    followedByCount:number,
    viewerIdentity:string,
    bio:string | null,
   
}

export const AboutCard = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    followedByCount,
    bio
}:AboutCardProps) => {
    const hostAsViewer = `host-${hostIdentity}`;
    console.log({viewerIdentity,hostAsViewer,hostIdentity})
    const isHost = viewerIdentity === hostAsViewer
    const followedByLabel = followedByCount === 
    1 ? "follower" : "follower"
  return (
    <div className="px-4">
        <div className="group rounded-xl bg-background flex-col gap-y-3
        p-6 lg:p-10 flex">
            <div className="flex items-center gap-x-2
            text-lg font-semibold">
                About {hostName}
                <VerifiedMark/>
            </div>
            {isHost && (
                <BioModal initialValue={bio}/>
            )}
        </div>
        <div className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">
                {followedByCount}</span> { followedByLabel}
        </div>
        <p className="text-small">
            {bio || "This user prefer to keep an air of mystry about them"}
        </p>
    </div>
  )
}
