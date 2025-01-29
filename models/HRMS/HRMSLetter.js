import mongoose from "mongoose"

const LetterTemplateSchema = new mongoose.Schema({
    title: String,
    content: String,
  });

  export default mongoose.model("LetterTemplate", LetterTemplateSchema)