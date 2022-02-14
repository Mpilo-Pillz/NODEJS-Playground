const express = require('express');
const app = express();

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
});

app.post('/tacos', (req, res) => {
    res.send("POST /tacos response")
})

app.listen(4000, () => {
    console.log("Sercing on port 4000");
})