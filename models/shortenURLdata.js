const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenURLdataSchema = new Schema({
  originalURL: {
    type: String,
    require: true
  },
  generateURL: {
    type: String
  }
})

module.exports = mongoose.model('shortenURLdata', shortenURLdataSchema)