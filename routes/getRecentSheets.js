const express = require('express');
const router = express.Router();
const { client } = require('../utils/dbClient');

router.get('/getRecentSheets', async function(req, res){
    const {userId} = req.query;
    try {
        await client.connect();
        const database = client.db('Sheets');
        const collection = database.collection('calculations');

        // Find sheets with the provided userId
        const sheets = await collection.find({ userId }).sort({ _id: -1 }).limit(3).toArray();
        // Send the sheets array in the response
        res.status(200).json({ sheets });
    } catch (error) {
        console.error('Error fetching sheets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

module.exports = router;
