'use strict';
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController.js');


//response will be array of book objects
//json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
router.get('/', bookController.get_books);

//response will contain new book object including atleast _id and title
router.post('/', bookController.add_book);

//if successful response will be 'complete delete successful'
router.delete('/', bookController.delete_book);

//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
router.get('/:_id', bookController.get_books);

//json res format same as .get
router.post('/:_id', bookController.add_comment);

//if successful response will be 'delete successful'
router.delete('/:_id', bookController.delete_book);

module.exports = router;
