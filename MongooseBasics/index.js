const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    }).catch(err => {
        console.error("FAILED TO CONNECT", err);
    })
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("CONNECTION OPEN!!!");
// })

const movieTowatch = {
    title: 'Amadeus',
    year: 1982,
    score: 9.2,
    rating: 'R'
}

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema)

const amadeus = new Movie({
    title: 'Amadeus',
    year: 1982,
    score: 9.2,
    rating: 'R'
})

// amadeus.save();

