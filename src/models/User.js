const { Schema, model } = require('mongoose');  // 원래는 mongoose = require('mongoose'); 한담에 
                                                // mongoose.Schema, mongoose.model <- 이런식으로 했음

const UserSchema = new Schema({
    username: { type: String, required: true },
    name: {
        first: { type: String, required: true},
        last: { type: String, required: true}
    },
    age: Number,
    email: String
}, { timestamps: true })    // timestamps = 옵션

const User = model('user', UserSchema)
module.exports = { User };

