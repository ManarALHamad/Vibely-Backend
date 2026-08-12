const Comment = require('../models/comment')
const Post = require('../models/post')

//create a comment 

const create = async (req, res) => {
    try {

        const post = await Post.findById(req.body.post)

        const commentData = {

           content: req.body.content,
           author: req.user._id,
           post: req.body.post
        }

        const createdComment = await Comment.create(commentData)

        const populatedComment = await Comment.findById(createdComment._id).populate('author', 'username')

        res.status(201).json(populatedComment)

       

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//show all comments

const index = async (req, res) => {
    try {

        const comments = await Comment.find().populate('author', 'username').populate('post') .sort({ createdAt: -1 })

        res.status(200).json(comments)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// show one comment

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

//update the comment

const update = async (req, res) => {

    try {

    //to update the comment we need to find it
    
    const comment = await Comment.findById(req.params.commentId)

    if(!comment) {
        return res.status(404).json ({
            message: 'Comment not found'
        })
    }

    //only comment owner can edit 

    if(!comment.author.equals(req.user._id)){
     
        return res.status(403).json({
            message: 'Unauthorized'
            })

    }

         const commentData = {
            content: req.body.content
        }


        const updatedComment = await Comment.findByIdAndUpdate( req.params.commentId,  commentData,
            {
                new: true,
                runValidators: true
            }
        ).populate('author', 'username')

        res.status(200).json(updatedComment)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//delete comment

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