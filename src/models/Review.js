const { Schema, model } = require('mongoose');  // 원래는 mongoose = require('mongoose'); 한담에 
                                                // mongoose.Schema, mongoose.model <- 이런식으로 했음

const ReviewSchema = new Schema({
    review_p:  String,      // 리뷰 기본 키(앞자리 1이면 예약, 2면 리뷰. 뒤에는 휴대폰 번호 추가)
    review_item: String,    // 리뷰 시설물
    review_mem: String,     // 리뷰 mem_id
    review_title: String,   // 리뷰 제목
    review_con: String,     // 리뷰 내용
    review_date:{ type: String, unique: true }     // 작성일
}, { timestamps: true })    // timestamps = 옵션

const Review = model('review', ReviewSchema);
module.exports = { Review };