import {JwtPayload, jwtDecode} from "jwt-decode"
import { createViewerToken } from "@/actions/token";
import { useEffect, useState } from "react"
import { toast } from "sonner";


export const useViewerToken = (hostIdentity:string) =>{
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");

    useEffect(()=>{
        const createToken = async ()=>{
            try {
                const viewerToken = await createViewerToken(hostIdentity);
                setToken(viewerToken)

                const decodeodToken = jwtDecode(viewerToken) as JwtPayload & {
                    name? : string, identity:string}

                const name = decodeodToken?.name
                const  identity = decodeodToken.sub

                if(identity){
                    setIdentity(identity);
                }

                if(name){
                    setName(name)
                }
            } catch {
                toast.error("Something went wrong")
            }
        }
        createToken()
    },[hostIdentity])
    return  {
        token,
        identity,
        name,
    }
}