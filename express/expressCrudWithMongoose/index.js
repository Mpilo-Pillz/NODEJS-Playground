const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    }).catch(err => {
        console.error("FAILED TO CONNECT", err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = 4000;

app.get('/dog', (req, res) => {
    res.send("woof")
})
app.listen(port, () => {
    console.log(` is listening on port ${port}`);
})