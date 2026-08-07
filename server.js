const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT ? process.env.PORT : "3000"

const authCtrl = require('./controllers/auth')
const usersCtrl = require('./controllers/users')

//Vibely controllers
const postCtrl = require('./controllers/posts')
const commentCtrl = require('./controllers/comments')

const verifyToken = require('./middleware/verify-token')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}. 🥭`)
})

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes go here
// app.get('/auth/sign-token', authCtrl.signToken)
// app.get('/auth/verify-token', authCtrl.verifyToken)
app.post('/auth/sign-up', authCtrl.signUp)
app.post('/auth/sign-in', authCtrl.signIn)
app.get('/users', verifyToken, usersCtrl.index)

//posts routes
app.post('/posts', postCtrl.create)
app.get('/posts', postCtrl.index)
app.get('/posts/:postId', postCtrl.show)
app.put('/posts/:postId', postCtrl.update)
app.delete('/posts/:postId', postCtrl.deletePost)

// comments routes
app.post('/comments', commentCtrl.create)
app.get('/comments', commentCtrl.index)
app.get('/comments/:commentId', commentCtrl.show)
app.put('/comments/:commentId', commentCtrl.update)
app.delete('/comments/:commentId', commentCtrl.deleteComment)



app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}! 😀`)
})