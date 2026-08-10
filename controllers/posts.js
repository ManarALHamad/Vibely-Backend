const Post = require('../models/post')

//posts creation 

const create = async (req, res) => {
    try {
        const postData = {

            mediaType: req.body.mediaType,
            mediaUrl: req.body.mediaUrl,
            caption: req.body.caption,
            category: req.body.category,

            author: req.user._id,

            likes: []
        }

        const createdPost = await Post.create(postData)

        res.status(201).json(createdPost)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


//showing all posts

const index = async (req, res) => {
    try {

        const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 })
        res.status(200).json(posts)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// showing the posts

const show = async (req, res) => {
    try {

        const post = await Post.findById(req.params.postId).populate('author', 'username')

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//editing and updating the posts

const update = async (req, res) => {
    try {

        const postData = {
            mediaType: req.body.mediaType,
            mediaUrl: req.body.mediaUrl,
            caption: req.body.caption,
            category: req.body.category
        }

        // Authorization check
        const post = await Post.findById(req.params.postId)

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        if (!post.author.equals(req.user._id)) {
            return res.status(403).json({
                message: 'Unauthorized'
            })
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            postData,
            {
                new: true,
                runValidators: true
            }
        )

        res.status(200).json(updatedPost)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// deleting posts

const deletePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.postId)

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        // Only the author can delete the post
        if (!post.author.equals(req.user._id)) {
            return res.status(403).json({
                message: 'Unauthorized'
            })
        }

        const deletedPost = await Post.findByIdAndDelete(
            req.params.postId
        )

        res.status(200).json(deletedPost)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    create,
    index,
    show,
    update,
    deletePost
}
