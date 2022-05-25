const express = require('express');
const facilityRouter = express.Router();
const mongoose = require("mongoose");
const { Facility } = require('../models/Facility');
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);

facilityRouter.get('/', async(req, res) => {
    try {
        const facility = await Facility.find({});
        return res.send({ facility });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

facilityRouter.delete('/:facilityName', async(req, res) => {
    try {
        const { facilityName } = req.params;
        //if (!mongoose.isValidObjectId(facilityName)) return res.status(400).send({ err: "invalid facilityId" })
        
        console.log("Found the facility name : " + JSON.stringify(facilityName) + "\n");
        
        const facility = await Facility.findOneAndDelete({ fac_title: facilityName });
        return res.send({ facility });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message })
    }
});

facilityRouter.post('/', async (req, res) => {
    try {
        console.log("posting information in facilityRouter");
        let { fac_p, fac_ceo, fac_title, fac_info, fac_max, fac_clicked } = req.body;

        if (!fac_p || !fac_ceo || !fac_title || !fac_info || !fac_max)
            return res.status(400).send({ err: "All informations are required" });

        // 데이터베이스 facility에 저장
        const facility = new Facility(req.body);
        await facility.save();
        
        return res.send({ facility });

        
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

facilityRouter.delete('/:facilityName', async(req, res) => {
    try {
        const { facilityName } = req.params;
        
        // 0520 에러 케이스 추가   
        if (!mongoose.isValidObjectId(facilityName)) 
            return res.status(400).send({ err: "Invalid facility" });

        console.log("Found the facility : " + JSON.stringify(facilityName) + "\n");
        const facilityData = await Facility.findOneAndDelete({ fac_title: facilityName });
        
        return res.send({ facilityData });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

module.exports = {
    facilityRouter
}