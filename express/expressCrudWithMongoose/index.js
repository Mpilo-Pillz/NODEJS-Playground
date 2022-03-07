const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    }).catch(err => {
        console.error("FAILED TO CONNECT", err);
    });


// middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const categories = ['dairy', 'fruit', 'vegetable'];
const port = 4000;

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    console.log(products);
    res.render("products/index", { products })
});

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
});

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    console.log(id);
    res.render("products/show", { product });
    console.log(product);
});

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    // force mongo to validate amd come back with new info
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`);
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

app.listen(port, () => {
    console.log(` is listening on port ${port}`);
});


{/* <select name="category" id="category">
            
            <option value="dairy" <%=product.category==='dairy' ? 'selected' : '' %>>Dairy</option>
            <option value="fruit" <%=product.category==='fruit' ? 'selected' : '' %> >Fruit</option>
            <option value="vegetable" <%=product.category==='vegetable' ? 'selected' : '' %>>Vegetable</option>
        </select> */}