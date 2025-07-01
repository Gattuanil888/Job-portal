import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({

      userId: { type: String, ref:'User',requried:true},
      companyId:{ type:mongoose.Schema.Types.ObjectId, ref:'Company', requried:true},
    jobId:{ type:mongoose.Schema.Types.ObjectId, ref:'Job', requried:true},
    status:{ type:String ,default:'pending'},
     date: { type:Number, requried:true}
})

const JobApplication = mongoose.model('JobApplication',JobApplicationSchema)

export default JobApplication