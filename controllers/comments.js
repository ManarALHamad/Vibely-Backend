const Comment = require('../models/Comment')

const create = async (req, res) => {
    try {

        const commentData = {
            content: req.body.content,

            // later these will come from JWT / route params
            author: req.body.author,
            post: req.body.post
        }

        const createdComment = await Comment.create(commentData)

        res.status(201).json(createdComment)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const index = async (req, res) => {
    try {

        const comments = await Comment .find() .populate('author', 'username').populate('post') .sort({ createdAt: -1 })

        res.status(200).json(comments)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const show = async (req, res) => {
    try {

        const comment = await Comment.findById(req.params.commentId).populate('author', 'username') .populate('post')

        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found'
            })
        }

        res.status(200).json(comment)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const update = async (req, res) => {
    try {

        const commentData = {
            content: req.body.content
        }

        const updatedComment = await Comment.findByIdAndUpdate( req.params.commentId,  commentData,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedComment) {
            return res.status(404).json({
                message: 'Comment not found'
            })
        }

        res.status(200).json(updatedComment)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const deleteComment = async (req, res) => {
    try {

        const deletedComment = await Comment.findByIdAndDelete(req.params.commentId)
    
        if (!deletedComment) {
            return res.status(404).json({
                message: 'Comment not found'
            })
        }

        res.status(200).json(deletedComment)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    create,
    index,
    show,
    update,
    deleteComment
}