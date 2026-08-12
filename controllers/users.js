const User = require('../models/user')
const Post = require('../models/post')


const index = async (req, res) => {
try {
   const users = await User.find().populate('followers', 'username').populate('following', 'username')

   res.status(200).json(users) 
   
} catch (error) {

    res.status(500).json({
    message: error.message
        })
}
    



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

//follow and unfollow

const toggleFollow = async (req, res) => {

    try {
    
    const userToFollow = await User.findById(req.params.userId)

    if(!userToFollow){

        return res.status(404).json({
        message: "User not found"
        })

    }

    const currentUser = await User.findById(req.user._id)

    //if statement so users dont follow themself

    if(currentUser._id.equals(userToFollow._id)) {

        return res.status(400).json({
            message: "you cannot follow yourself"
        })
    }

    //if statement to check if already following

    const alreadyFollowing  = currentUser.following.some((userId) => {

        return userId.equals(userToFollow._id)

    })

    //if already following we can unfollow

    if (alreadyFollowing) {

        currentUser.following = currentUser.following.filter((userId) => {

        return !userId.equals(userToFollow._id)

        })

        userToFollow.followers = userToFollow.followers.filter((userId) => {
        return !userId.equals(currentUser._id)
    })

    }

    //follow

    else {

    currentUser.following.push(userToFollow._id)

    userToFollow.followers.push(currentUser._id)

    }

    await currentUser.save()
    await userToFollow.save()

    const updatedUser = await User.findById(userToFollow._id).populate('followers', 'username').populate('following', 'username')

    res.status(200).json(updatedUser)
    
    } catch (error) {
        res.status(500).json({
        message: error.message
        })
    }


}





module.exports = {

    index,
    profile,
    toggleFollow,
}