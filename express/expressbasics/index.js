const express = require('express');
const app = express();
port = 4000;


// console.log(redditData);

// app.use((req, res) => {
//     res.send("<h1>This is a response</h1>")
//     console.log("we got a new request")
// })

app.get('/', (req, res) => {
    res.send("This is a home route")
})

app.get('/cats', (req, res) => {
    res.send('<h2>THis is a cat route</h2>')
})

app.get('/dogs', (req, res) => {
    res.send('<h3>This is a dog route</h2>')
})

app.get('/js/:framework', (req, res) => {
    console.log(req.params);
    const { framework } = req.params
    res.send(`<h1>Browsing the ${framework} framework</h1>`)
})

app.get('/search', (req, res) => {
    console.log(req.query);
})



app.get('*', (req, res) => {
    res.send("<p>404</p>")
})

app.listen(port, () => console.log(`Listening on Port ${port}`))