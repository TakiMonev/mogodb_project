const express = require('express');
const uploadRouter = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs');
var path = require('path');

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다');
    fs.mkdir('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext)/* + Date.now() + ext*/);
        },
    }),
    limits: { fileSize: 1024 * 1024 },
});

uploadRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../web/main.html'));
});

uploadRouter.post('/', 
    upload.fields([{ name: 'sample' }/*, { name: 'image2'}*/]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');   
    },    
);

module.exports = {
    uploadRouter
}