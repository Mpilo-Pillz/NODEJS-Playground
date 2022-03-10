const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    }).catch(err => {
        console.error("FAILED TO CONNECT", err);
    });

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 11.99,
//     category: 'fruit'
// })

// p.save().then(p => {
//     console.log(p)
// })
//     .catch(e => {
//         console.log(e);
//     })

const seedProducts = [
    {
        name: 'Watermelon',
        price: 50.50,
        category: 'fruit'
    },
    {
        name: 'Goat Milk',
        price: 8.99,
        category: 'dairy'
    },
    {
        name: 'Cheese',
        price: 23.45,
        category: 'dairy'
    },
    {
        name: 'Lettuce',
        price: 6.71,
        category: 'vegetable'
    },
    {
        name: 'Spinach',
        price: 3.48,
        category: 'vegetable'
    },

];

Product.insertMany(seedProducts).then(res => console.log(res)).catch(e => console.log(e))