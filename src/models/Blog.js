const { Schema, model, Types} = require('mongoose')

const UserSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: Types.ObjectId, required: true, ref:"user" }
    }, 
    { timestamps: true }
);

const Blog = model('blog', UserSchema);
module.exports = { Blog };