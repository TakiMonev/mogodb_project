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

        const review = new Review(req.body);
        await review.save();
        
        return res.send({ review });
        
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

reviewRouter.post('/deleteReview', async(req, res) => {
    try {
        const { customerName } = req.body;
        const { resDate } = req.body;
        
        console.log("Found the customer's name : " + JSON.stringify(customerName) + "\n");

        const checkCustomer = await Review.findOne({ review_mem: customerName, review_date: resDate });

        if (checkCustomer)
        {   
            const review = await Review.findOneAndDelete({ review_mem: customerName, review_date: resDate });
            console.log("Data Deleted");
            res.status(201).send({ review });
        }
        else
            res.send("Data not found");

    } catch (err) {
        console.log(err);
        res.status(500).send({ err: err.message })
    }
});

module.exports = {
    reviewRouter
}