const express = require('express');
const cors =require('cors')
const bodyparser =require('body-parser');
const mongoose=require('mongoose');
require('dotenv').config()
const app=express();


//middleware
app.use(
    cors({
        origin: 'https://myeventschedular.vercel.app/', // Allow requests only from this origin
        methods: ['GET', 'POST','PUT','PATCH','DELETE'], // Specify allowed HTTP methods
        credentials: true, // Include credentials like cookies in requests
        allowedHeaders:true,
        allowedHeaders: ['Content-Type', 'Authorization'], // Add necessary headers

    })
);

app.use(express.json());


//mongo connection
const URI=process.env.MONGO_URI;
mongoose.connect(URI)
    .then(()=>console.log("MongoDB Connected"))
    .catch((err)=>console.error(err))


app.use('/events',require('./routes/eventRoutes'));
app.use('/sessions',require('./routes/sessionRoutes'));


//PORT
const PORT=process.env.PORT || 3700
app.listen(PORT,()=>{
    console.log("the server is running on http://localhost:3700")
})