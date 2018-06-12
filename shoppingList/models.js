'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const shoppingListSchema = new mongoose.Schema({
    title: String,
    category: String,
    amount: Number,
    purchased: {default: false}
});

const shoppingList = mongoose.model('shoppingList', shoppingListSchema);

module.exports = {shoppingList};
