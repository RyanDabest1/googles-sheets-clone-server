const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { client } = require('../utils/dbClient');

router.post('/register', async function(req, res) {
    const { username, email, password } = req.body;

    // Perform validation on input fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide username, email, and password." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Please provide a valid email address." });
    }

    const hashPswd = await bcrypt.hash(password, 9);


        await client.connect();

        const existingUser = await client.db("Sheets").collection("users").findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use." });
        }

        const newUser = {
            username,
            email,
            password: hashPswd,
            created_at: new Date(),
            profileImage: "placeHolder.png",
        };
        const result = await client.db("Sheets").collection("users").insertOne(newUser);
        
        return res.status(201).json({ message: "User created successfully." });
    
});

module.exports = router;
