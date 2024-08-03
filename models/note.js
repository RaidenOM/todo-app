const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    complete: Boolean
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note