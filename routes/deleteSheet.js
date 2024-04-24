const express = require('express');
const router = express.Router();
const { client } = require('../utils/dbClient');
const { ObjectId } = require('mongodb'); 

router.delete('/deleteSheet', async function(req,res){
    const {calcId} = req.query;
    const {userId} = req.query;
    try{
        await client.connect();
        const database = client.db('Sheets');        
        let collection = database.collection('calculations');
        let result = await collection.deleteOne({ _id: new ObjectId(calcId), userId })
        console.log(result)
    } catch (error) {
        console.error('Error deleting sheet:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 

})
module.exports = router