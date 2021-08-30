const mongoose = require('mongoose')

const report_schema = mongoose.Schema({
    user_id = {
        type: String,
        required: true
    },
    market_id = {
        type: String,
        required: true
    },
    market_name = {
        type: String, 
        required: true,
    },
    market_type = {
        type: String,
        required: true,
    },
    cmdty_id = {
        type: String,
        required: true,
    },
    cmdty_name = {
        type: String,
        required: true,
    },
    price_unit = {
        type: String,
        required: true,
    },
    conv_fact = {
        type: Number,
        required: true,
    },
    price = {
        type: Number,
        required: true,
    },
    price_per_kg = {
        type: Number,
        require: true,
    }
});

const aggr_report_schema = mongoose.Schema({
    reports: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'report',
    }],
    average_price: Number,
    market_id: String,
    market_name: String,
    cmdty_id: String,
    cmdty_name: String,
    timestamps: {
        updatedAt: 'timestamp'
    }
});

const report = mongoose.model('report', report_schema);
const aggr_report = mongoose.model('aggr_report', aggr_report_schema);

module.exports = {
    report, aggr_report
};