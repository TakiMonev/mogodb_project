const { Router } = require('express');
const usersRouter = Router();
const mongoose = require("mongoose");
const { Users } = require('../models/Users');
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb+srv://lsyun1234:cxMctvVx5ThVlktM@joinusmembers.dvefm.mongodb.net/JoinUs?retryWrites=true&w=majority");

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
        // 0518 added
        await client.connect();
        const database = client.db("JoinUs");
        console.log(database + "Connected\n");
        const UsersData = database.collection("users");
        console.log("UsersData : " + UsersData);
        const result = await UsersData.insertOne(users);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        //
        return res.send({ users });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
})

module.exports = {
    usersRouter
}