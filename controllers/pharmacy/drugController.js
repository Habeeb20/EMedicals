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
    const drugs = await Drug.find({ pharmacistId: req.user.id });

    if (drugs.length > 0) {
      res.status(200).json(drugs);
    } else {
      res.status(404).json({ message: "No drugs found for this pharmacist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while retrieving drugs" });
  }
};


export const updateDrug = async(req, res) => {
  try {
    const {name, description,category, price,stock} = req.body

    const drug = await Drug.findById(req.params.id)

    if(drug){
      drug.name = name || drug.name;
      drug.description = description || drug.description;
      drug.category = category || drug.category;
      drug.price = price || drug.price;
      drug.stock = stock || drug.stock;

      const updatedDrug = await drug.save();
      res.json(updatedDrug);
    }
  } catch (error) {
    res.status(404).json({ message: 'Drug not found' });
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
  const { name, description, price, category, stock,  requiresPrescription } = req.body;

 try {
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  const profilePicture = result.secure_url;
  const drug = new Drug({
    name,
    description,
    price,
    category,
    stock,
    profilePicture,
    requiresPrescription,
  });

  const createdDrug = await drug.save();
  res.status(201).json(createdDrug);

 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong during registration' });
 }
}