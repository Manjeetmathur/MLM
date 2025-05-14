import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
       cloud_name : "dtwftajii",
       api_key : "462968465744638",
       api_secret : "fUxqQQWJEQ3h3ZxCuHiXNiVXRcA"
})

const uploadOnCloudinary = async(localPath) => {
       try {
              if(!localPath){
                     return null
              }
              const response =await cloudinary
                                   .uploader
                                   .upload(localPath,{
                                          resource_type : "auto"
                                   })
              fs.unlinkSync(localPath)
              return response;
                                                 
       } catch (error) {
              return null
       }
}

const deleteOnCloudinary = async(fileId) => {
      try {
       if(fileId ){
              return null;
       }
       const response = cloudinary.uploader.destroy(fileId,{resource_type : "auto"})
       return response       
      } catch (error) {
              return null;
      }
}

export {uploadOnCloudinary,deleteOnCloudinary};