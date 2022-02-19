const express = require('express');
const app = express();
const path = require('path')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

const comments = [
    {
        id: 1,
        username: "Thapelo",
        comment: "Tubatse Thapelo"
    },
    {
        id: 2,
        username: "Life",
        comment: "Lets make this move life"
    }
];

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    console.log(req.body);
    const {username, comment} = req.body;
    comments.push({username, comment});
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    console.log("IDOT-->", req.params.id);
    console.log("IDOT-->", id);
    const comment = comments.find(c => c.id === parseInt(id));
    console.log("COMM-->", comment);
    res.render('comments/show', { comment })
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
});

app.post('/tacos', (req, res) => {
    for (let key in req.body) {
        console.log("Key-->", key);
        console.log("Value-->", req.body[key]);
    }
    res.send(`you sent a requet with this body: ${req.body}`)
})

app.listen(4000, () => {
    console.log("Serving on port 4000");
});

