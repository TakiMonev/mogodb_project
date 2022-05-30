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

facilityRouter.post('/deleteFac', async(req, res) => {
    try {
        // const facilityName = req.body.facilityName와 동일
        const { facilityName } = req.body
        const { ceoName } = req.body
        //if (!mongoose.isValidObjectId(facilityName)) return res.status(400).send({ err: "invalid facilityId" })
        
        console.log("Found the facility name : " + JSON.stringify(facilityName) + "\n");

        const checkFacility = await Facility.findOne({ fac_title: facilityName, fac_ceo: ceoName });

        if (checkFacility)
        {   
            const facility = await Facility.findOneAndDelete({ fac_title: facilityName });
            console.log("Data Deleted");
            res.status(201).send({ facility });
        }
        else
            res.send("Facility not found");

    } catch (err) {
        console.log(err);
        res.status(500).send({ err: err.message })
    }
});

facilityRouter.post('/', async (req, res) => {
    try {
        console.log("posting information in facilityRouter");
        let { fac_p, fac_ceo, fac_title, fac_info, fac_max, fac_clicked } = req.body;

        if (!fac_p || !fac_ceo || !fac_title || !fac_info || !fac_max)
            return res.status(400).send({ err: "All informations are required" });

        console.log(Facility.findById({ "fac_p": fac_p }, function(err, data) {
            if (err) 
                return console.log("Facility key already exists");
        }));
        
        // If you use findOne(), you'll see that findOne(undefined) and findOne({ _id: undefined }) are equivalent 
        //to findOne({}) and return arbitrary documents.
        // However, mongoose translates findById(undefined) into findOne({ _id: null }).
        //if (Facility.findOne(fac_p))
        //    return res.status(400).send({ err: "Facility key already exists"});

        // 데이터베이스 facility에 저장
        const facility = new Facility(req.body);
        await facility.save();
        
        return res.send({ facility });

        
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

module.exports = {
    facilityRouter
}