var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model('Campground', campgroundSchema)

// Campground.create({
//     name: 'Granite Hill', 
//     image: 'https://photosforclass.com/download/pixabay-4522970?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c722678d5954ac751_960.jpg&user=Ben_Frieden',
//     description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
// }, function(err, campground) {
//     if (err ){
//         console.log(err)
//     } else {
//         console.log('NEWLY CREATED CAMPGROUND: ')
//         console.log(campground)
//     }
// })

app.get('/', function (req, res) {
    res.render('landing')
})

// INDEX - show all campgrounds
app.get('/campgrounds', function (req, res) {
    Campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render('index', { campgrounds: allcampgrounds })
        }
    })
    // 
})

// CREATE - add new campgrounds
app.post('/campgrounds', function (req, res) {
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var newCampground = { name: name, image: image, description: description }
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/campgrounds')
        }
    })
})

// NEW - show form to create new campground
app.get('/campgrounds/new', function (req, res) {
    res.render('new')
})

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function (req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            // render show template with that campground
            res.render('show', { campground: foundCampground })
        }
    })

})

app.listen(2333, function () {
    console.log("Server is now listening!")
})