import express from "express"
import Deceased from "../../models/hospitals/deathRecordSchema.js"
import Hospital from "../../models/hospitals/userSchema.js"
import { verifyToken } from "../../middleware/verifyToken.js"

const deathRecordRouter = express.Router()

deathRecordRouter.post("/addDeceased", verifyToken, async(req, res) => {
 
    const {fullName, causeOfDeath, dateOfDeath, gender} = req.body;
    try {
        const hospital = await Hospital.find({hospitalId: req.user.id})
        if(!hospital){
            return res.status(404).json({message: "hospital not found"})
        }


        const deceased = new Deceased({
            fullName,
            causeOfDeath,
            dateOfDeath,
            gender,
            hospitalId: req.user.id
        })
        await deceased.save()
        return res.status(200).json({message: "created successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})


deathRecordRouter.get("/getdeceased", verifyToken, async(req, res) => {
    try {
        const deathRecord = await Deceased.find({hospitalId: req.user.id, })
        if(!deathRecord) return res.status(404).json({message: "hospital not found"})

        return res.status(200).json(deathRecord)
    } catch (error) {
        console.log(error)
      return res.status(500).json({message: "not found"})   
      
    }
})



deathRecordRouter.get("/getdeathrecord", async(req, res) => {
    try {
        const deathRecord = await Deceased.find({}).populate("hospitalId", "name")
        if(!deathRecord) return res.status(404).json({message: "death record not found"})

        return res.status(200).json(deathRecord)
    } catch (error) {
        console.log(error)
      return res.status(500).json({message: "not found"})   
      
    }
})


export default deathRecordRouter