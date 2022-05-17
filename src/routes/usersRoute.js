const { Router } = require('express');
const usersRouter = Router();
const mongoose = require("mongoose");
const { Users } = require('../models/Users');

usersRouter.get('/', async(req, res) => {
    try {
        const all_users = await Users.find({});
        return res.send({ all_users });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

usersRouter.post('/', async (req, res) => {
    try {
        let { mem_p, mem_id, mem_pw, mem_name, mem_company, mem_type } = req.body;
        console.log("mem_p : " + mem_p + "\n");

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
    usersRouter
}