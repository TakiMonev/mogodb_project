const express = require('express');
const facilityRouter = express.Router();
const mongoose = require("mongoose");
const { Facility } = require('../models/Facility');
const { Users } = require('../models/Users');
const { Themes } = require('../models/Themes');

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);
var path = require('path');
const dirPath = path.join(__dirname, '../web');

facilityRouter.get('/', async(req, res) => {
    try {
        const facility = await Facility.find({});
        return res.send({ facility });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

facilityRouter.get('/:ceoName&:facilityName', async(req, res) => {
    try {
        const { ceoName } = req.params;
        const { facilityName } = req.params;

        let getFacility = await Facility.findOne({ fac_ceo: ceoName, fac_title: facilityName });
        let clicked_str = getFacility.fac_clicked;
        let clicked = Number(clicked_str);
        ++clicked;

        // 220609 업데이트
        if (getFacility)
        {   
            let updateBody = {};
            updateBody.fac_clicked = clicked;

            getFacility = await Facility.findOneAndUpdate({ fac_ceo: ceoName, fac_title: facilityName }, { fac_clicked: clicked }, { new: true });

            const users = await Users.find({});
            const facility = await Facility.find({});
            const themes = await Themes.find({});
            return res.render(path.join(dirPath, '/index_info.ejs'), {
                AllFac: facility,
                AllUsers: users,
                AllThemes: themes
            });
        }
        else
            res.send("Facility not found");

    } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
})

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
            // 220609 fac_title: facilityName -> fac_title: facilityName, fac_ceo: ceoName으로 수정
            const facility = await Facility.findOneAndDelete({ fac_title: facilityName, fac_ceo: ceoName });
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