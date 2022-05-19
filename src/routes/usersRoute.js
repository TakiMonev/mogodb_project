const { Router } = require('express');
const usersRouter = Router();
const mongoose = require("mongoose");
const { Users } = require('../models/Users');
const { MongoClient } = require("mongodb");
const { param } = require('express/lib/request');
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);

usersRouter.get('/', async(req, res) => {
    try {
        const users = await Users.find({});
        return res.send({ users });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

usersRouter.post('/', async (req, res) => {
    try {
        console.log("posting information in usersRouter");
        let { mem_p, mem_id, mem_pw, mem_name, mem_company, mem_type } = req.body;

        if (!mem_p || !mem_id || !mem_pw) return res.status(400).send({ err: "key, id, password are required" });

        const users = new Users(req.body);
        await users.save();
        
        return res.send({ users });

        
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

usersRouter.delete('/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        
        console.log("Found the user's ID : " + JSON.stringify(userId) + "\n");
        //console.log(client);

        await client.connect();
        const database = client.db("mongoDB");
        const UsersData = database.collection("users");
        const userresult = await UsersData.findOneAndDelete({ mem_id: userId })
        //const result = await delete UsersData.deleteOne({ mem_id: userId });
        if (!result) return res.status(400).send({ err: "invalid userId" });
        
        console.log(`A document was deleted with the _id: ${ UsersData.findOne(mem_id) }`);
        
        return res.send({ result });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

module.exports = {
    usersRouter
}