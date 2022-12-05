const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true}, //Mongoose.com //Cuando es en fronent es string en backend String
  content: {type: String, required: true},
  contentt:{type: String, required: true},
  imagePath: {type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema);

