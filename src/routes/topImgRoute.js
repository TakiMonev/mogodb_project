const http = require('http');
const fs = require('fs'); 
var path = require('path');

const dirPath = path.join(__dirname, '../web/JoinUsMain/TopContentImg');
const express = require('express');
const topImgRouter = express.Router();

topImgRouter.use(express.static(__dirname));

topImgRouter.get('/', (req, res) => {
    res.sendFile(path.join(dirPath, "/img0.jpg"));
});


module.exports = {
    topImgRouter
}