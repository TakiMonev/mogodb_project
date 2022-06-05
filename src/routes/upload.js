const express = require('express');
const uploadRouter = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs');

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
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 },
});

uploadRouter.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '../web/main.html'));
});

uploadRouter.post('/upload', 
    upload.fields([{ name: 'sample' }/*, { name: 'image2'}*/]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');   
    },    
);

uploadRouter.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
})

module.exports = {
    uploadRouter
}