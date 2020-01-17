var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

var campgrounds = [
    { name: 'Salmon Creek', image: 'https://photosforclass.com/download/pixabay-1149402?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c72267ad69f44c45c_960.jpg&user=Free-Photos' },
    { name: 'Granite Hill', image: 'https://photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72267ad69f44c45c_960.jpg&user=Pexels' },
    { name: "Moutain Goat's Rest", image: 'https://photosforclass.com/download/pixabay-4522970?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c72267ad69f44c45c_960.jpg&user=Ben_Frieden' },
    { name: 'Salmon Creek', image: 'https://photosforclass.com/download/pixabay-1149402?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c72267ad69f44c45c_960.jpg&user=Free-Photos' },
    { name: 'Granite Hill', image: 'https://photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72267ad69f44c45c_960.jpg&user=Pexels' },
    { name: "Moutain Goat's Rest", image: 'https://photosforclass.com/download/pixabay-4522970?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c72267ad69f44c45c_960.jpg&user=Ben_Frieden' },
    { name: 'Salmon Creek', image: 'https://photosforclass.com/download/pixabay-1149402?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c72267ad69f44c45c_960.jpg&user=Free-Photos' },
    { name: 'Granite Hill', image: 'https://photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72267ad69f44c45c_960.jpg&user=Pexels' },
    { name: "Moutain Goat's Rest", image: 'https://photosforclass.com/download/pixabay-4522970?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c72267ad69f44c45c_960.jpg&user=Ben_Frieden' }
]

app.get('/', function (req, res) {
    res.render('landing')
})

app.get('/campgrounds', function (req, res) {
    res.render('campgrounds', { campgrounds: campgrounds })
})

app.post('/campgrounds', function (req, res) {
    var name = req.body.name
    var image = req.body.image
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground)
    res.redirect('/campgrounds')
})

app.get('/campgrounds/new', function (req, res) {
    res.render('new')
})

app.listen(2333, function () {
    console.log("Server is now listening!")
})