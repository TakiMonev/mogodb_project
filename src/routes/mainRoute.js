const http = require('http');
const fs = require('fs'); 
var path = require('path');

const dirPath = path.join(__dirname, '../web/JoinUsMain');
const express = require('express');
const mainRouter = express.Router();

mainRouter.use(express.static(__dirname));

mainRouter.get('/', (req, res) => {
    res.sendFile(path.join(dirPath, "/main.html"));
});


module.exports = {
    mainRouter
}