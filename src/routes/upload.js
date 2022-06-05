const express = require('express');
const uploadRouter = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs');
var path = require('path');
const { Post } = require('../models/Post');

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다');
    fs.mkdir('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            // MongoDB 폴더 안으로 들어감
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            console.log(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

uploadRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../web/index.ejs'));
});

uploadRouter.post('/', 
    upload.single('imgFile'),
    (req, res) => {
        console.log(req.file);
        res.sendFile(path.join(__dirname, '../web/index.ejs'));   
});

/*
const upload2 = multer();
uploadRouter.post('/', upload2.none(), async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});
*/

module.exports = {
    uploadRouter
}