require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, ()=>{
    console.log("DB Connected");
})



port = process.env.PORT || 8000
app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
})