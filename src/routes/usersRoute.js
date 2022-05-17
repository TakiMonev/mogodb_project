const { Router } = require('express');
const usersRouter = Router();
const mongoose = require("mongoose");
const { Users } = require('../models/Users');

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
        let { mem_p, mem_id, mem_pw, mem_name, mem_company, mem_type } = req.body;
        // let _p = req.body.mem_p;
        // let _id = req.body.mem_name;
        // let _pw = req.body.mem_pw;
        // let _name = req.body.mem_name;
        // let _company = req.body.mem_company;
        // let _type = req.body.mem_type;

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