const express = require('express')
const {run} = require('./utils/dbClient.js')
const {client} = require('./utils/dbClient.js')
const morgan = require('morgan');
const cors = require('cors'); 
const bodyParser = require('body-parser');

const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const registRouter = require('./routes/regist.js');
const helloRouter = require('./routes/hello.js')
const loginRouter = require('./routes/login.js')
const app = express()
app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.json());

app.use('/', registRouter);
app.use('/', helloRouter);
app.use('/', loginRouter)

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});