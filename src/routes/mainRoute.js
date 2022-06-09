const { Router } = require('express');
//const facilityRouter = Router();      //mainRouter로 대체
const mongoose = require("mongoose");
const { Facility } = require('../models/Facility');
const { Users } = require('../models/Users')
//const { Post } = require('../models/Post');

const http = require('http');
const fs = require('fs'); 
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

const dirPath = path.join(__dirname, '../web');
const express = require('express');
const mainRouter = express.Router();

const ejs = require('ejs');

mainRouter.use(express.static(__dirname));
var facurl = "http://3.34.53.201/facility";

/*
mainRouter.get('/', async (req, res) => {
    Facility.find({}, function(err, allFac) {
        res.render(path.join(dirPath, "/index.ejs"), {
            AllFac: allFac
        })
    })
});
*/

mainRouter.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        const facility = await Facility.find({});
        return res.render(path.join(dirPath, '/index.ejs'), {
            AllFac: facility,
            AllUsers: users
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

mainRouter.get('/login', async (req, res) => {
    Users.find({}, function(err, allUsers) {
        res.render(path.join(dirPath, "/login_index.ejs"), {
            AllUsers: allUsers
        })
    })
})

module.exports = {
    mainRouter
}