const { Schema, model } = require('mongoose');  // 원래는 mongoose = require('mongoose'); 한담에 
                                                // mongoose.Schema, mongoose.model <- 이런식으로 했음

const UserSchema = new Schema({
    mem_p: { type: String, required: ture },
    mem_id: { type: String, required: true },
    mem_pw: String,
    mem_name: String,
    mem_company: String,
    mem_type: String
}, { timestamps: true })    // timestamps = 옵션

const Users = model('users', UserSchema);
module.exports = { Users };

/*
String mem_p // 회원 기본키
   String mem_id // 회원 아이디
   String mem_pw // 회원 비밀번호
   String mem_name // 회원 이름
   String mem_company // 기업상호명 ( 기업 회원일때만 상호명 입력 )
   String mem_type // 회원유형 ( 1:관리자 2:일반회원 3:기업회원 )
*/