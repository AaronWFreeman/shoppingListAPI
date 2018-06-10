'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {shoppingList} = require('./models');
const router = express.Router();

router.get('/', (req, res) => {
  shoppingList
    .find({})
    .then(shoppinglist => {
      res.status(200).json(shoppinglist);
    })
    .catch(err => res.status(500).json({ message: 'Internal server error'}));
})

router.post('/', (req, res) => {
  const requiredFields = ['title', 'category', 'amount'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  console.log(req.body);
  shoppingList
    .create({
      groceries: [{
        title: req.body.title,
        category: req.body.category,
        amount: req.body.amount
      }]
    })
    .then(shoppinglist => res.status(201).json(shoppinglist))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

router.put('/:id/', (req, res) => {
  const fieldsToUpdate = ['title', 'category', 'amount'];
  let updatedDocument = {};
  fieldsToUpdate.forEach(field => {
  if (field in req.body) {
    updatedDocument[field] = req.body[field];
  }
});
  console.log(updatedDocument);
  shoppingList
    .findByIdAndUpdate(req.params.id, updatedDocument, {new: true})
    .then(updatedList => {
      res.status(200).json(updatedList)
    })
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});


module.exports = {router};
