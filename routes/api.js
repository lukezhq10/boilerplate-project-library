'use strict';
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController.js');



router.get('/', (req, res) => {
  //response will be array of book objects
  //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
});

//response will contain new book object including atleast _id and title
router.post('/', bookController.add_book);

router.delete('/', (req, res) => {
  //if successful response will be 'complete delete successful'
});


router.get('/', (req, res) => {
  let bookid = req.params.id;
  //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
});

router.post('/:id', (req, res) => {
  let bookid = req.params.id;
  let comment = req.body.comment;
  //json res format same as .get
});

router.delete('/:id', (req, res) => {
  let bookid = req.params.id;
  //if successful response will be 'delete successful'
});;

module.exports = router;
