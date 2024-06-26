import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  thumbnailUploader:
   f({ image: 
    { maxFileSize: "4MB",maxFileCount:1 } })
    .middleware(async()=>{
        const self = await getSelf();
        return {user:self}
    }).onUploadComplete(async({metadata,file})=>{
      await db.stream.update({
        where:{
          userId: metadata.user.id
        },
        data:{
          thumbmailUrl:file.url
        }
      })
      // console.log(file.url)
      return {fileUrl : file.url};
    })
    // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
      // This code runs on your server before upload
      // const user = await auth(req);
 
      // If you throw, the user will not be able to upload
      // if (!user) throw new UploadThingError("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      // return { userId: user.id };
    // })
    // .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata.userId);
 
      // console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      // return { fileUrl: fileURLToPath.url };
    // }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;