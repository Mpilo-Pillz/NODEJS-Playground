const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
});

app.post('/tacos', (req, res) => {
    console.log("req.body", req.body);
    res.send(`you sent a requet with this body: ${req.body}`)
})

app.listen(4000, () => {
    console.log("Serving on port 4000");
})