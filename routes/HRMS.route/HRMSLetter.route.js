import express from "express"
import LetterTemplate from "../../models/HRMS/HRMSLetter.js"
import Employee from "../../models/HRMS/HRMSEmployee.schema.js"
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { verifyToken } from "../../middleware/verifyToken.js";


const hrmsLetterRouter = express.Router()


hrmsLetterRouter.post("/templates", verifyToken,  async(req, res) => {
    const {title, content} = req.body;
    const newTemplate = new LetterTemplate({title,content})
    await newTemplate.save();
    res.json(newTemplate);
})


hrmsLetterRouter.post("/generate", verifyToken, async(req, res) => {
    const {employeeId, templateId} = req.body

    const employee = await Employee.findById(employeeId);
  const template = await LetterTemplate.findById(templateId);

  if (!employee || !template) {
    return res.status(400).json({ message: "Invalid Employee or Template" });
  }

  let letterContent = template.content.replace("{employee_name}", employee.firstname);


  const pdfPath = `uploads/${employee.firstname}_${template.title}.pdf`;
  const pdfDoc = new PDFDocument();
  pdfDoc.pipe(fs.createWriteStream(pdfPath));
  pdfDoc.text(letterContent, 100, 100);
  pdfDoc.end();

  // Attach letter to employee
  employee.letters.push({ title: template.title, content: letterContent, pdfPath });
  await employee.save();

  res.json({ message: "Letter generated successfully", pdfPath });
})



export default hrmsLetterRouter