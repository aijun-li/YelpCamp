var express = require('express')
var router = express.Router()
var Campground = require('../models/campground')

// INDEX - show all campgrounds
router.get('/', function (req, res) {
    Campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render('campgrounds/index', { campgrounds: allcampgrounds })
        }
    })
})

// NEW - show form to create new campground
router.get('/new', isLoggedIn, function (req, res) {
    res.render('campgrounds/new')
})

// CREATE - add new campgrounds
router.post('/', isLoggedIn, function (req, res) {
    Campground.create(req.body.campground, function (err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/campgrounds')
        }
    })
})

// SHOW - shows more info about one campground
router.get('/:id', function (req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            // render show template with that campground
            res.render('campgrounds/show', { campground: foundCampground })
        }
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

module.exports = router