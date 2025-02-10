import Payment from "../../models/medicalPhamarcy/PharmacyPayment.js"
import express from "express"
import crypto from "crypto"
import axios from "axios"


const pharmcacypayment = express.Router()


pharmcacypayment.post("/paystack/pay", async(req, res) => {
    const { email, amount } = req.body;
    
    const reference = crypto.randomBytes(12).toString('hex');
    const data = {
        email,
        amount: amount * 100, 
        reference,
     callback_url: `${process.env.CLIENT_URL}/phverifypayment`

    }

    try {
     
        const response = await axios.post('https://api.paystack.co/transaction/initialize', data, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            }
        });
  

        const payment = new Payment({ email, amount, reference, status: 'pending' });
        await payment.save();

        res.status(200).json({
            authorization_url: response.data.data.authorization_url,
          });
      
        
  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Payment initialization failed', error: error.message });
    }
})


pharmcacypayment.get("/paystack/verify", async(req, res) => {
    const {reference} = req.query;


    if (!reference) {
      console.log("reference is missing")
      return res.status(400).send("Reference is missing.");
  }
  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`,{
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
    })
    const paymentData = response.data.data;
  
    if (paymentData.status === "success") {
  
      await Payment.findOneAndUpdate(
        { reference },
        { status: "success" },
        { new: true }
      );
      console.log("payment successful")
      res.json({ redirectUrl: `${process.env.CLIENT_URL}/medicalpharmacylogin` });
      } else {
          console.log('payment failed')
        res.json({redirectUrl: `${process.env.CLIENT_URL}/phpayment-failed?reference=${reference}`});
      }
    } catch (error) {
  
        console.error("Payment verification error:", error);
        res.json({redirect:`${process.env.CLIENT_URL}/payment-failed?error=${error.message}`})
    }
})


export default pharmcacypayment