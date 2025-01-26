import express from "express"
import Holiday from "../../models/HRMS/HRMSholiday.schema.js"
import { verifyToken } from "../../middleware/verifyToken.js"


const hrmsHolidayRouter = express.Router()


hrmsHolidayRouter.post("/holidays", verifyToken, async(req, res) => {
    const {title, description} = req.body

    try {
        const holiday = await Holiday.findOne({adminId: req.user.id, title})
        if(!holiday) return res.status(404).json({message: "holiday with this title already exist"})

        const date = new Date().toLocaleDateString()

        const holidays = new Holiday({
            title,
            adminId:req.user.id,
            description,
            date
        })

        await holidays.save()
        return res.status(200).json({message: "successfully saved"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
})


hrmsHolidayRouter.get("/getholidays", verifyToken, async(req, res) => {
    try {
        const holiday = await Holiday.findOne({adminId:req.user.id})
        if(!holiday)return res.status(404).json({message: "not found"})
        return res.status(200).json(holiday)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "an error occured"})
    }
})



export default hrmsHolidayRouter