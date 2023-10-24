if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const port = 3000

const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ limit: '10mb', extended: false}))

app.use('/', loginRouter)
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