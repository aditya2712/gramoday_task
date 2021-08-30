const router = require('express').Router();

const {Report, Aggr_report} = require('../models/reports');

router.post('/', async (req, res)=>{
    const {reportDetails} = req.body;
    const {userID, marketID, marketName, marketType, cmdtyID, cmdtyName, priceUnit, convFctr, price} = reportDetails
    try{
        new_report = new Report({
        user_id : userID,
        market_id : marketID,
        market_name : marketName,
            market_type : marketType,
            cmdty_id : cmdtyID,
            cmdty_name : cmdtyName,
            price_unit : priceUnit,
            conv_fctr : convFctr,
            price : price,
            price_per_kg : (price/convFctr)
        })
        await new_report.save();
        res.status(201).json({
            status: "success",
            reportID: new_report._id
        });
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

router.get('/', (req, res)=>{
    res.send("reports get");
})

module.exports = router;