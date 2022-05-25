const { Schema, model } = require('mongoose');  // 원래는 mongoose = require('mongoose'); 한담에 
                                                // mongoose.Schema, mongoose.model <- 이런식으로 했음

const FacilitySchema = new Schema({
    fac_p: String,          // 시설물 기본키 / 지역 번호 넣어야할듯
    fac_ceo: String,        // 사업주 ( member:mem_p값 입력 )
    fac_title: String,      // 사업장 정보 제목
    fac_info: String,       // 사업장 정보 내용
    fac_max: String,        // 동시간때 예약가능 한도
    fac_clicked: String     // 조회수
}, { timestamps: true })        // timestamps = 옵션

const Facilitiy = model('facility', FacilitySchema);
module.exports = { Facilitiy };

/*
String item_p // 시설물 기본키
   String item_ceo // 사업주 ( member:mem_p값 입력 )
   String item_title // 사업장 정보 제목
   String item_con // 사업장 정보 내용
   String item_max // 동시간때 예약가능 한도
   String item_hit // 조회수

*/