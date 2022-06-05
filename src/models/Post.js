const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    content: String,
    img: String,
}, { timestamps: true })

const Post = model('post', PostSchema);
module.exports = { Post };