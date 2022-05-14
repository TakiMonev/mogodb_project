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

userRouter.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" })
        const user = await User.findOneAndDelete({ _id: userId })       //deleteOne도 가능
        return res.send({ user })
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
})

userRouter.put('/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" })
        const { age, name } = req.body;
        if (!age && !name) return res.status(400).send({ err: "age or name is required" });
        if (!age) return res.status(400).send({ err: "age is required" });
        if (typeof age !== 'number') return res.status(400).send({ err: "age must be a number" });
        if (name && typeof name.first !== 'string' && typeof name.last !== 'string') return res.status(400).send({ err: "first and last name are strings" });
        let updateBody = {};
        if (age) updateBody.age = age;
        if (name) updateBody.name = name;

        const user = await User.findOneAndUpdate(userId, { age, name }, { new: true });    // { age }를 { $set: { age } }로 바꿀 수 있음
        return res.send({ user });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
})

module.exports = {
    userRouter
}