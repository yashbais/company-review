
const dotenv = require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const shortUniquId = require('short-unique-id');

exports.requireConfig = {
    dotenv: dotenv,
    uuidv4: uuidv4,
    shortUniquId:shortUniquId,
}