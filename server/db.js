const mongoose = require("mongoose");
const mongourl = process.env.Database;

mongoose.connect(mongourl,{}).then(()=>{
    console.log("connected mongourl successfully");
}).catch((err)=>{console.log(err)})