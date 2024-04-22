const express = require('express');
const router = express.Router();
const { client } = require('../utils/dbClient');

router.post('/saveMergedSheet', async function(req, res) {
  const { userId, items, startDate, endDate } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate)
  start.setDate(start.getDate() + 1)
  end.setDate(end.getDate() + 1)

    try {
      console.log(start)
      console.log(end)
    await client.connect();
    const db = client.db('Sheets'); 
    const collection = db.collection('mergedCalculations');
        const currentDate = new Date();
        const mergedData = {
          userId,
          createdAt: currentDate,
          startDate : start,
          endDate : end,
          items
        }
        const result = await collection.insertOne(mergedData);
        console.log(`Inserted ${result.insertedCount} document into the "mergeCalculations" collection`);
        res.status(201).json({ message: 'Merged sheet created successfully' });   
          } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });

module.exports = router;