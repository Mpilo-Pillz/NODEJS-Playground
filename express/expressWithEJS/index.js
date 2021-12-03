const express = require('express');
const app = express();
const path = require('path');

const redditData = require('./data.json');
// console.log(redditData);

app.use(express.static(path.join(__dirname, '/public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1
    // assumes .ejs becuase of app.set assumes views/home as well
    res.render("home", { rand: num })
})

app.get('/m/:subparam', (req, res) => {
    const { subparam } = req.params;
    res.render("subparam", { subparam })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    console.log('-->', subreddit);
    const data = redditData[subreddit];
    // console.log(data);
    if (data) {
        res.render('subreddit', { ...data })
    } else {
        res.render('notfound', { subreddit })
    }

})

app.get('/courses', (req, res) => {
    const onlineCourses = [
        "MERN Stack",
        "100 Days of Python",
        "Web dev bootcamp",
        "NodeJS masterclass"
    ];

    res.render("courses", { onlineCourses })
})


app.listen(4000, () => {
    console.log("Listening on port 4000");
})