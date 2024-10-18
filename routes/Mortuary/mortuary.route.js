import express from "express"
import { login,signup,logout, verifyEmail,forgotPassword,resetPassword,deleteUserAccount,updateUserProfile,getUserProfile,checkAuth,getAllLeaders,getleaderscounts,getOtherUserProfile,isVerifiedLeader } from "../../controllers/mortuary/mortuary.controller.js"
import {verifyToken} from "../../middleware/verifyToken.js"
import upload from "../../upload.js"

const mortuaryrouter = express.Router();


mortuaryrouter.get("/mcheck-auth", verifyToken, checkAuth)
mortuaryrouter.post("/msignup", upload, signup)
mortuaryrouter.post("/mlogin", login)
mortuaryrouter.post('/mlogout', logout);
mortuaryrouter.post('/mverify-email', verifyEmail)
mortuaryrouter.post('/mforgot-password', forgotPassword)
mortuaryrouter.post('/mreset-password/:token', resetPassword)
mortuaryrouter.put("/medit", verifyToken, updateUserProfile)
mortuaryrouter.delete("/mdeleteacount", verifyToken, deleteUserAccount)
mortuaryrouter.get("/getprofile", verifyToken, getUserProfile)
mortuaryrouter.get("/getallmortuary", getAllLeaders)
mortuaryrouter.get("/getleaderscount", getleaderscounts)
mortuaryrouter.get("/mortuarydetails/:id", getOtherUserProfile )
mortuaryrouter.get('/mortuaryisverified/:id', isVerifiedLeader)


export default mortuaryrouter