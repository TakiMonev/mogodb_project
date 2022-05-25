const { Router } = require('express');
const facilityRouter = Router();
const mongoose = require("mongoose");
const { Facility } = require('../models/Facility');
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);

facilityRouter.get('/', async(req, res) => {
    try {
        const facility = await facility.find({});
        return res.send({ facility });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

facilityRouter.get('/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: "invalid facilityId" })
        const facility = await Facility.findOne({ _id: userId });
        return res.send({ facility });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message })
    }
});

facilityRouter.post('/', async (req, res) => {
    try {
        console.log("posting information in facilityRouter");
        let { mem_p, mem_id, mem_pw, mem_name, mem_company, mem_type } = req.body;

        if (!mem_p || !mem_id || !mem_pw) return res.status(400).send({ err: "key, id, password are required" });

        const facility = new Facility(req.body);
        await facility.save();

        // 0518 added
        await client.connect();
        const database = client.db("JoinUs");
        console.log("Database Connected\n");
        const FacData = database.collection("facility");
        console.log("FacilityData added!");
        const result = await FacData.insertOne(facility);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        //
        return res.send({ facility });

        
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

module.exports = {
    facilityRouter
}