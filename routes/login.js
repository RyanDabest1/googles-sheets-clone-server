const express = require('express');
const router = express.Router();
const { client } = require('../utils/dbClient');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

router.post('/login', async function(req,res){
    const {username, password} = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: "Please provide username and password." });
    }
    await client.connect();

    try {
        const user = await client.db("Sheets").collection("users").findOne({username});
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password." });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password." });
        }
        const token = jwt.sign({ username: user.username }, 'DaSheet');
        res.status(200).json({ token, userId : user._id });

    } catch(error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error." });
    }
})

module.exports = router;