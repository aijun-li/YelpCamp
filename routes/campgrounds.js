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
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    req.body.campground.author = author
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

// EDIT CAPMGROUND ROUTE
router.get('/:id/edit', function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            res.redirect('/campgrounds')
        } else {
            res.render('campgrounds/edit', {campground: foundCampground})
        }
    })
})

// UPDATE CAMPGROUND ROUTE
router.put('/:id', function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds/' + req.params.id)
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