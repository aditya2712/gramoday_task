const router = require('express').Router();
const reports = require('./reports.js');

router.use('/reports', reports);

router.get('/', (req, res)=>{
    res.send("Only /reports routes are working right now!!");
})

module.exports = router;