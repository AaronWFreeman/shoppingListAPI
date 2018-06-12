'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {shoppingList} = require('./models');
const router = express.Router();

router.get('/groceries', (req, res) => {
  shoppingList
    .find({})
    .then(shoppinglist => {
      res.status(200).json({groceries: shoppinglist});
    })
    .catch(err => res.status(500).json({ message: 'Internal server error'}));
})

router.post('/groceries/', (req, res) => {
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
        title: req.body.title,
        category: req.body.category,
        amount: req.body.amount
    })
    .then(shoppinglist => res.status(201).json(shoppinglist))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

router.patch('/groceries/:id', (req, res, next) => {
  const fieldsToUpdate = ['title', 'category', 'amount'];
  let id = req.params.id;
  let updatedDocument = {};
  fieldsToUpdate.forEach(thing => {
    if (thing in req.body) {
      updatedDocument[thing] = req.body[thing];
    };
  });
  console.log(updatedDocument, id);
  shoppingList
    .findByIdAndUpdate(id, updatedDocument, {new: true})
    .then(updatedList => {
      if(updatedList) {
        res.status(200).json(updatedList);
      }
      else {
        next();
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Internal server error'})});
});

module.exports = {router};
