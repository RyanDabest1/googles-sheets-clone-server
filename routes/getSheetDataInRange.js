const express = require('express');
const router = express.Router();
const { client } = require('../utils/dbClient');

router.get('/getSheetsDataInRange', async function(req, res) {
    const {userId} = req.query;
    const {startDate} = req.query;
    const {endDate} = req.query;
    const start = new Date(startDate);
    const end = new Date(endDate)
    

    try {
        await client.connect();
        const database = client.db('Sheets');
        const collection = database.collection('calculations');
        const sheets = await collection.find({
            userId,
            createdAt: {
              $gte: start,
              $lte: end
            }
          }).toArray();

       
          res.status(200).json({ sheets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;