const { Router } = require('express');
const usersRouter = Router();
const mongoose = require("mongoose");
const { Users } = require('../models/Users');
const { MongoClient } = require("mongodb");
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

usersRouter.get('/:userLink', async(req, res) => {
    try {
        const { userId } = req.params;
        const { userLink } = req.params;
        const getUserdatabase = client.db("JoinUs");
        const getUsersData = getUserdatabase.collection("users");
        const getUserresult = await getUsersData.find();

        console.log(userLink);
        if (userLink != getUserresult) return res.status(400).send({ err: "invalid userId" });    // userId -> userLink
        
        return res.send({ getUserresult });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message })
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
        console.log("Database Connected\n");
        const UsersData = database.collection("users");
        console.log("UsersData added!");
        const result = await UsersData.insertOne(users);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        //
        return res.send({ users });

        
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

usersRouter.delete('/:userLink', async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userLink)) return res.status(400).send({ err: "invalid userId" })   // userId -> userLink
        const user = await Users.findOneAndDelete({ mem_id: userLink })       //deleteOne도 가능    userId -> userLink
        return res.send({ user })
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
})

module.exports = {
    usersRouter
}