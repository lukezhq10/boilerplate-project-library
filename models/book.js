const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up Book schema
const bookSchema = new Schema({
    title: { type: String, required: true },
    commentcount: { type: Number, default: 0 },
    comments: Array
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;