const express = require('express');
const router = express.Router();
const { client } = require('../utils/dbClient');
const {ObjectId} = require('mongodb')

router.get('/getCredentials', async function (req,res){
    const {userId} = req.query;
    try{
        await client.connect();
        const database = client.db('Sheets')
        const collection = database.collection('users')
        const userData = await collection.findOne({_id : new ObjectId(userId)})
        res.status(200).json(userData)

    } catch (error){
        console.log(error);
    }

})

module.exports = router;