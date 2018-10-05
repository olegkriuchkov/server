const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost/mongoose_basics", function (err) {
    if (err) throw err;
    console.log("---------Successfully connected!---------");

    const app = express();

    app.use(express.static('public'));
    app.use(('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }));

    app.use(bodyParser.json());

    app.get('/authors', function (req, res) {
        const Authors = require('./models/author');

        Authors.find({}).exec(function (err, author) {
            if (err) throw err;
            res.send(author);
        });       
    });

    app.get('/books', function(req, res) {
        const Books = require("./models/books");
        console.log("asdasd");
        Books.find({}).exec(function(err, book) {
            if(err) throw err;
            res.send(book);
        });
    });

    app.post('/books', function(req, res) {
        const Authors = require('./models/author');
        const Books = require('./models/books');
        Authors.find({
            name: {
                firstname: req.body.author.split(' ')[0],
                lastname: req.body.author.split(' ')[1]
            }
        })
        .exec( function(err, author) {
            if(err) throw err;
            const newBook = new Books({
                _id: new mongoose.Types.ObjectId,
                title: req.body.title,
                summary: req.body.summary,
                author: author[0]._id
            });
            newBook.save(function(err) {
                if(err) throw err;
                console.log("The book was added successfully");
            }); 
        });
    });

    app.post('/authors', function(req, res) {
        const name = req.body.name;
        const Authors = require('./models/author');
        const newAuthor = new Authors({
            _id: new mongoose.Types.ObjectId,
            name: {
                firstname: name.split(' ')[0],
                lastname: name.split(' ')[1]
            },
            biography: req.body.biography
        });
        newAuthor.save(function(err) {
            if(err) throw err;
            console.log("Author was successfully added!");
        });
    });

    app.listen(3000, 'localhost');
});