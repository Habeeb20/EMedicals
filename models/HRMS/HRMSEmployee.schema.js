import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        jobRole: { type: String, required: true },
        qualification: { type: String, required: true },
        designation: { type: String, required: true },
        department: { type: String, required: true },
        jobType: { type: String, required: true },
        uniqueNumber: { type: String, unique: true },
        salary: { type: String, required: true },
        picture: { type: String },
        AcctNo:{type:String, required: true},
        Bank:{type:String, required: true},
        AcctName: {type:String, required: true},
        location:{type:String, required: true},
        state:{type:String, required: true},
        LGA:{type: String, required: true},
        DOB:{type:String, required: true},
        complaints:{type:String, enum: ["suspended", "sacked", "dismissed", "serviceNoLongerRequired", "none"], default:"none", required: true },
        reasons:{type:String, required: true},
        onTraining: {type:String, required: true},
        typeOfTraining:{type:String, required: true},
        letters: [
          {
            title: String,
            content: String,
            pdfPath: String,
          },
        ],
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Hrmsauth", required: true }, // Reference to Admin
      },
      { timestamps: true })


  export default mongoose.model("Employee", employeeSchema)
  