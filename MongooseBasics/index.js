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

amadeus.save();

Movie.insertMany([
    {
        title: 'Uncharted',
        year: 2022,
        score: 9.6,
        rating: 'PG'
    },
    {
        title: 'Spiderman Far From Home',
        year: 2021,
        score: 8.0,
        rating: 'R'
    },
    {
        title: 'Matrix: Ressuractions',
        year: 2021,
        score: 6.75,
        rating: '16'
    },
    {
        title: 'Scream 5',
        year: 2022,
        score: 8.2,
        rating: 'R'
    },
    {
        title: 'A Quiet Place 2',
        year: 2021,
        score: 10.0,
        rating: 'R'
    },
    {
        title: 'Soul',
        year: 2020,
        score: 9.5,
        rating: 'A'
    },
])
    .then(data => {
        console.log("IT WORKED!");
        console.log(data);
    });

