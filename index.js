const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()
const port = 5500

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('view engine', 'ejs')

const users = {
  '1': {
    id: 1,
    email: 'jbarson@gmail.com',
    password: '123'
  }
}


app.get('/', (req, res) => {
  const animal = req.cookies.animal || 'elephang'

  res.render('home', { animal })
})

app.get('/animals/:name', (req, res) => {
  const name = req.params.name
  res.cookie('animal', name)
  res.redirect('/')
})

app.get('/clear', (_req, res) => {
  res.clearCookie('animal')
  res.redirect('/')
})

//=== Auth routes ===

app.get('/secret', (req, res) => {
  const userId = req.cookies.userId
  if (!userId) {

    return res.redirect('/login')
  }
  const user = users[userId]

  if (!user) {
    return res.send('hacker!')
  }

  res.render('secret')
})

app.get('/login', (_req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if (!email || !password) {
    return res.send('missing email or password')
  }
  const findUser = (address) => {
    for (const userId in users) {
      const user = users[userId]
      if (user.email === address) {
        return user
      }
      return null
    }
  }

  const user = findUser(email)
  console.log(user)
  if (!user) {
    return res.send('no user exists with that email')
  }

  if (user.password !== password) {
    return res.send('bad password')
  }

  res.cookie('userId', user.id)

  res.redirect('/secret')
})

app.get('/logout', (_req, res) => {
  res.clearCookie('userId').redirect('/login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  users['2'] = { id: 2, email, password }
  console.log(users)

  return res.redirect('/login')
})


app.listen(port, () => console.log('running on port', port))