import Drug from '../../models/pharmacy/pDrugs.mode.js';
import cloudinary from "cloudinary"



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})

export const getDrugs = async (req, res) => {
  const drugs = await Drug.find({});
  res.json(drugs);
};

export const getAdrug = async(req, res) => {
  const drug = await Drug.findById(req.params.id)

  if(drug){
    res.json(drug);
  }else {
    console.log("drug not found")
    res.status(404).json({message: "Drug not found"})
  }
}

export const getDrugsForAPharmacist = async (req, res) => {
  try {
    console.log(req.user.id)
    const drugs = await Drug.find({ pharmacistId: req.user.id });
    console.log(drugs)

    if (drugs.length > 0) {
      res.status(200).json(drugs);
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while retrieving drugs" });
  }
};


export const updateDrug = async(req, res) => {
  const { stock } = req.body;

    try {
        const drug = await Drug.findById(req.params.id);
        if (drug.pharmacyId.toString() !== req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
        } else {
            drug.stock = stock;
            await drug.save();
            res.json(drug);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteDrug = async(req, res) => {
  const drug = await Drug.findById(req.params.id);

  if (drug) {
      await drug.remove();
      res.json({ message: 'Drug removed' });
  } else {
      res.status(404).json({ message: 'Drug not found' });
  }
}

export const addDrug = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const pharmacyId = req.user.id;
  let image = ""; // Default value for image

  try {
    // Cloudinary file upload function
    const uploadFile = async (file) => {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "pharmacy-drugs",
      });
      return result.secure_url;
    };

    // Handle file upload if present
    if (req.files && req.files.image) {
      image = await uploadFile(req.files.image);
    }

    // Create drug in the database
    const drug = await Drug.create({
      pharmacyId,
      name,
      description,
      price,
      stock,
      image,
    });

    res.status(201).json(drug);
  } catch (error) {
    console.error("Error adding drug:", error);
    res.status(500).json({ message: error.message || "Something went wrong during drug registration" });
  }
};
