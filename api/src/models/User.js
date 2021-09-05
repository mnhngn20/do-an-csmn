var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            
        },
        password: {
            type: String,
            
        },
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;