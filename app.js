const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/note')
const path = require('path')
const methodOverride = require('method-override')

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/todoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(methodOverride('_method'))

app.get('/notes', async (req, res) => {
    const notes = await Note.find({});
    res.render('index', { notes });
});

app.put('/notes/:id', async(req, res)=>{
    const {id} = req.params
    await Note.findByIdAndUpdate(id, req.body)
    res.redirect('/notes')
})

app.patch('/notes/:id', async(req, res)=>{
    const {id} = req.params
    Note.findByIdAndUpdate(id, {complete: req.body.complete})
    res.redirect('/notes')
})

//routing form to create notes
app.post('/notes', async(req, res)=>{
    const {title, description} = req.body
    await Note.insertMany([{title, description, complete: false}])
    res.redirect('/notes')
})

//routing to delete notes
app.delete('/notes/:id', async(req, res)=>{
    const {id} = req.params
    await Note.findByIdAndDelete(id)
    res.redirect('/notes')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});