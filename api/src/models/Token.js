var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema(
    {
        accessToken: {
            type: String
        },
        refreshToken: {
            type: String
        },
        passwordResetToken: {
            type: String
        }
    },
    { timestamps: true },
    { _id: false }
)

const Token = mongoose.model('Token', tokenSchema, 'tokens');

module.exports = Token;