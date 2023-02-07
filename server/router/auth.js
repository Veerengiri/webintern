const { response, json } = require('express');
const express = require('express');
const { findByIdAndUpdate } = require('../model/item');
const user = require('../model/user');
const bycrpt = require('bcryptjs');
const item = require('../model/item');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/api/registeruser', async (req, res) => {
    // console.log(req.body);
    try {
        const { name, email, mobileNo, password, address } = req.body;
        const salt = await bycrpt.genSalt(10);
        const sespass = await bycrpt.hash(password, salt);
        const users = await user.create({
            name,
            email,
            mobileNo,
            password:sespass,
            address,
            cart: [],
        })
        if (users) {
            res.json({ status: "register successfully" })
        }
    } catch (err) {
        res.json({ status: "error", error: "duplicate data" })
    }
})
router.get('/api/changepassword/:email/:password',async (req,res)=>{
    try {
        const {email,password}=req.params;
        const salt = await bycrpt.genSalt(10);
        const sespass = await bycrpt.hash(password, salt);
        const users = await user.findOne({email:email});
        const data = await user.findByIdAndUpdate(users._id,{password:sespass});
        res.json({status:"change password succesfully"});
    } catch (error) {
        res.json({status:"error"});
    }
})
router.get('/api/addtocart/:userid/:itemid/:qtn', async (req, res) => {
    try {
        const { itemid } = req.params;
        const { userid, qtn } = req.params;
        const itemdetail = {
            itemid: itemid,
            qtn: qtn,
        }
        const data = await user.findById(userid);
        let dt = data.cart;
        if (data) {
            let isexist = false;
            for (let i = 0; i < dt.length; i++) {
                if (dt[i].itemid == itemid) {
                    isexist = true;
                }
            }
            if (isexist) {
                res.send({ status: "already axists" });
            }
            else {
                dt.push(itemdetail);
                await user.findByIdAndUpdate(userid, { cart: dt })
                res.json({ status: "add to cart successully", cart: data.cart });
            }

        }
    } catch (error) {
        res.json({ status: "error" });
    }
})
router.get('/api/updatecart/:userid/:itemid/:updatedqtn', async (req, res) => {
    try {
        const { userid, itemid, updatedqtn } = req.params;
        const data = await user.findById(userid);
        let dt = data.cart;
        if (data) {
            for (let i = 0; i < dt.length; i++) {
                if (dt[i].itemid == itemid) {
                    dt[i].qtn = updatedqtn;
                    break;
                }
            }
            const update = await user.findByIdAndUpdate(userid, { cart: dt });
            if (update) {
                res.send({ status: "update successfully" });
            }
        } else {
            res.send({ status: "notfound" });
        }

    } catch (error) {
        res.json({ status: "error" });
    }
})
router.get('/api/deletecart/:userid/:itemid', async (req, res) => {
    try {
        const { userid, itemid } = req.params;
        const data = await user.findById(userid);
        let dt = data.cart;
        if (data) {
            let a = 10000;
            for (let i = 0; i < dt.length; i++) {
                if (dt[i].itemid == itemid) {
                    a = i;
                    break;
                }
            }
            for (let i = a; i < dt.length; i++) {
                dt[i] = dt[i + 1];
            }
            dt.pop();

            const update = await user.findByIdAndUpdate(userid, { cart: dt });
            if (update) {
                res.send({ status: "delete successfully" });
            }
        } else {
            res.send({ status: "notfound" });
        }
    } catch (error) {
        res.json({ status: "error" });
    }
})
router.get('/api/emptycart/:userid',async (req,res)=>{
    try {
        await user.findByIdAndUpdate(req.params['userid'], { cart: [] });
        res.json({status:"ok"});
    } catch (error) {
        res.json({ status: "error" });
    }
})
router.get('/api/getcart/:userid',async (req,res)=>{
    try {
        const {userid}=req.params;
        const data =await user.findById(userid);
        if(data){
            let cart = [];
            let oldcart= data.cart;
            for(let i=0;i<oldcart.length;i++){
                let items =await item.findById(oldcart[i].itemid);
                let a={
                    id:items._id,
                    name:items.name,
                    desc: items.desc,
                    price: items.price,
                    qtn: oldcart[i].qtn,
                }
                cart.push(a);
            }
            res.json({status:"ok",cartu: cart})
        }else{
            res.json({status:"not found"});
        }
    } catch (error) {
        res.json({status:"error"});
    }
})
router.post('/api/login', async (req, res) => {
    try {
        const data = await user.findOne({email: req.body.email});
        const compare = await bycrpt.compare(req.body.password, data.password);
        if (data && compare) {
            var token = jwt.sign({email:req.body.email,id:data._id,isadmin:false}, 'theInfinity'); 
            res.json({ status: "ok,user is login successfully" ,id:data._id,token});
        }
        else {
            res.json({ status: "error in password or email" });
        }
    } catch (error) {
        res.json({status:"error in email or password"});
    }
})
router.get('/api/check/:token',async (req,res)=>{
   try {
    const {token}=req.params;
    const decode = jwt.verify(token,"theInfinity");
    // console.log(decode);
    res.json({status:"ok",email:decode.email,id:decode.id,isadmin:decode.isadmin});
   } catch (error) {
    res.json({status:'error'})
   }
})
router.get("/api/getalluser", async (req, res) => {
    try {
        const getuser = await user.find();
        let getalluser=[];
        let us;
        for(let i =0;i<getuser.length;i++){
            us={
                name:getuser[i].name,
                email:getuser[i].email,
                mobileNo:getuser[i].mobileNo,
                address:getuser[i].address,
            }
            getalluser.push(us);
        }
        res.status(200).json({ status: "ok", getalluser})
    } catch (error) {
        res.status(401).json({ status: 401, error });
        alert("error");
    }
})
router.get('/api/searchuser/:keyword',async (req,res)=>{
    try {
        const {keyword}=req.params;
        const getuser = await user.find({$or: [{"name": new RegExp(keyword)},{"email": new RegExp(keyword)},{"mobileNo": new RegExp(keyword)},{"address": new RegExp(keyword)}]});
        let getalluser=[];
        let us;
        for(let i =0;i<getuser.length;i++){
            us={
                name:getuser[i].name,
                email:getuser[i].email,
                mobileNo:getuser[i].mobileNo,
                address:getuser[i].address,
            }
            getalluser.push(us);
        }
        res.status(200).json({ status: "ok", getalluser})
    } catch (error) {
        res.status(401).json({ status: 401, error });
        alert("error");
    }
})
router.get('/api/getuser/:userid',async (req,res)=>{
    try {
        const data = await user.findById(req.params['userid']);
        if(data){
            res.json({status:"ok",user:{
                name:data.name,
                email:data.email,
                mobileNo:data.mobileNo,
                address:data.address
            }})
        }
    } catch (error) {
        res.json({status:"error"});
    }
})
router.post('/api/updateuser',async (req,res)=>{
    try {
        const {userid,name,mobileNo,address}=req.body;
        const users =await user.findByIdAndUpdate(userid,{name:name,mobileNo:mobileNo,address:address});
        if(users){
            res.json({status:"update succesfully"});
        }
        else{
            res.json({status:"user not found"})
        }
    } catch (error) {
        res.json({status:"error"});
    }
})
module.exports = router