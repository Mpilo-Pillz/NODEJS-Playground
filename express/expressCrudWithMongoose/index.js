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
    console.log(products);
    res.render("products/index", { products })
});

app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    console.log(id);
    res.render("products/show", product);
    console.log(product);
})

app.listen(port, () => {
    console.log(` is listening on port ${port}`);
});