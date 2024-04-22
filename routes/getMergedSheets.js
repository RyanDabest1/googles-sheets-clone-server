const express = require('express');
const router = express.Router();
const { client } = require('../utils/dbClient');

router.get('/getMergedSheets', async function(req, res){
    const {userId} = req.query;
    try {
        await client.connect();
        const database = client.db('Sheets');
        const collection = database.collection('mergedCalculations');

        // Find sheets with the provided userId
        const sheets = await collection.find({ userId }).toArray();

        // Send the sheets array in the response
        res.status(200).json({ sheets });
    } catch (error) {
        console.error('Error fetching sheets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

module.exports = router;
