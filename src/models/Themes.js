const { Schema, model } = require('mongoose');  // 원래는 mongoose = require('mongoose'); 한담에 
                                                // mongoose.Schema, mongoose.model <- 이런식으로 했음

const ThemeSchema = new Schema({
    theme_p:  String,       // 테마 시설 기본 키
    theme_owner: String,    // 시설주
    theme_title: String,    // 시설 이름
    theme_con: String,      // 시설 내용
    theme_name: String      // 테마 이름
}, { timestamps: true })    // timestamps = 옵션

const Themes = model('theme', ThemeSchema);
module.exports = { Themes };