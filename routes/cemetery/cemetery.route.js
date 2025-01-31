import express from "express"
import { loginAdmin, getAllCemetery, getCemeteryProfileById, signupAdmin } from "../../controllers/cemetary/AdminController.js"
import { protect } from "../../middleware/authMiddleware.js"
import { getCemeteries, getCemetery, updateCemetery, deleteCemetery, signup, login, getOtherCemeteryProfile } from "../../controllers/cemetary/cemeteryController.js"
import { uploadDetails } from "../../uploadDetails.js"
const cemeteryRouter= express.Router()


const uploadImages = uploadDetails.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'casketImage', maxCount: 1 },
  { name: 'flowerImage', maxCount: 1 },
  { name: 'verseImage', maxCount: 1 }
]);


// const upload = multer({
//     storage: cloudinaryStorage,
//     limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
//   }).fields([
//     { name: 'profilePicture', maxCount: 1 },
//     { name: 'casketImage', maxCount: 1 },
//     { name: 'flowerImage', maxCount: 1 },
//     { name: 'verseImage', maxCount: 1 }
//   ]);
cemeteryRouter.post('/csignup', uploadImages, signup);

cemeteryRouter.post('/clogin', login);


// cemeteryRouter.post("/clogin", loginAdmin)
// cemeteryRouter.post("/csignup", signupAdmin)

cemeteryRouter.get("/cprofile", protect, getCemetery)
cemeteryRouter.get("/cdetails/:id", getOtherCemeteryProfile)


// Public routes
cemeteryRouter.get('/cgetall', getCemeteries);
// cemeteryRouter.get('/:id',  getCemetery);


cemeteryRouter.put('/cupdate/:id', protect, updateCemetery);
cemeteryRouter.delete('/cdelete/:id', protect, deleteCemetery);




export default cemeteryRouter