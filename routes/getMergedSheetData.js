const express = require('express');
const router = express.Router();
const { client } = require('../utils/dbClient');
const { ObjectId } = require('mongodb'); 

router.get('/getMergedSheetData', async function(req, res) {
    const {calcId} = req.query;

  
    if (!calcId) {
        return res.status(400).json({ error: 'calcId is required' });
    }

    try {
        await client.connect();
        const database = client.db('Sheets');
        const collection = database.collection('mergedCalculations');
        const sheet = await collection.findOne({ _id: new ObjectId(calcId) });

        if (!sheet) {
            return res.status(404).json({ error: 'Sheet not found' });
        }

        console.log(sheet.items);
        res.status(200).send(sheet.items); // Sending sheet data back to the client
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;