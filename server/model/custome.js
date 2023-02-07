const mongoose = require('mongoose');

const custome = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    type:{
        type:String,
        required: true
    },
    sauce:{
        type:String,
        required: true
    },
    cheese: {
        type:String,
        required: true,
    },
    veg:{
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qtn: {
        type: Number,
        required: true
    },
    totalprice:{
        type: Number,
        required: true
    },
    isDeliverd:{
        type: Boolean,
        required: true
    },
    sorttime:{
        type: String,
    },
    cancel:{
        type: Boolean,
        default:false,
    }
    
})
module.exports = mongoose.model('custome',custome);