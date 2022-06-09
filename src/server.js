const express = require('express');
const app = express();
const { userRouter } = require('./routes/userRoute');
const { blogRouter } = require('./routes/blogRoute');
const { usersRouter } = require('./routes/usersRoute');
const { facilityRouter } = require('./routes/facilityRoute');
const { mainRouter } = require('./routes/mainRoute');
const { reviewRouter } = require('./routes/reviewRoute');
const { themesRouter } = require('./routes/themesRoute');
const { uploadRouter } = require('./routes/upload');
const mongoose = require('mongoose');

const ejs = require('ejs');
const http = require('http');
const fs = require('fs'); 
const path = require('path');
const multer = require('multer');

app.set('view engine', 'ejs');

// const users = [];
// const all_users = [];

//const MONGO_URI = 'mongodb+srv://lsyun1234:cxMctvVx5ThVlktM@joinusmembers.dvefm.mongodb.net/JoinUs?retryWrites=true&w=majority';

const server = async() => {
    try {
        const { MONGO_URI, PORT } = process.env;
        if (!MONGO_URI) console.err("MONGO_URI is required!!!");
        if (!PORT) throw new Error("PORT is requrired");

        console.log("Entered into the server...");

        await mongoose.connect(MONGO_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology:true, 
        //    useCreateIndex:true, 
        //    useFindAndModify: false 
        });
        console.log('MongDB connected!!!')
        // 미들웨어
        app.use(express.json());
        app.use('/', mainRouter);

        app.use('/user', userRouter);
        app.use('/blog', blogRouter);
        app.use('/users', usersRouter);
        app.use('/facility', facilityRouter);
        app.use('/review', reviewRouter);
        app.use('/themes', themesRouter);
        app.use('/upload', uploadRouter);
        app.use('/img', express.static(path.join(__dirname, '/uploads')));
        app.use('/login', express.static(path.join(__dirname, '/src/web/login_index.ejs')));
        //app.use(express.static(path.join(__dirname, 'public')));
    
        // 받는 곳
        app.listen(PORT, async () =>  console.log(`server listening on port ${PORT}`))
    } catch(err) {
        console.log(err);
    }
}

server();