const express = require('express');
const reviewRouter = express.Router();
const mongoose = require("mongoose");
const { Review } = require('../models/Review');
const { MongoClient } = require("mongodb");
const { param } = require('express/lib/request');

reviewRouter.get('/', async(req, res) => {
    try {
        const review = await Review.find({});
        return res.send({ review });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

reviewRouter.post('/', async (req, res) => {
    try {
        console.log("posting information in reviewRouter");
        let { review_p, review_item, review_mem, review_title, review_con, review_date } = req.body;

        if (!review_date) return res.status(400).send({ err: "Write date" });

        const review = new Review(req.body);
        await review.save();
        
        return res.send({ review });

        
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

reviewRouter.delete('/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        
        if (!mongoose.isValidObjectId(userId)) 
            return res.status(400).send({ err: "Invalid userId" });

        console.log("Found the user's ID : " + JSON.stringify(userId) + "\n");
        const reviewData = await Review.findOneAndDelete({ review_mem: userId });
        
        return res.send({ reviewData });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

module.exports = {
    reviewRouter
}