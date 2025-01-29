import express from "express"
import MortuaryDeath from "../../models/mortuary/MortuaryDeathRecord.js"
import Mortuary from "../../models/mortuary/mortuarySchema.js"
import { verifyToken } from "../../middleware/verifyToken.js"


const mortuaryDeathRouter =express.Router()


mortuaryDeathRouter.post("/postdeath", verifyToken, async(req, res) => {
    const {fullName, causeOfDeath, dateOfDeath, gender} = req.body
    try {
        const death = await Mortuary.find({mortuaryId: req.user.id})
        if(!death) return res.status(404).json({message: "mortuary not found"})

        const newDeath = new MortuaryDeath({
            fullName,
            causeOfDeath,
            dateOfDeath,
            gender,
            mortuaryId: req.user.id
    })

        await newDeath.save()
        return res.status(200).json({message: "your data has been recorded"})
    } catch (error) {
        console.log(error)   
        return res.status(500).json({message: "an error occured with the network"})
    }
})


mortuaryDeathRouter.get("/getdeath", verifyToken, async(req, res) => {
    try {
        const death = await MortuaryDeath.find({mortuaryId: req.user.id})
        if(!death) return res.status(404).json({message: "mortuary not found"})
        return res.status(200).json(death)
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "an error occurred"})
    }
})

mortuaryDeathRouter.get("/getAllDeath", async(req, res) => {
    try {
        const death = await MortuaryDeath.find({})
        return res.status(200).json(death)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "an error occurred "})
    }
})


mortuaryDeathRouter.delete("/deletedeath/:id", verifyToken, async(req, res) => {
    try {
        const death = await MortuaryDeath.findByIdAndDelete({_id: req.params.id, mortuaryId:req.user.id})
        if(!death) return res.staus(404).json({message: "you are not eligible to delete because you are not authorized"})

        return res.status(200).json({message:"you have successfully deleted it"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
})

export default mortuaryDeathRouter