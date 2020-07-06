require('dotenv').config();

const express = require('express');
const app = express();

// const region = require('./region.json');

app.use(express.json());


app.get('/regions', (req, res) => {
    res.json('hello pet');
})


app.listen(2000)
