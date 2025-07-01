import JobApplication from "../models/JobApplication.js";
import User  from "../models/User.js";
import Job from "../models/Job.js";
import { v2 as cloudinary} from "cloudinary"



// get user data
export const getUserData = async(req, res) =>{
     
        const userId = req.auth.userId;

    try{
        
       const user = await User.findById(userId)

     
       if( !user){
          
        return res.json({ success: false, message: "User not found" })
       }

  res.json({ success:true ,user})

    }
    catch(error){
      
         res.json({success:false, messege:error.message})
    }

}
//apply job
export const applyForJob = async (req , res)=>{

 const { jobId}= req.body

 const userId = req.auth.userId
console.log("applyForJob called with userId:", req.auth.userId, "jobId:", req.body.jobId);


     try {
        const isAlreadyApplied = await JobApplication.find({jobId,userId})

    
         if(isAlreadyApplied.length >0){

            return res.json({ success:false , messege:'Already Applied'})
         }

         const jobData = await Job.findById(jobId)
 

         if(!jobData){

            return res.json({
                success:false ,
                message: 'Job not found'
            })
         }
         await JobApplication.create({

              companyId: jobData.companyId,
              userId,
              jobId,
              date:Date.now()
 })


  res.json({ success: true, message: 'Job applied successfully' });
  } catch(error) {
    res.status(500).json({ success: false, message: error.message });
  }

};

//get user applied appicants

export const getUserJobApplications = async(req, res)=>{
     console.log("Fetching applications for user:", req.auth.userId);


    try {
        
     const userId = req.auth.userId

     const applications = await JobApplication.find({userId})
     .populate('companyId','name email image',)
     .populate('jobId','title description location category level salary')

     .exec()

     console.log("Applications found:", applications);

     if(!applications || applications.length ===0){

        return res.json({ 
            success:false ,
            message: 'No application found'
        })
     }

     return res.json({
         success:true,
         applications,
     })

    } catch (error) {
        
        res.json({
            success: false,
            message: error.message
        })
    }

}

//update user profile(resume)

export const updateUserResume = async(req,res) =>{
    
    try {
     
        const userId = req.auth.userId

        const selectedFile = req.file

        const userData = await User.findById(userId)

          if(selectedFile){
            const resumeUpload = await cloudinary.uploader.upload(selectedFile.path)
            userData.resume = resumeUpload.secure_url
          }

      await userData.save()

      return res.json({

           success:true,
           message: 'Resume updated successfully',
      })


    } catch (error) {
        
        res.json({
            success: false,
            message: error.message
        })
    }
}