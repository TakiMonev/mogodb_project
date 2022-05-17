const { Router } = require('express');
const userRouter = Router();
const mongoose = require("mongoose");
const { Users } = require('../models/Users')

userRouter.get('/', async(req, res) => {
    try {
        const users = await User.find({});
        return res.send({ users });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

// /user/:userId -> :userId을 통해 변수명을 받음
userRouter.get('/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" })
        const user = await User.findOne({ _id: userId });
        return res.send({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message })
    }
})

userRouter.post('/', async (req, res) => {
    try {
        let { mem_p, mem_id, mem_pw, mem_name, mem_company, mem_type } = req.body;
        if (!mem_p || !mem_id || !mem_pw) return res.status(400).send({ err: "key, id, password are required" });

        const users = new Users(req.body);
        await users.save();
        return res.send({ users });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
})

module.exports = {
    userRouter
}