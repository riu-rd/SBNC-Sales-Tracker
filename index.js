// check if it's in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const User = require('./modal/user')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  async email => await User.find({email: email}),
  async id => await User.find({id: id})
)

const port = 3000

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ limit: '10mb', extended: false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register',registerRouter)

app.engine('hbs',exphbs.engine({extname: '.hbs'}))
app.set('view engine','hbs')
app.set('views','./views')



mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser:true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to moongoose'))

const currPort = app.listen(process.env.PORT || port)
console.log("Server now listening on port %d", currPort.address().port)