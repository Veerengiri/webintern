const express = require("express");
const auth = require('./router/auth');

const app = express();
const cors = require("cors");
const addmin = require("./router/admin");
const customer = require("./router/costemer");


require("./db");

app.use(express.json());
app.use(cors());


app.use("/itemImages",express.static("./itemImages"));

const port =  7000;
app.get('/',(req,res)=>{
    res.send("welcome to our hotel...");
});

app.use(addmin);
app.use(auth);
app.use(customer);

 
app.listen(port,()=>{
    console.log("listening on port: "+port);
})