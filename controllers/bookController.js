const mongoose = require('mongoose');
const Book = require('../models/book');

const add_book = async (req, res) => {
    let title = req.body.title;
    if (!title) {
        return res.send('missing required field title');
    } else {
        let newBook = await new Book({
            title: title
        });

        newBook.save()
            .then(book => {
                return res.json({
                    _id: book._id,
                    title: book.title
                })
            })
            .catch(err => {
                console.log('Error adding book', err);
                return res.json({ error: 'error adding book' });
            });
    };
};

module.exports = {
    add_book
};