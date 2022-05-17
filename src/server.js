const express = require('express');
const app = express();
const { userRouter } = require('./routes/userRoute');
const { blogRouter } = require('./routes/blogRoute');
const { usersRouter } = require('./routes/usersRoute');
const mongoose = require('mongoose');

// const users = [];
// const all_users = [];

//const MONGO_URI = 'mongodb+srv://lsyun1234:cxMctvVx5ThVlktM@joinusmembers.dvefm.mongodb.net/JoinUs?retryWrites=true&w=majority';

const server = async() => {
    try {
        const { MONGO_URI, PORT } = process.env;
        if (!MONGO_URI) console.err("MONGO_URI is required!!!");
        if (!PORT) throw new Error("PORT is requrired");

        console.log("Entered into the server!");

        await mongoose.connect(MONGO_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology:true, 
        //    useCreateIndex:true, 
        //    useFindAndModify: false 
        });
        console.log('MongDB connected')
        // 미들웨어
        app.use(express.json());

        app.use('/user', userRouter);
        app.use('/users', usersRouter);
        app.use('/blog', blogRouter);
        
        // 받는 곳
        app.listen(PORT, async () =>  console.log(`server listening on port ${PORT}`))
    } catch(err) {
        console.log(err);
    }
}

server();