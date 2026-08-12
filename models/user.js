const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        // profile image url that always change
        default: "https://i.imgur.com/2DhmtJ4.png" 
    },
    followers: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

     following: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    
}, {timestamps: true})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User