const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { sendMail } = require("./utils");
require("dotenv").config();

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());


async function sendSms(ditAmount, usdtAmount, crypto, cryptoAmount, walletAddress) {
    if (!ditAmount || !usdtAmount || !crypto || !cryptoAmount || !walletAddress) {
        throw new Error("Invalid input");
    }

    const message = `Diamond Tokens Ordered\nNumber of DIT: ${ditAmount} DIT\nOrder Amount: ${usdtAmount} USDT\nCrypto: ${crypto}\nAmount: ${cryptoAmount} ${crypto}\nWallet to send the DIT to: ${walletAddress}`;

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

// API Endpoint to send SMS
app.post("/send-sms", async (req, res) => {
    try {
        const { ditAmount, usdtAmount, crypto, cryptoAmount, walletAddress } = req.body;

        if (!ditAmount || !usdtAmount || !crypto || !cryptoAmount || !walletAddress) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const response = await sendSms(ditAmount, usdtAmount, crypto, cryptoAmount, walletAddress);
        res.status(200).json({ message: "SMS sent successfully", data: response });
    } catch (error) {
        res.status(500).json({ error: "Failed to send SMS" });
    }
});
post("/send-emai", async (req, res) => {
    try {
        const { email, text } = req.body;
        if (!email || !text) {
            return res.status(400).json({ error: "No email or text" })

        }

        sendMail(email, text)
        return res.status(200).json({ message: "Email sent sucessfully" })
    } catch (error) {
        return res.status(400).json({ error: "Some error occured" })
    }
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
