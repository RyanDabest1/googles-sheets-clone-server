const express = require('express');
const router = express.Router();
const { client } = require('../utils/dbClient');
const { ObjectId } = require('mongodb'); 

router.put('/saveSheet', async function(req,res){
    const { calcId, rowData } = req.body;
    console.log(calcId);
    try {
        const result = await client.db('Sheets').collection('calculations').updateOne(
            { _id: new ObjectId(calcId) }, 
            { $set: { items: rowData } } 
        );

        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Sheet data updated successfully' });
        } else {
            res.send(calcId);
        }
    } catch (error) {
        console.error('Error updating sheet data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;