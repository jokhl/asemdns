require('dotenv').config() // must be first in order to load ENV vars

const Express = require('express')
const IPC = require('./app/lib/ipc')

// Middlewares
const Authorize = require('./app/middlewares/authMiddleware')
const SessionManager = require('express-session')
const MemoryStore = require('memorystore')(SessionManager)

// Rputers
const UsersRouter = require('./app/routers/usersRouter')
const DomainsRouter = require('./app/routers/domainsRouter')

// Controllers
const SessionsController = require('./app/controllers/sessionsController')

// Repositories
const UserRepository = require('./app/repositories/userRepository')
const DomainRepository = require('./app/repositories/domainRepository')

const WebPort = 3000

let app = Express()
app.set('view engine', 'pug')
app.set('views', './app/templates')
app.use(Express.static('static'))
app.use(Express.urlencoded())
app.use(SessionManager({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: false,
  resave: false
}))
app.use(Authorize) // must be after Session middleware registration

// Load repositories
app.locals.repositories = {
  userRepository: new UserRepository(),
  domainRepository: new DomainRepository(),
}

app.locals.ipc = new IPC('master')

// Routes
app.get('/', (req, res) => res.render('home'))
app.get('/login', SessionsController.new)
app.post('/login', SessionsController.create)
app.get('/logout', SessionsController.destroy)
app.use('/users', UsersRouter)
app.use('/domains', DomainsRouter)

app.listen(WebPort, () => console.log(`Web app listening at ${WebPort}.`))