const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    }).catch(err => {
        console.error("FAILED TO CONNECT", err);
    });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = 4000;

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render("products/index", { products })
})
app.listen(port, () => {
    console.log(` is listening on port ${port}`);
})