const { Router } = require('express');
const blogRouter = Router();
const { Blog } = require('../models/Blog');
const { User } = require('../models/User');
const { isValidObjectId } = require('mongoose');

blogRouter.post('/', async(req, res) => {
    try {
        const { title, content, islive, userId } = req.body;
        if (typeof title !== 'string') 
            res.status(400).send({ err: "title is required"});
        if (typeof content !== 'string') 
            res.status(400).send({ err: "title is required"});
        if (islive && typeof islive !== 'boolean') 
            res.status(400).send({ err: "islive must be bollean"});
        if (!isValidObjectId(userId))
            res.status(400).send({ err: "userId is invalid" });
        
        // await을 써야 하는듯
        let user = await User.findById(userId);
        if (!user) res.status(400).send({ err: "user does not exist" });

        let blog = new Blog({ ...req.body, user }); // user.UserId도 가능
        await blog.save();
        return res.send({ blog });

    } catch (err) {
        console.log(err);
        res.status(500).send({ err: err.message })
    }
});

blogRouter.get('/', async(req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).send({ err: err.message })
    }
});

blogRouter.get("/:blogId", async(req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).send({ err: err.message })
    }
});

blogRouter.put("/:blogId", async(req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).send({ err: err.message })
    }
});

// put vs patch -> put : 전체적 수정 patch : 지역적 수정
blogRouter.patch("/:blogId/live", async(req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).send({ err: err.message })
    }
});



module.exports = { blogRouter };