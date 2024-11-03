// import express from "express";
// import mongoose from "mongoose";
// import Review from "../../models/pharmacy/ReviewSchema.js";
// import { verifyToken } from "../../middleware/verifyToken.js";
// import { protect } from "../../middleware/protect.js";

// const pharmacyReviewRoute = express.Router();

// pharmacyReviewRoute.post("/review/:drugId", verifyToken, async (req, res) => {
//     const { rating, comment } = req.body;
//     const { drugId } = req.params;


//     if (!mongoose.Types.ObjectId.isValid(drugId)) {
//         return res.status(400).json({ error: "Invalid drug ID" });
//     }

//     try {
//         const review = new Review({
//             user: req.user._id,
//             drug: drugId,
//             rating,
//             comment,
//         });

//         const createdReview = await review.save();
//         res.status(201).json(createdReview);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to create review" });
//     }
// });

// pharmacyReviewRoute.get("/:drugId", verifyToken, async (req, res) => {
//     const { drugId } = req.params;

 
//     if (!mongoose.Types.ObjectId.isValid(drugId)) {
//         console.log("Invalid drug ID")
//         return res.status(400).json({ error: "Invalid drug ID" });
//     }

//     try {
//         const review = await Review.find({ drug: drugId }).populate("user", "name");
//         res.json(review);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch reviews" });
//     }
// });

// export default pharmacyReviewRoute;
