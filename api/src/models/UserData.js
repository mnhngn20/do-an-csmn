var mongoose = require('mongoose');

var userDataSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            
        },
        name: {
            type: String,
            
        },
        avatar: {
            type: String
        }, 
    },
    { timestamps: true },
    { _id: false}
)

const UserData = mongoose.model('UserData', userDataSchema, 'userData');

module.exports = UserData;