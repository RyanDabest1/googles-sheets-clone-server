const express = require('express')
const {run} = require('./utils/dbClient.js')
const {client} = require('./utils/dbClient.js')
const morgan = require('morgan');
const cors = require('cors'); 
const bodyParser = require('body-parser');

const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const registRouter = require('./routes/regist.js');
const loginRouter = require('./routes/login.js')
const createSheetRouter = require('./routes/createSheet.js')
const getSheets = require('./routes/getSheets.js')
const getSheetData = require('./routes/getSheetData.js');
const saveSheet = require('./routes/saveSheet.js')
const getCredentialsRouter = require('./routes/getCredentials.js')
const getRecentSheetsRouter = require('./routes/getRecentSheets.js')
const getSheetsDataInRangeRouter = require('./routes/getSheetDataInRange.js')
const saveMergedSheetRouter = require('./routes/saveMergedSheet.js')
const getMergedSheetsRouter = require('./routes/getMergedSheets.js')
const getMergedSheetsDataRouter = require('./routes/getMergedSheetData.js')
const deleteSheetRouter = require('./routes/deleteSheet.js');
const deleteMergedSheetRouter = require('./routes/deleteMergedSheet.js')
const getSheetInfoRouter = require('./routes/getSheetInfo.js')
const app = express()

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use('/', registRouter);
app.use('/', loginRouter);
app.use('/',createSheetRouter);
app.use('/', getSheets);
app.use('/', getSheetData);
app.use('/',saveSheet);
app.use('/',getCredentialsRouter);
app.use('/', getRecentSheetsRouter);
app.use('/',getSheetsDataInRangeRouter);
app.use('/',saveMergedSheetRouter);
app.use('/',getMergedSheetsRouter);
app.use('/',getMergedSheetsDataRouter);
app.use('/', deleteSheetRouter);
app.use('/', deleteMergedSheetRouter);
app.use('/',getSheetInfoRouter);
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});