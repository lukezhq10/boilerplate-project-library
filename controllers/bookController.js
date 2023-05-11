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

const get_books = async (req, res) => {
    let bookid = req.params._id;
    if (!bookid) {
        let books = await Book.find();
        return res.json(books);
    } else {
        let book = await Book.findById(bookid)
        if (!book) {
            return res.send('no book exists');
        } else {
            return res.json(book);
        };
    };
};

const add_comment = async (req, res) => {
    // given bookid and comment, update the book with the comment and return it
    let bookid = req.params._id;
    let comment = req.body.comment;

    if (!bookid || !mongoose.isValidObjectId(bookid)) {
        console.log({ error: 'no book exists' });
        return res.send('no book exists');
      };

    if (!comment) {
        return res.send('missing required field comment');
    };

    let update = { $push: { comments: comment }, $inc: { commentcount: 1 } };

    Book.findByIdAndUpdate(bookid, update, { new: true })
        .then(book => {
        if (!book) {
            return res.send('no book exists');
        } else {
            return res.json(book);
        }
        })
        .catch(err => {
            console.log('Error adding comment', err);
            return res.json({ error: 'error adding comment' });
        });
};

const delete_book = async (req, res) => {
    let bookid = req.params._id;
    if (!bookid) {
        Book.deleteMany({})
            .then(status => {
                console.log(status);
                return res.send('complete delete successful');
            })
            .catch(err => {
                console.log('Error deleting all books', err);
                return res.json({ error: 'error deleting all books' }); 
            });
    } else {
        Book.findByIdAndDelete(bookid)
        .then(book => {
            if (!book) {
                console.log('no book exists', bookid);
                return res.send('no book exists');
            } else {
                console.log('delete successful', book);
                return res.send('delete successful');
            }
        })
        .catch(err => {
            console.log('Error deleting book', err);
            return res.json({ error: 'error deleting book' }); 
        });
    };
};

module.exports = {
    add_book,
    get_books,
    add_comment,
    delete_book
};