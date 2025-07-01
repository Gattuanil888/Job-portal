import Company from "../models/company.js";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

 export const registerCompany = async(req , res) =>{
 
    const {name , email , password} = req.body; 

      const imageFile = req.file;

      if(!name || !email || !password || !imageFile){
         console.log("DEBUG:", { name, email, password, imageFile });
          return res.json({success:false , message:"Missing Details" })
      }
        try{
         const companyExists = await Company.findOne({ email})
          if(companyExists){
          
        return res.json({success:false , message:"Company Already Exists"})

        }


     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password , salt);

     const imageUpload = await cloudinary.uploader.upload(imageFile.path)

     const company = new Company({
           name,
           email,
           password: hashedPassword,
           image: imageUpload.secure_url
     })
      await company.save();
      res.json({
        success:true ,
        company:{
            _id :company._id ,
            name:company.name ,
            email:company.email ,
            image:company.image
        },
 

 token : generateToken(company._id),

      });
      
     } catch(error){
       console.log("Register Error:",error.message)
            res.json({success: false , message: error.message})
       
     }
        }

//company login

export const loginCompany = async (req, res) => {


  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getCompanyData = async ( req , res) => {
     
  
  try {
       const company = req.company
      
        res.json({ success:true , company:company})
     } catch (error) {
       res.json ({ success: false, message: error.message });
     }

}
//post new job

export const postJob = async (req,res) =>{
     
    const { title, description, location, salary, category, level } = req.body;
    const companyId = req.company._id

    console.log(companyId ,{title , description, location,salary, category});

    try {
    const newJob =  new Job({
      title,
      description,
      location,
      salary,
      category,
      level,
      date: Date.now(),
      visible: true,
      companyId,
    });

     await newJob.save()

     res.json({ success:true , newJob ,message: "Job posted successfully"})

    }
    catch(error){
        res.json ({ success: false , message: error.message})
    }


} 
//get comapny job applications

export const getCompanyJobApplicants = async (req,res) => {
     
     try {

        const companyId = req.company._id;

        console.log("Company ID from token:", companyId);
        //find job applications for user and populate related data
      
     const  applications = await JobApplication.find({companyId})
     .populate('userId','name image resume')
     .populate('jobId','title location , category level salary')
      .exec()
           

         console.log("📦 Applications found:", applications.length);


       if (!applications || applications.length === 0) {
      return res.json({ success: false, message: "No applications found" });
    }

        return res.json({ success:true , applications})

     } catch (error) {
         console.error("❌ Error in getCompanyJobApplicants:", error.message);
       res.json({success:false,message:error.message})
     }

}

//get company posted jobs

export const getCompanyPostedJobs = async (req ,res) => {


     try {
        
       const companyId = req.company._id

       const jobs = await Job.find({companyId})
         //todo add no.of applicanta
         const jobsData = await Promise.all(jobs.map(async (job) =>{
               const applicants = await JobApplication.find({jobId: job._id});
               return{...job.toObject(),applicants: applicants.length}
         } ))

         res.json({ success:true , jobsData, message: "Jobs found"})

      } catch (error) {
        res.json({ success: false, message: error.message })
      }
}

//change job applications status
export const ChangeJobApplicationsStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const updatedApplication = await JobApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.json({ success: false, message: "Application not found" });
    }

    res.json({
      success: true,
      message: "Application status updated",
      updatedApplication,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// change job visibilaty
export const ChangeVisiblity = async (req ,res) => {
    
    try {
      
   const {id} = req.body

   const companyId = req.company._id

   const job = await Job.findById(id)


     if(companyId.toString() == job.companyId.toString()){
        job.visible = !job.visible
     }
        await job.save()

        res.json({ success: true, job})

    } catch (error) {
      
       res.json({
           success: false,
           message : error.message
       })
    }
}

export const updateCompanyLogo = async (req, res) => {
  try {
    const companyId = req.company._id;
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ success: false, message: "No image file provided" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    const company = await Company.findById(companyId);

    company.image = imageUpload.secure_url;
    await company.save();

    res.json({
      success: true,
      message: "Company logo updated successfully",
      company,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
