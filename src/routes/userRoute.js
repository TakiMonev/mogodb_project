const { Router } = require('express');
const userRouter = Router();
const mongoose = require("mongoose");
const { User } = require('../models/User');

userRouter.get('/', async(req, res) => {
    try {
        const users = await User.find({});
        return res.send({ users });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

userRouter.post('/', async (req, res) => {
    try {
        console.log("Entered to POST...");
        let { username, name } = req.body;
        if (!username) return res.status(400).send({ err: "username is required" });
        if (!name || !name.first || !name.last) return res.status(400).send({ err: "Both first and last names are required!" });

        const user = new User(req.body);
        await user.save();
        return res.send({ user });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
})

module.exports = {
    userRouter
}