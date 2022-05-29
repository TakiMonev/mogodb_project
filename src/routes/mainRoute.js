const { Router } = require('express');
//const facilityRouter = Router();      //mainRouter로 대체
const mongoose = require("mongoose");
const { Facility } = require('../models/Facility');

const http = require('http');
const fs = require('fs'); 
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

const dirPath = path.join(__dirname, '../web');
const express = require('express');
const mainRouter = express.Router();

const ejs = require('ejs');

mainRouter.use(express.static(__dirname));
var url = "http://3.34.53.201/facility";

mainRouter.get('/', async (req, res) => {
    Facility.find({}, function(err, allFac) {
        res.render(path.join(dirPath, "/index.ejs"), {
            AllFac: allFac
        })
    })
});

module.exports = {
    mainRouter
}