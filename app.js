var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground = require('./models/campground'),
    seedDB = require('./seeds'),
    methodOverride = require('method-override'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    flash = require('connect-flash')

var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index')

// seedDB()

mongoose.set('useFindAndModify', false)

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Wowowowowow',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
 
// Attention: this middleware must be put behind the above middlewares
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})


mongoose.connect(process.env.DATABASEURL || 'mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

// Routes
app.use('/', indexRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)
app.use('/campgrounds', campgroundRoutes)

app.listen(process.env.PORT || 2333, process.env.IP, function () {
    console.log("Server is now listening!")
})

