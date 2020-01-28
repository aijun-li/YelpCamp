var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground = require('./models/campground'),
    seedDB = require('./seeds'),
    Comment = require('./models/comment'),
    User = require('./models/user')

var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index')

// seedDB()

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Wowowowowow',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Attention: this middleware must be put behind the above middlewares
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next()
})

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

// Routes
app.use('/', indexRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)
app.use('/campgrounds', campgroundRoutes)

app.listen(2333, function () {
    console.log("Server is now listening!")
})

