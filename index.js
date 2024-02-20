const express = require('express')
const { connectToMongoDB } = require('./src/config/dbConnection');
const router = require('./src/routes');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 7869
connectToMongoDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
