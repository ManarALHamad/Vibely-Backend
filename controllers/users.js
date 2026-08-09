const User = require('../models/user')
const Post = require('../models/post')


const index = async (req, res) => {

    const users = await User.find()

    res.json(users)


}

//for the user profile

const profile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select('-password')

        const posts = await Post.find({
            author: req.user._id
        }).sort({ createdAt: -1 })

        res.status(200).json({
            user,
            posts
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {

    index,
    profile,
}