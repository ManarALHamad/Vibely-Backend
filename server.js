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
//profile route
app.get('/users/profile', verifyToken, usersCtrl.profile)

//posts routes
app.post('/posts/new', verifyToken, postCtrl.create)
app.get('/posts', verifyToken, postCtrl.index)
app.get('/posts/:postId', verifyToken, postCtrl.show)
app.put('/posts/:postId', verifyToken, postCtrl.update)
app.delete('/posts/:postId', verifyToken, postCtrl.deletePost)

//Like
app.put('/posts/:postId/like', verifyToken, postCtrl.toggleLike)



// comments routes
app.post('/comments',  verifyToken, commentCtrl.create)
app.get('/comments',  verifyToken,commentCtrl.index)
app.get('/comments/:commentId', verifyToken, commentCtrl.show)
app.put('/comments/:commentId', verifyToken, commentCtrl.update)
app.delete('/comments/:commentId', verifyToken, commentCtrl.deleteComment)



app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}! 😀`)
})