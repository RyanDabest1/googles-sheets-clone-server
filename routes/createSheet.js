const express = require('express');
const router = express.Router();
const { client } = require('../utils/dbClient');

router.post('/createSheet', async function(req,res){
    const {userId, sheetName} = req.body;
    try{
        await client.connect();
        const database = client.db('Sheets');
        const collections = await database.listCollections().toArray();
        
        let collection = database.collection('calculations');

        const currentDate = new Date();
        const calculationData = {
            userId,
            sheetName,
            createdAt: currentDate,
            items : [
                {
                    name : "18ဂျုံ",
                    price : 4600,
                    sellPrice : 0,
                    quantity : 0,
                },
                {
                    name : "AungNthuဂျုံ",
                    price : 3500,
                    sellPrice : 0,
                    quantity : 0,
                },
                {
                    name : "ဇံ",
                    price : 1620,
                    sellPrice : 0,
                    quantity : 0,
                },
                {
                    name : "မုန့်",
                    price : 1570,
                    sellPrice : 0,
                    quantity : 0,
                },
                {
                    name : "ညှပ်",
                    price : 1670,
                    sellPrice : 0,
                    quantity : 0,
                },
                {
                    name : "စိမ်း",
                    price : 4800,
                    sellPrice : 0,
                    quantity : 0,
                },
                {
                    name : "ပဲ",
                    price : 1500,
                    sellPrice : 0,
                    quantity : 0,
                },
                {
                    name : "အမာ",
                    price : 1870,
                    sellPrice : 0,
                    quantity : 0,
                },
                {
                    name : "Moe",
                    price : 3800,
                    sellPrice : 0,
                    quantity : 0,
                },
                {
                    name : "MyaZan",
                    price : 1600,
                    sellPrice : 0,
                    quantity : 0,
                },
            ],
          
        };
        const result = await collection.insertOne(calculationData);
        console.log(`Inserted ${result.insertedCount} document into the "calculations" collection`);

        res.status(201).json({ message: 'Calculation sheet created successfully' });
    } catch (error) {
        console.error('Error creating calculation sheet:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 

})
module.exports = router