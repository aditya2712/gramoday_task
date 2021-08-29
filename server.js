require('dotenv').config()
const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send(process.env.TZ)
})

app.listen(3000, ()=>{
    console.log("server started on port 3000");
})