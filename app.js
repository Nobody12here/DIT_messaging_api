const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { sendMail } = require("./utils");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Generic SMS sending function
async function sendSms(messageType, details) {
    if (!messageType || !details) {
        throw new Error("Invalid input");
    }

    let message = "";
    
    if (messageType === "presale") {
        const { ditAmount, usdtAmount, crypto, cryptoAmount, walletAddress } = details;
        if (!ditAmount || !usdtAmount || !crypto || !cryptoAmount || !walletAddress) {
            throw new Error("Missing required fields for presale");
        }
        message = `Diamond Tokens Ordered\nNumber of DIT: ${ditAmount} DIT\nOrder Amount: ${usdtAmount} USDT\nCrypto: ${crypto}\nAmount: ${cryptoAmount} ${crypto}\nWallet to send the DIT to: ${walletAddress}`;
    } 
    else if (messageType === "nft-reward") {
        const { email, ditAmount, walletAddress, nftType } = details;
        if (!email || !ditAmount || !walletAddress || !nftType) {
            throw new Error("Missing required fields for NFT reward");
        }
        message = `NFT Reward Claimed\nEmail: ${email}\nDIT Amount: ${ditAmount}\nWallet Address: ${walletAddress}\nNFT Type: ${nftType}`;
    } 
    else if (messageType === "membership") {
        const { crypto_currency, email, quantity, receiver_address, usdt_amount } = details;
        if (!crypto_currency || !email || !quantity || !receiver_address || !usdt_amount) {
            throw new Error("Missing required fields for membership");
        }

        message = `Membership Purchased\nEmail: ${email}\n\nQuantity: ${quantity}\nUSDT Amount: ${usdt_amount}\nCrypto: ${crypto_currency}\nReceiver Address: ${receiver_address}\n`;
    }
    else {
        throw new Error("Invalid message type");
    }

    try {
        const data = {
            "to": ["+46731833333", "+46736550520"],
            "body": message,
            "encoding": "UNICODE",
            "longMessageMaxParts": "30",
        };

        const response = await axios.post("https://api.bulksms.com/v1/messages", data, {
            headers: {
                "Authorization": " Basic RTg1QjcxNjMyRTYyNEIyNjg1NEQ0QjYyMUQwNjQzMUEtMDItMzo4OVV5ZExtTGYzNEg3Z2xBVU9TMWlqIXNycVNWbA==",
                "Content-Type": "application/json"
            }
        });

        console.log("SMS Sent Successfully:", response.data);
        return response.data;
    } catch (err) {
        console.error("Error Sending SMS:", err.response ? err.response.data : err.message);
        throw err;
    }
}
app.get("/",async(req,res)=>{
    res.json("Hello world")
})
// API Endpoint to send presale SMS
app.post("/send-presale-sms", async (req, res) => {
    try {
        const { ditAmount, usdtAmount, crypto, cryptoAmount, walletAddress } = req.body;

        if (!ditAmount || !usdtAmount || !crypto || !cryptoAmount || !walletAddress) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const response = await sendSms("presale", {
            ditAmount,
            usdtAmount,
            crypto,
            cryptoAmount,
            walletAddress
        });
        
        res.status(200).json({ message: "Presale SMS sent successfully", data: response });
    } catch (error) {
        res.status(500).json({ error: error.message || "Failed to send SMS" });
    }
});

// API Endpoint to send NFT reward SMS
app.post("/send-nft-sms", async (req, res) => {
    try {
        const { email, ditAmount, walletAddress, nftType } = req.body;

        if (!email || !ditAmount || !walletAddress || !nftType) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const response = await sendSms("nft-reward", {
            email,
            ditAmount,
            walletAddress,
            nftType
        });
        
        res.status(200).json({ message: "NFT reward SMS sent successfully", data: response });
    } catch (error) {
        res.status(500).json({ error: error.message || "Failed to send SMS" });
    }
});

app.post("/send-email", async (req, res) => {
    try {
        const { email, text } = req.body;
        if (!email || !text) {
             res.status(400).json({ error: "No email or text" })
        }

        sendMail(email, text)
         res.status(200).json({ message: "Email sent sucessfully" })
    } catch (error) {
         res.status(400).json({ error: "Some error occured" })
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// API Endpoint to send membership SMS
app.post("/send-membership-sms", async (req, res) => {
    try {
        const { crypto_currency, email, quantity, receiver_address, usdt_amount } = req.body;

       
        if(!crypto_currency || !email || !quantity || !receiver_address || !usdt_amount){
            res.status(400).json({message:"Some fields are required!"})
        }
        const response = await sendSms("membership", {
            crypto_currency,
            email,
            quantity,
            receiver_address,
            usdt_amount
        });
        
        res.status(200).json({ message: "Membership SMS sent successfully", data: response });
    } catch (error) {
        res.status(500).json({ error: error.message || "Failed to send SMS" });
    }
});