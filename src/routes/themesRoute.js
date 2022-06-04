const express = require('express');
const themeRouter = express.Router();
const mongoose = require("mongoose");
const { Themes } = require('../models/Themes');

themeRouter.get('/', async(req, res) => {
    try {
        const theme = await Themes.find({});
        return res.send({ theme });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

themeRouter.post('/', async (req, res) => {
    try {
        console.log("posting information in themeRouter");
        let { theme_p, theme_owner, theme_title, theme_con } = req.body;

        const theme = new Themes(req.body);
        await theme.save();
        
        return res.send({ theme });

        
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

themeRouter.delete('/:theme', async(req, res) => {
    try {
        const { theme } = req.params;
        
        if (!mongoose.isValidObjectId(theme)) 
            return res.status(400).send({ err: "Invalid theme" });

        const themeData = await Themes.findOneAndDelete({ theme_p: theme });
        
        return res.send({ themeData });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

module.exports = {
    themesRouter
}