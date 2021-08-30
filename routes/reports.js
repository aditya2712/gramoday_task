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

        existing_aggr_report = await Aggr_report.findOne({market_id:marketID, cmdty_id:cmdtyID});
        if(!existing_aggr_report){
            existing_aggr_report = new Aggr_report({
                average_price: (price/convFctr),
                market_id: marketID,
                market_name: marketName,
                cmdty_id : cmdtyID,
                cmdty_name : cmdtyName
            })
            await existing_aggr_report.save();
        }
        curr_number_of_reports = existing_aggr_report.reports.length;
        old_avg_price = parseFloat(existing_aggr_report.average_price)
        curr_price_per_kg = parseFloat(new_report.price_per_kg)
        new_avg_price = (old_avg_price*curr_number_of_reports + curr_price_per_kg)/(curr_number_of_reports+1)
        await Aggr_report.findByIdAndUpdate(existing_aggr_report._id,
            { 
                $push: {reports: new_report._id},
                average_price: new_avg_price
            },
            { new: true, useFindAndModify: false }
        )

        res.status(201).json({
            status: "success",
            reportID: existing_aggr_report._id
        });
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

router.get('/', async (req, res)=>{
    try{
        report_id = req.query.reportID;
        aggr_report = await Aggr_report.findById(report_id);
        res.status(200).json(aggr_report);
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

module.exports = router;