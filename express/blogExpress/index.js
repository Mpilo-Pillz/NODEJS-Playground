const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

// was const before then we chenaged to let cos of filter in app.delete
let comments = [
    {
        id: "1",
        username: "Thapelo",
        comment: "Tubatse Thapelo"
    },
    {
        id: "2",
        username: "Life",
        comment: "Lets make this move life"
    },
    {
        id: "3",
        username: "Patch Da Dawg",
        comment: "Man this is an old comment"
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
    // comments.push({username, comment, id: uuidv4()});
    comments.push({username, comment, id: comments.length + 1});
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id);
    // const comment = comments.find(c => c.id === parseInt(id));
    res.render('comments/show', { comment })
});

app.patch('/comments/:id', (req, res) => {
    console.log(req.body.comment);

    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);

    foundComment.comment = newCommentText
    res.redirect("/comments")
});

/**
 * HTML forms can only send a get and post request not the other method
 * below wew ill overide the methods to use the desired methods
 */

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    console.log("ICEMAN-->", comment);
    res.render('comments/edit', { comment });
})

/**
 * END
 */

app.delete('/comments/:id', (req, res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
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

