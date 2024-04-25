const express = require('express');
const router = express.Router();
const { client } = require('../utils/dbClient');
const { ObjectId } = require('mongodb'); 

router.get('/getSheetInfo', async function(req, res) {
    const {calcId, userId} = req.query;

  
    if (!calcId) {
        return res.status(400).json({ error: 'calcId is required' });
    }

    try {
        await client.connect();
        const database = client.db('Sheets');
        const collection = database.collection('calculations');
        const sheet = await collection.findOne({ userId , _id: new ObjectId(calcId) });

        if (!sheet) {
            return res.status(404).json({ error: 'Sheet not found' });
        }

        const {sheetName, createdAt} = sheet;
        const data = {
            sheetName,
            createdAt
        }
        res.status(200).send(data); // Sending sheet data back to the client
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;