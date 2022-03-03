const express = require('express');
const app = express();
const path = require('path');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = 4000;

app.get('/dog', (req, res) => {
    res.send("woof")
})
app.listen(port, () => {
    console.log(` is listening on port ${port}`);
})